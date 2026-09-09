import { ConversationState, EngineResult, Language, QuickReply } from '../types';
import { getLocale } from '../locales';
import { matchIntent } from './intentMatcher';
import { detectLanguageFromText } from './detector';
import {
  ADMISSION_STEPS,
  GENERAL_REHAB_KNOWLEDGE,
  MITRANGAN_PROGRAMS,
  VERIFIED_CONTACTS
} from '../knowledge';

/**
 * Initializes fresh conversation state.
 */
export function getInitialConversationState(initialLang: Language = 'en'): ConversationState {
  return {
    language: initialLang,
    scenario: 'welcome',
    registrationStep: 'idle',
    registrationDraft: {},
    statusStep: 'idle'
  };
}

/**
 * Main conversational processing engine.
 */
export async function processUserMessage(
  rawInput: string,
  currentState: ConversationState,
  explicitLangSwitch?: Language
): Promise<EngineResult> {
  let lang = explicitLangSwitch || currentState.language;

  // Auto-detect language from user input if not explicitly switching and not an internal payload
  const isPayload = rawInput.includes('_') || rawInput.startsWith('sel_') || rawInput.startsWith('pk_') || /^mit-\d+/i.test(rawInput);
  if (!explicitLangSwitch && !isPayload && rawInput && rawInput.trim().length > 2) {
    const detected = detectLanguageFromText(rawInput);
    if (detected && detected !== lang) {
      lang = detected;
    }
  }

  const locale = getLocale(lang);
  let state: ConversationState = {
    ...currentState,
    language: lang
  };

  const inputTrim = rawInput.trim();

  // -------------------------------------------------------------
  // 1. Check if user is currently inside the REGISTRATION flow
  // -------------------------------------------------------------
  if (state.registrationStep !== 'idle' && state.registrationStep !== 'completed') {
    // Cancellation or abort to menu
    if (inputTrim.toLowerCase() === 'cancel' || inputTrim.toLowerCase() === 'menu' || inputTrim === 'back_to_menu') {
      state.registrationStep = 'idle';
      state.registrationDraft = {};
      return {
        replyText: locale.welcomeMessage,
        nextState: { ...state, scenario: 'welcome' },
        quickReplies: locale.initialQuickReplies
      };
    }

    switch (state.registrationStep) {
      case 'asking_name': {
        if (inputTrim.length < 2) {
          return {
            replyText: locale.errInvalidName,
            nextState: state
          };
        }
        // Save name as entered without translating personal information
        state.registrationDraft.fullName = inputTrim;
        state.registrationStep = 'asking_age';
        return {
          replyText: locale.registrationAskAge(inputTrim),
          nextState: state
        };
      }

      case 'asking_age': {
        const parsedAge = parseInt(inputTrim, 10);
        if (isNaN(parsedAge) || parsedAge < 10 || parsedAge > 120) {
          return {
            replyText: locale.errInvalidAge,
            nextState: state
          };
        }
        state.registrationDraft.age = parsedAge;
        state.registrationStep = 'asking_mobile';
        return {
          replyText: locale.registrationAskMobile,
          nextState: state
        };
      }

      case 'asking_mobile': {
        const cleanMobile = inputTrim.replace(/[^0-9+]/g, '');
        if (cleanMobile.length < 10 || cleanMobile.length > 15) {
          return {
            replyText: locale.errInvalidMobile,
            nextState: state
          };
        }
        state.registrationDraft.mobileNumber = cleanMobile;
        state.registrationStep = 'asking_address';
        return {
          replyText: locale.registrationAskAddress,
          nextState: state
        };
      }

      case 'asking_address': {
        if (inputTrim.length < 4) {
          return {
            replyText: locale.errInvalidAddress,
            nextState: state
          };
        }
        // Save address as entered
        state.registrationDraft.address = inputTrim;
        state.registrationStep = 'asking_program';

        const programReplies: QuickReply[] = MITRANGAN_PROGRAMS.map(p => ({
          id: p.id,
          label: p.name[lang],
          payload: `sel_prog_${p.id}`
        }));

        return {
          replyText: locale.registrationAskProgram,
          nextState: state,
          quickReplies: programReplies
        };
      }

      case 'asking_program': {
        let prog = 'General Rehabilitation';
        if (inputTrim.startsWith('sel_prog_')) {
          const pId = inputTrim.replace('sel_prog_', '');
          const matchProg = MITRANGAN_PROGRAMS.find(p => p.id === pId);
          if (matchProg) prog = matchProg.name[lang];
        } else if (inputTrim.length > 2) {
          prog = inputTrim;
        }

        state.registrationDraft.programPreference = prog;
        state.registrationStep = 'asking_pickup';

        return {
          replyText: locale.registrationAskPickup,
          nextState: state,
          quickReplies: locale.pickupOptions
        };
      }

      case 'asking_pickup': {
        const pickup = inputTrim === 'pickup_yes' || inputTrim.toLowerCase().includes('yes') || inputTrim.toLowerCase().includes('हाँ') || inputTrim.toLowerCase().includes('होय');
        state.registrationDraft.pickupRequired = pickup;
        state.registrationStep = 'submitting';

        // Submit to the existing API endpoint: POST /api/registrations
        try {
          const payload = {
            fullName: state.registrationDraft.fullName || 'Anonymous Patient',
            age: state.registrationDraft.age || 30,
            mobileNumber: state.registrationDraft.mobileNumber || '9999999999',
            address: state.registrationDraft.address || 'Nagpur',
            programPreference: state.registrationDraft.programPreference || 'General Rehabilitation',
            pickupRequired: Boolean(state.registrationDraft.pickupRequired)
          };

          const res = await fetch('/api/registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Server error occurred');
          }

          const result = await res.json();
          const userId = result.userId || `MIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

          state.registrationStep = 'completed';
          state.scenario = 'welcome';

          return {
            replyText: locale.registrationSuccess(userId, payload.fullName),
            nextState: state,
            cardType: 'registration_success',
            cardData: {
              userId,
              maskedName: payload.fullName,
              programPreference: payload.programPreference,
              phoneNagpur: VERIFIED_CONTACTS.nagpurDisplay,
              phoneDurg: VERIFIED_CONTACTS.durgDisplay,
              whatsAppUrl: VERIFIED_CONTACTS.whatsAppUrl
            },
            quickReplies: [
              { id: 'st_chk', label: locale.initialQuickReplies.find(q => q.id === 'status')?.label || 'Check Status', payload: 'check_status' },
              { id: 'ct_team', label: locale.talkToTeamButton, payload: 'talk_to_team' },
              { id: 'bk_menu', label: locale.menuButton, payload: 'back_to_menu' }
            ]
          };
        } catch (err: any) {
          state.registrationStep = 'asking_pickup'; // allow retry
          return {
            replyText: locale.registrationError(err.message || 'Connection failed'),
            nextState: state,
            quickReplies: locale.pickupOptions
          };
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 2. Check if user is in STATUS LOOKUP flow
  // -------------------------------------------------------------
  if (state.statusStep === 'asking_userId' || /^mit-\d+/i.test(inputTrim)) {
    // Extract potential User ID
    const match = inputTrim.match(/mit-\d{4}-\d+/i) || inputTrim.match(/mit-\d+/i) || (inputTrim.length >= 4 && !isNaN(Number(inputTrim)) ? [inputTrim] : null);

    if (match || (state.statusStep === 'asking_userId' && inputTrim.length >= 4)) {
      const queryId = (match ? match[0] : inputTrim).toUpperCase();
      try {
        const res = await fetch(`/api/status/${encodeURIComponent(queryId)}`);
        if (!res.ok) {
          state.statusStep = 'idle';
          return {
            replyText: locale.statusNotFound(queryId),
            nextState: state,
            quickReplies: [
              { id: 'st_retry', label: locale.initialQuickReplies.find(q => q.id === 'status')?.label || 'Check Status', payload: 'check_status' },
              { id: 'ct_team', label: locale.talkToTeamButton, payload: 'talk_to_team' },
              { id: 'bk_menu', label: locale.menuButton, payload: 'back_to_menu' }
            ]
          };
        }

        const data = await res.json();
        const rawStatus = (data.admissionStatus || 'Pending') as keyof typeof locale.statusFound.notes;
        const note = locale.statusFound.notes[rawStatus] || locale.statusFound.notes.Pending;

        state.statusStep = 'completed';

        return {
          replyText: `### ${locale.statusFound.title}\n\n**${locale.statusFound.userIdLabel}:** ${data.userId}\n**${locale.statusFound.nameLabel}:** ${data.maskedName}\n**${locale.statusFound.statusLabel}:** ${data.admissionStatus}\n**${locale.statusFound.programLabel}:** ${data.programPreference || 'General'}\n\n${note}`,
          nextState: state,
          cardType: 'status',
          cardData: {
            userId: data.userId,
            maskedName: data.maskedName,
            admissionStatus: data.admissionStatus,
            programPreference: data.programPreference,
            registeredDate: data.registeredDate ? new Date(data.registeredDate).toLocaleDateString() : 'Recent'
          },
          quickReplies: [
            { id: 'ct_team', label: locale.talkToTeamButton, payload: 'talk_to_team' },
            { id: 'bk_menu', label: locale.menuButton, payload: 'back_to_menu' }
          ]
        };
      } catch {
        state.statusStep = 'idle';
        return {
          replyText: locale.statusNotFound(queryId),
          nextState: state,
          quickReplies: [{ id: 'bk_menu', label: locale.menuButton, payload: 'back_to_menu' }]
        };
      }
    }
  }

  // -------------------------------------------------------------
  // 3. Standard Intent Matching
  // -------------------------------------------------------------
  const intent = matchIntent(inputTrim);

  switch (intent) {
    case 'self_help': {
      state.scenario = 'self';
      return {
        replyText: locale.scenarioSelf,
        nextState: state,
        quickReplies: locale.concernOptions
      };
    }

    case 'family_help': {
      state.scenario = 'family';
      return {
        replyText: locale.scenarioFamily,
        nextState: state,
        quickReplies: locale.concernOptions
      };
    }

    case 'concern_alcohol':
    case 'concern_drugs':
    case 'concern_opioids':
    case 'concern_cannabis':
    case 'concern_mobile':
    case 'concern_prescription': {
      const pId = intent.replace('concern_', '');
      const prog = MITRANGAN_PROGRAMS.find(p => p.id === pId);
      const concernTitle = prog ? prog.name[lang] : 'Substance De-Addiction';
      const detail = prog ? `\n\n*${prog.shortDescription[lang]}*\n${prog.details[lang]}\n**Duration:** ${prog.duration[lang]}` : '';

      return {
        replyText: locale.concernResponse(concernTitle) + detail,
        nextState: state,
        quickReplies: [
          { id: 'reg', label: locale.initialQuickReplies.find(q => q.id === 'register')?.label || 'Register Now', payload: 'register_now' },
          { id: 'adm', label: locale.initialQuickReplies.find(q => q.id === 'admission')?.label || 'Admission Help', payload: 'admission_help' },
          { id: 'call', label: locale.talkToTeamButton, payload: 'talk_to_team' },
          { id: 'menu', label: locale.menuButton, payload: 'back_to_menu' }
        ]
      };
    }

    case 'admission_help': {
      state.scenario = 'admission';
      return {
        replyText: locale.admissionInfo,
        nextState: state,
        quickReplies: locale.admissionQuickReplies
      };
    }

    case 'pickup_request': {
      state.scenario = 'admission';
      const steps = ADMISSION_STEPS[lang];
      const pickupStep = steps[2];
      const pickupDetail =
        lang === 'hi'
          ? `### 24x7 सुरक्षित एवं गोपनीय पिकअप\n\n${pickupStep.desc}\n\n- **नागपुर एवं विदर्भ:** +91 9767362388\n- **दुर्ग एवं छत्तीसगढ़:** +91 7666890795\n- प्रशिक्षित मेडिकल टीम और गोपनीय एम्बुलेंस हमेशा तैयार रहती है।`
          : lang === 'mr'
          ? `### २४ तास सुरक्षित व गोपनीय पिकअप\n\n${pickupStep.desc}\n\n- **नागपूर व विदर्भ:** +91 9767362388\n- **दुर्ग व छत्तीसगड:** +91 7666890795\n- प्रशिक्षित वैद्यकीय पथक व रुग्णवाहिका सदैव सज्ज असते.`
          : `### 24x7 Discrete & Safe Pickup Assistance\n\n${pickupStep.desc}\n\n- **Nagpur & Vidarbha:** +91 9767362388\n- **Durg & Chhattisgarh:** +91 7666890795\n- Experienced intake nurses and safe transport vehicles available round the clock.`;

      return {
        replyText: pickupDetail,
        nextState: state,
        cardType: 'emergency',
        cardData: {
          phoneNagpur: VERIFIED_CONTACTS.nagpurDisplay,
          phoneDurg: VERIFIED_CONTACTS.durgDisplay,
          whatsAppUrl: VERIFIED_CONTACTS.whatsAppUrl
        },
        quickReplies: [
          { id: 'pk_reg', label: locale.initialQuickReplies.find(q => q.id === 'register')?.label || 'Register Now', payload: 'register_now' },
          { id: 'pk_call', label: locale.talkToTeamButton, payload: 'talk_to_team' },
          { id: 'pk_menu', label: locale.menuButton, payload: 'back_to_menu' }
        ]
      };
    }

    case 'register_now': {
      state.scenario = 'registration';
      state.registrationStep = 'asking_name';
      state.registrationDraft = {};

      return {
        replyText: locale.registrationStart,
        nextState: state
      };
    }

    case 'check_status': {
      state.scenario = 'status';
      state.statusStep = 'asking_userId';

      return {
        replyText: locale.statusPrompt,
        nextState: state
      };
    }

    case 'programs_help': {
      state.scenario = 'programs';
      const progList = MITRANGAN_PROGRAMS.map(p => `• **${p.name[lang]}**: ${p.shortDescription[lang]}`).join('\n\n');
      const intro =
        lang === 'hi'
          ? '### Mitrangan विशेषज्ञ पुनर्वसन कार्यक्रम'
          : lang === 'mr'
          ? '### Mitrangan विशेष पुनर्वसन कार्यक्रम'
          : '### Mitrangan Specialized Rehabilitation Programs';

      return {
        replyText: `${intro}\n\n${progList}`,
        nextState: state,
        quickReplies: [
          { id: 'p_reg', label: locale.initialQuickReplies.find(q => q.id === 'register')?.label || 'Register Now', payload: 'register_now' },
          { id: 'p_adm', label: locale.initialQuickReplies.find(q => q.id === 'admission')?.label || 'Admission Help', payload: 'admission_help' },
          { id: 'p_call', label: locale.talkToTeamButton, payload: 'talk_to_team' },
          { id: 'p_menu', label: locale.menuButton, payload: 'back_to_menu' }
        ]
      };
    }

    case 'emergency': {
      state.scenario = 'emergency';
      return {
        replyText: `⚠️ **${locale.emergencyPrompt}**\n\n• **Nagpur 24x7:** +91 9767362388\n• **Durg 24x7:** +91 7666890795`,
        nextState: state,
        cardType: 'emergency',
        cardData: {
          phoneNagpur: VERIFIED_CONTACTS.nagpurDisplay,
          phoneDurg: VERIFIED_CONTACTS.durgDisplay,
          whatsAppUrl: VERIFIED_CONTACTS.whatsAppUrl
        },
        quickReplies: [
          { id: 'em_call', label: locale.talkToTeamButton, payload: 'talk_to_team' },
          { id: 'em_pk', label: locale.admissionQuickReplies[2]?.label || 'Pickup Details', payload: 'emergency_pickup' },
          { id: 'em_menu', label: locale.menuButton, payload: 'back_to_menu' }
        ]
      };
    }

    case 'talk_to_team': {
      state.scenario = 'contact';
      return {
        replyText: `### ${locale.contactHeader}\n${locale.contactText}`,
        nextState: state,
        cardType: 'contact',
        cardData: {
          phoneNagpur: VERIFIED_CONTACTS.nagpurDisplay,
          phoneDurg: VERIFIED_CONTACTS.durgDisplay,
          whatsAppUrl: VERIFIED_CONTACTS.whatsAppUrl
        },
        quickReplies: [
          { id: 'ct_reg', label: locale.initialQuickReplies.find(q => q.id === 'register')?.label || 'Register Now', payload: 'register_now' },
          { id: 'ct_adm', label: locale.initialQuickReplies.find(q => q.id === 'admission')?.label || 'Admission Help', payload: 'admission_help' },
          { id: 'ct_menu', label: locale.menuButton, payload: 'back_to_menu' }
        ]
      };
    }

    case 'faq_addiction':
    case 'faq_rehab':
    case 'faq_relapse':
    case 'faq_family': {
      const topicKey = intent.replace('faq_', '');
      const item = GENERAL_REHAB_KNOWLEDGE.find(k => k.topic === topicKey) || GENERAL_REHAB_KNOWLEDGE[0];
      return {
        replyText: `### ${item.title[lang]}\n\n${item.summary[lang]}`,
        nextState: state,
        quickReplies: locale.faqOptions
      };
    }

    case 'faq_centers': {
      return {
        replyText: locale.faqCentersText,
        nextState: state,
        quickReplies: [
          { id: 'fc_adm', label: locale.initialQuickReplies.find(q => q.id === 'admission')?.label || 'Admission Help', payload: 'admission_help' },
          { id: 'fc_call', label: locale.talkToTeamButton, payload: 'talk_to_team' },
          { id: 'fc_menu', label: locale.menuButton, payload: 'back_to_menu' }
        ]
      };
    }

    case 'greeting':
    case 'menu': {
      state.scenario = 'welcome';
      return {
        replyText: locale.welcomeMessage,
        nextState: state,
        quickReplies: locale.initialQuickReplies
      };
    }

    case 'unknown':
    default: {
      const fallbackPrompt =
        lang === 'hi'
          ? "मैं आपकी बात समझ रहा हूँ। मैं आपको नशामुक्ति इलाज, एडमिशन, ऑनलाइन रजिस्ट्रेशन, स्टेटस जांच या हमारे काउंसलर से फोन पर बात कराने में सहायता कर सकता हूँ। आप नीचे दिए गए विकल्पों में से चुन सकते हैं:"
          : lang === 'mr'
          ? "मी समजू शकतो. मी तुम्हाला व्यसनमुक्ती उपचार, प्रवेश प्रक्रिया, ऑनलाइन नोंदणी, स्टेटस तपासणे किंवा समुपदेशकांशी थेट बोलण्यास मदत करू शकतो. कृपया खालील पर्यायांमधून निवडा:"
          : "I understand. I am here to assist you with recovery information, admission procedures, fast registration, application tracking, or connecting with our senior counselors. Please select an option below or type your question:";

      return {
        replyText: fallbackPrompt,
        nextState: state,
        quickReplies: locale.initialQuickReplies
      };
    }
  }
}
