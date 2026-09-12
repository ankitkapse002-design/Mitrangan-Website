import { QuickReply } from '../types';

export const hiLocale = {
  mitraName: 'आशा',
  assistantTitle: 'Mitrangan सहायक',
  onlineBadge: 'ऑनलाइन • 24/7 सहायता',
  langSelectorTitle: 'भाषा',
  welcomeHeader: 'Mitrangan नशामुक्ति एवं पुनर्वास केंद्र',
  welcomeMessage:
    "Mitrangan De-Addiction & Rehabilitation Center में आपका स्वागत है।\n\nनमस्ते, मैं आशा हूँ। मैं आपको नशामुक्ति, पुनर्वास, एडमिशन और आगे के अगले कदम को समझने में मदद कर सकता हूँ।\n\nक्या आप खुद के लिए मदद खोज रहे हैं, या परिवार के किसी सदस्य के लिए?",
  inputPlaceholder: 'आशा से कुछ भी पूछें (एडमिशन, इलाज, मदद)...',
  typingIndicator: 'आशा लिख रहे हैं...',
  sendButton: 'भेजें',
  resetChatTooltip: 'बातचीत दोबारा शुरू करें',
  closeTooltip: 'चैट बंद करें',
  talkToTeamButton: 'Mitrangan टीम से बात करें',

  // Quick replies
  initialQuickReplies: [
    { id: 'self', label: 'मेरे लिए', payload: 'for_myself' },
    { id: 'family', label: 'परिवार के किसी सदस्य के लिए', payload: 'for_family' },
    { id: 'admission', label: 'प्रवेश सहायता', payload: 'admission_help' },
    { id: 'programs', label: 'इलाज और कार्यक्रम', payload: 'programs_help' },
    { id: 'info', label: 'केवल जानकारी', payload: 'just_info' },
    { id: 'register', label: 'रजिस्टर करें', payload: 'register_now' },
    { id: 'status', label: 'स्टेटस देखें', payload: 'check_status' }
  ] as QuickReply[],

  scenarioSelf:
    "नशे से बाहर निकलने का पहला कदम उठाना बहुत हिम्मत की बात है। Mitrangan में हम आपको पूरा सम्मान, गोपनीयता और एक सुरक्षित वातावरण देते हैं। आपको इस परेशानी से अकेले नहीं लड़ना है।\n\nआप किस प्रकार की समस्या या नशे से मुक्ति पाना चाहते हैं?",

  scenarioFamily:
    "परिवार के किसी अपने को नशे में देखना पूरे घर के लिए बहुत दर्दनाक और चिंताजनक होता है। कृपया यह समझें कि नशा एक बीमारी है जिसका इलाज पूरी तरह संभव है।\n\nआपके परिवार के सदस्य को किस प्रकार के नशे से मुक्ति की आवश्यकता है?",

  concernOptions: [
    { id: 'c_alcohol', label: 'शराब / दारू की लत', payload: 'concern_alcohol' },
    { id: 'c_drugs', label: 'ड्रग्स / गांजा / एमडी', payload: 'concern_drugs' },
    { id: 'c_opioids', label: 'अफीम / स्मैक / हेरोइन', payload: 'concern_opioids' },
    { id: 'c_cannabis', label: 'चरस / गांजा / सिंथेटिक', payload: 'concern_cannabis' },
    { id: 'c_mobile', label: 'मोबाइल / स्क्रीन की लत', payload: 'concern_mobile' },
    { id: 'c_prescription', label: 'नींद की गोलियां / दवाएं', payload: 'concern_prescription' },
    { id: 'c_other', label: 'काउंसलर से बात करें', payload: 'talk_to_team' }
  ] as QuickReply[],

  concernResponse: (concernName: string) =>
    `जानकारी देने के लिए धन्यवाद। Mitrangan में ${concernName} से मुक्ति के लिए विशेष मेडिकल डिटॉक्स और मनोवैज्ञानिक काउंसलिंग की सुविधा उपलब्ध है।\n\nहमारे केंद्र में सुरक्षित इलाज, योग और सम्मानजनक माहौल मिलता है। क्या आप एडमिशन की प्रक्रिया जानना चाहते हैं, सीधे रजिस्ट्रेशन करना चाहते हैं, या हमारे वरिष्ठ काउंसलर से बात करना चाहते हैं?`,

  // Admission info
  admissionInfo:
    "### Mitrangan में प्रवेश (Admission) प्रक्रिया\n1. **गोपनीय संपर्क**: हमसे फोन, व्हाट्सएप या चैट पर निःसंकोच बात करें।\n2. **निःशुल्क परामर्श**: हमारे डॉक्टर मरीज की स्थिति और नशे के इतिहास को समझते हैं।\n3. **सुरक्षित और गोपनीय पिकअप**: महाराष्ट्र और छत्तीसगढ़ में 24 घंटे discrete एम्बुलेंस सहायता उपलब्ध।\n4. **पुनर्वास की शुरुआत**: केंद्र में प्रवेश, स्वास्थ्य जांच, सुरक्षित कक्ष आवंटन और नया जीवन शुरू।",

  admissionQuickReplies: [
    { id: 'adm_reg', label: 'रजिस्ट्रेशन शुरू करें', payload: 'register_now' },
    { id: 'adm_call', label: '24/7 हेल्पलाइन पर कॉल करें', payload: 'talk_to_team' },
    { id: 'adm_pickup', label: 'इमरजेंसी पिकअप जानकारी', payload: 'emergency_pickup' },
    { id: 'adm_back', label: 'मुख्य मेन्यू पर जाएँ', payload: 'back_to_menu' }
  ] as QuickReply[],

  // Registration flow
  registrationStart:
    "मैं सिर्फ एक मिनट में आपका प्राथमिक एडमिशन पंजीकरण पूरा कराने में मदद कर सकता हूँ। आपकी सभी जानकारी पूरी तरह गोपनीय रखी जाती है।\n\nशुरू करते हैं: **मरीज का पूरा नाम क्या है?**",
  registrationAskAge: (name: string) =>
    `धन्यवाद, ${name}। **मरीज की उम्र (Age) कितनी है?** (उदाहरण: 28)`,
  registrationAskMobile:
    "समझ गया। **संपर्क के लिए मुख्य मोबाइल नंबर क्या है?** (10 अंकों का नंबर)",
  registrationAskAddress:
    "धन्यवाद। **आपका शहर या पता क्या है?** (जैसे: नागपुर, वर्धा, दुर्ग, रायपुर)",
  registrationAskProgram:
    "लगभग पूरा हो गया! आप किस कार्यक्रम के तहत प्रवेश चाहते हैं?",
  registrationAskPickup:
    "क्या मरीज को केंद्र तक सुरक्षित लाने के लिए हमारी **24x7 discrete एम्बुलेंस/पिकअप टीम** की आवश्यकता है?",

  pickupOptions: [
    { id: 'pk_yes', label: 'हाँ, पिकअप सहायता चाहिए', payload: 'pickup_yes' },
    { id: 'pk_no', label: 'नहीं, हम खुद लेकर आएंगे', payload: 'pickup_no' }
  ] as QuickReply[],

  registrationSubmitting:
    "आपकी पंजीकरण जानकारी Mitrangan मेडिकल टीम को सुरक्षित भेजी जा रही है...",
  registrationSuccess: (userId: string, name: string) =>
    `### पंजीकरण सफल रहा!\n\n**यूजर आईडी (User ID): ${userId}**\n**मरीज:** ${name}\n**स्थिति:** समीक्षा के लिए लंबित (Pending)\n\nआपका पंजीकरण सफलतापूर्वक प्राप्त हो गया है। कृपया अपनी **User ID (${userId})** संभाल कर रखें, जिससे आप कभी भी स्टेटस देख सकें।\n\nहमारे वरिष्ठ परामर्शदाता जल्द ही आपसे संपर्क करेंगे। यदि स्थिति गंभीर है, तो कृपया तुरंत हमारे हेल्पलाइन नंबर पर संपर्क करें।`,

  registrationError: (msg: string) =>
    `पंजीकरण जमा करने में समस्या आई: ${msg}\nकृपया पुनः प्रयास करें या सीधे हमारी हेल्पलाइन पर संपर्क करें।`,

  // Validation errors
  errInvalidName: 'कृपया सही पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।',
  errInvalidAge: 'कृपया सही उम्र दर्ज करें (10 से 120 के बीच)।',
  errInvalidMobile: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।',
  errInvalidAddress: 'कृपया सही शहर या पता दर्ज करें (कम से कम 5 अक्षर)।',

  // Status check
  statusPrompt:
    "कृपया अपना **User ID** (जैसे: `MIT-2026-1001` या अपना पंजीकरण नंबर) दर्ज करें:",
  statusSearching: 'डेटाबेस में पंजीकरण स्टेटस की खोज की जा रही है...',
  statusNotFound: (id: string) =>
    `User ID "${id.toUpperCase()}" के लिए कोई सक्रिय पंजीकरण नहीं मिला। कृपया आईडी की जांच करें या हमारे सहायता केंद्र से संपर्क करें।`,
  statusFound: {
    title: 'Mitrangan एडमिशन स्टेटस',
    userIdLabel: 'यूजर आईडी',
    nameLabel: 'मरीज का नाम',
    statusLabel: 'स्थिति (Status)',
    programLabel: 'कार्यक्रम',
    dateLabel: 'पंजीकरण तिथि',
    notes: {
      Pending: 'आपका पंजीकरण प्राप्त हो गया है और फिलहाल समीक्षा के लिए लंबित है।',
      'Under Review': 'आपकी जानकारी की समीक्षा हमारे मेडिकल एवं काउंसलिंग दल द्वारा की जा रही है।',
      Approved: 'प्रवेश स्वीकृत कर लिया गया है! हमारी टीम आपका स्वागत करने के लिए तैयार है।',
      'Not Approved': 'फिलहाल इस आवेदन पर प्रवेश संभव नहीं हो सका। कृपया हमारे काउंसलर से सीधे संपर्क करें।'
    }
  },

  // General Rehab FAQs
  faqMenu: 'नशामुक्ति, पुनर्वास और Mitrangan केंद्र से जुड़े आम सवाल:',
  faqOptions: [
    { id: 'faq_addiction', label: 'नशा क्या है?', payload: 'faq_addiction' },
    { id: 'faq_rehab', label: 'रिहैब में इलाज कैसे होता है?', payload: 'faq_rehab' },
    { id: 'faq_relapse', label: 'दोबारा नशा होने से कैसे बचें?', payload: 'faq_relapse' },
    { id: 'faq_family', label: 'परिवार का क्या महत्व है?', payload: 'faq_family' },
    { id: 'faq_centers', label: 'आपके केंद्र कहाँ स्थित हैं?', payload: 'faq_centers' },
    { id: 'faq_back', label: 'मुख्य मेन्यू पर जाएँ', payload: 'back_to_menu' }
  ] as QuickReply[],

  faqCentersText:
    "### Mitrangan पुनर्वास केंद्र परिसर\n- **नागपुर केंद्र:** बेसा चौक के पास, मानेवाड़ा-बेसा रोड, नागपुर, महाराष्ट्र (हेल्पलाइन: +91 9767362388)\n- **दुर्ग केंद्र:** गुरुद्वारा के पास, स्टेशन रोड, दुर्ग, छत्तीसगढ़ (हेल्पलाइन: +91 7666890795)\n\nदोनों केंद्रों में शांत हरा-भरा वातावरण, 24 घंटे मेडिकल देखरेख, सीसीटीवी सुरक्षा, पौष्टिक भोजन और अनुशासित दिनचर्या उपलब्ध है।",

  // Contact / Human handoff
  contactHeader: 'Mitrangan विशेषज्ञ दल से सीधे बात करें',
  contactText:
    "हमारे वरिष्ठ काउंसलर और डॉक्टर 24 घंटे आपकी सहायता के लिए उपलब्ध हैं। सभी बातचीत पूरी तरह गोपनीय रहती है।",
  emergencyPrompt:
    "यदि यह कोई गंभीर आपातकालीन स्थिति या असहनीय विथड्रॉल का मामला है, तो कृपया तुरंत हमारे 24/7 हेल्पलाइन नंबर पर कॉल करें:",

  // Language switch acknowledgement
  langChangedNotice: 'भाषा बदलकर हिंदी कर दी गई है। मैं आपकी कैसे मदद कर सकता हूँ?',
  menuButton: 'मुख्य मेन्यू',
  restartButton: 'नई बातचीत'
};
