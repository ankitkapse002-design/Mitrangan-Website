import { QuickReply } from '../types';

export const mrLocale = {
  kartikName: 'कार्तिक',
  assistantTitle: 'Mitrangan सहाय्यक',
  onlineBadge: 'ऑनलाइन • २४/७ मदत कक्ष',
  langSelectorTitle: 'भाषा',
  welcomeHeader: 'Mitrangan व्यसनमुक्ती व पुनर्वसन केंद्र',
  welcomeMessage:
    "Mitrangan De-Addiction & Rehabilitation Center मध्ये आपले स्वागत आहे।\n\nनमस्कार, मी कार्तिक आहे. मी तुम्हाला व्यसनमुक्ती, पुनर्वसन, प्रवेश प्रक्रिया आणि पुढील पायरी समजून घेण्यास मदत करू शकतो.\n\nतुम्ही स्वतःसाठी मदत शोधत आहात, की कुटुंबातील कोणासाठी?",
  inputPlaceholder: 'कार्तिकला काहीही विचारा (प्रवेश, उपचार, मदत)...',
  sendButton: 'पाठवा',
  resetChatTooltip: 'संवाद पुन्हा सुरू करा',
  closeTooltip: 'चॅट बंद करा',
  talkToTeamButton: 'Mitrangan टीमशी बोला',

  // Quick replies
  initialQuickReplies: [
    { id: 'self', label: 'माझ्यासाठी', payload: 'for_myself' },
    { id: 'family', label: 'माझ्या कुटुंबातील व्यक्तीसाठी', payload: 'for_family' },
    { id: 'admission', label: 'प्रवेशासाठी मदत', payload: 'admission_help' },
    { id: 'programs', label: 'उपचार व कार्यक्रम', payload: 'programs_help' },
    { id: 'info', label: 'फक्त माहिती', payload: 'just_info' },
    { id: 'register', label: 'नोंदणी करा', payload: 'register_now' },
    { id: 'status', label: 'स्टेटस पाहा', payload: 'check_status' }
  ] as QuickReply[],

  scenarioSelf:
    "व्यसनातून बाहेर पडण्याचा पहिला निर्णय घेणे अत्यंत धैर्याचे काम आहे. Mitrangan मध्ये आम्ही तुम्हाला पूर्ण आदर, गोपनीयता आणि सुरक्षित वातावरण देतो. या प्रवासात तुम्ही एकटे नाही आहात.\n\nतुम्हाला कोणत्या व्यसनातून किंवा समस्येतून मुक्ती हवी आहे?",

  scenarioFamily:
    "कुटुंबातील जवळच्या व्यक्तीला व्यसनाच्या आहारी गेलेले पाहणे अत्यंत वेदनादायी असते. कृपया लक्षात ठेवा की व्यसन हा एक आजार आहे आणि योग्य उपचाराने व्यक्ती नक्की पूर्ववत होऊ शकते.\n\nआपल्या कुटुंबातील व्यक्तीसाठी कोणत्या प्रकारच्या उपचारांची आवश्यकता आहे?",

  concernOptions: [
    { id: 'c_alcohol', label: 'दारू / अल्कोहोलचे व्यसन', payload: 'concern_alcohol' },
    { id: 'c_drugs', label: 'ड्रग्ज / अमली पदार्थ', payload: 'concern_drugs' },
    { id: 'c_opioids', label: 'हेरॉईन / अफीम / स्नॅक', payload: 'concern_opioids' },
    { id: 'c_cannabis', label: 'गांजा / चरस / केमिकल', payload: 'concern_cannabis' },
    { id: 'c_mobile', label: 'मोबाईल / स्क्रीनचे व्यसन', payload: 'concern_mobile' },
    { id: 'c_prescription', label: 'झोपेच्या गोळ्या / औषधे', payload: 'concern_prescription' },
    { id: 'c_other', label: 'समुपदेशकांशी थेट बोला', payload: 'talk_to_team' }
  ] as QuickReply[],

  concernResponse: (concernName: string) =>
    `माहिती दिल्याबद्दल धन्यवाद. Mitrangan मध्ये ${concernName} मधून कायमची मुक्ती मिळवून देण्यासाठी विशेष वैद्यकीय डिटॉक्स आणि मानसोपचार उपलब्ध आहेत.\n\nआमच्या केंद्रात सुरक्षित उपचार, योग आणि सन्मानपूर्वक वातावरण मिळते. तुम्हाला प्रवेश प्रक्रिया जाणून घ्यायची आहे, नोंदणी करायची आहे की समुपदेशकांशी बोलायचे आहे?`,

  // Admission info
  admissionInfo:
    "### Mitrangan प्रवेश (Admission) प्रक्रिया\n1. **गोपनीय संपर्क**: फोन, व्हॉट्सॲप किंवा चॅटद्वारे आमच्याशी निःसंकोच संपर्क साधा.\n2. **विनामूल्य समुपदेशन**: डॉक्टर व समुपदेशक रुग्णाची शारीरिक स्थिती व व्यसनाचा इतिहास समजून घेतात.\n3. **सुरक्षित व गोपनीय पिकअप**: महाराष्ट्र आणि छत्तीसगडमध्ये २४ तास सुरक्षित रुग्णवाहिका सहाय्य उपलब्ध.\n4. **पुनर्वसनाला सुरुवात**: केंद्रात सुरक्षित प्रवेश, वैद्यकीय तपासणी, सुरक्षित कक्ष आणि नवजीवनाचा प्रारंभ.",

  admissionQuickReplies: [
    { id: 'adm_reg', label: 'नोंदणी सुरू करा', payload: 'register_now' },
    { id: 'adm_call', label: '२४/७ हेल्पलाईनवर संपर्क करा', payload: 'talk_to_team' },
    { id: 'adm_pickup', label: 'तातडीची पिकअप माहिती', payload: 'emergency_pickup' },
    { id: 'adm_back', label: 'मुख्य मेन्यूवर जा', payload: 'back_to_menu' }
  ] as QuickReply[],

  // Registration flow
  registrationStart:
    "मी केवळ एका मिनिटात तुमची प्राथमिक प्रवेश नोंदणी पूर्ण करण्यास मदत करू शकतो. तुमची संपूर्ण माहिती पूर्णपणे गोपनीय ठेवली जाते.\n\nसुरुवात करूया: **रुग्णाचे संपूर्ण नाव काय आहे?**",
  registrationAskAge: (name: string) =>
    `धन्यवाद, ${name}. **रुग्णाचे वय (Age) किती आहे?** (उदा. २८)`,
  registrationAskMobile:
    "समजले. **संपर्कासाठी मुख्य मोबाईल नंबर काय आहे?** (१० अंकी क्रमांक)",
  registrationAskAddress:
    "धन्यवाद. **तुमचे शहर किंवा पत्ता काय आहे?** (उदा. नागपूर, वर्धा, दुर्ग, रायपूर)",
  registrationAskProgram:
    "जवळजवळ पूर्ण झाले! आपण कोणत्या कार्यक्रमांतर्गत प्रवेश घेऊ इच्छिता?",
  registrationAskPickup:
    "रुग्णाला केंद्रापर्यंत सुरक्षित आणण्यासाठी आमच्या **२४ तास discrete रुग्णवाहिका/पिकअप पथकाची** आवश्यकता आहे का?",

  pickupOptions: [
    { id: 'pk_yes', label: 'होय, पिकअप मदत हवी आहे', payload: 'pickup_yes' },
    { id: 'pk_no', label: 'नाही, आम्ही स्वतः घेऊन येऊ', payload: 'pickup_no' }
  ] as QuickReply[],

  registrationSubmitting:
    "तुमची नोंदणी माहिती Mitrangan वैद्यकीय पथकाकडे सुरक्षित पाठवली जात आहे...",
  registrationSuccess: (userId: string, name: string) =>
    `### नोंदणी यशस्वी झाली!\n\n**युझर आयडी (User ID): ${userId}**\n**रुग्ण:** ${name}\n**स्थिती:** तपासणीसाठी प्रलंबित (Pending)\n\nतुमची नोंदणी यशस्वीरीत्या प्राप्त झाली आहे. कृपया आपला **User ID (${userId})** जपून ठेवा, ज्यामुळे तुम्ही कधीही स्टेटस तपासू शकता.\n\nआमचे वरिष्ठ समुपदेशक लवकरच तुमच्याशी संपर्क साधतील. परिस्थिती तातडीची असल्यास कृपया लगेच आमच्या २४/७ हेल्पलाईनवर संपर्क साधा.`,

  registrationError: (msg: string) =>
    `नोंदणी पूर्ण करताना अडचण आली: ${msg}\nकृपया पुन्हा प्रयत्न करा किंवा थेट आमच्या हेल्पलाईनवर संपर्क साधा.`,

  // Validation errors
  errInvalidName: 'कृपया वैध पूर्ण नाव प्रविष्ट करा (किमान २ अक्षरे).',
  errInvalidAge: 'कृपया योग्य वय प्रविष्ट करा (१० ते १२० दरम्यान).',
  errInvalidMobile: 'कृपया योग्य १० अंकी मोबाईल नंबर प्रविष्ट करा.',
  errInvalidAddress: 'कृपया योग्य शहर किंवा पत्ता प्रविष्ट करा (किमान ५ अक्षरे).',

  // Status check
  statusPrompt:
    "कृपया आपला **User ID** (उदा: `MIT-2026-1001` किंवा नोंदणी क्रमांक) प्रविष्ट करा:",
  statusSearching: 'डेटाबेसमध्ये नोंदणी तपासली जात आहे...',
  statusNotFound: (id: string) =>
    `User ID "${id.toUpperCase()}" साठी कोणतीही सक्रिय नोंदणी सापडली नाही. कृपया आयडी तपासा किंवा आमच्या मदत केंद्राशी संपर्क साधा.`,
  statusFound: {
    title: 'Mitrangan प्रवेश स्टेटस',
    userIdLabel: 'युझर आयडी',
    nameLabel: 'रुग्णाचे नाव',
    statusLabel: 'स्थिती (Status)',
    programLabel: 'कार्यक्रम',
    dateLabel: 'नोंदणी तारीख',
    notes: {
      Pending: 'तुमची नोंदणी प्राप्त झाली आहे आणि सध्या ती तपासणीसाठी प्रलंबित आहे।',
      'Under Review': 'तुमच्या अर्जाची तपासणी आमच्या वैद्यकीय व समुपदेशन पथकाकडून केली जात आहे.',
      Approved: 'प्रवेश मंजूर करण्यात आला आहे! आमची टीम तुमचे स्वागत करण्यास सज्ज आहे.',
      'Not Approved': 'सध्या या अर्जावर प्रवेश प्रक्रिया शक्य झाली नाही. कृपया आमच्या समुपदेशकांशी थेट संपर्क साधावा.'
    }
  },

  // General Rehab FAQs
  faqMenu: 'व्यसनमुक्ती, पुनर्वसन आणि Mitrangan केंद्राविषयी नेहमी विचारले जाणारे प्रश्न:',
  faqOptions: [
    { id: 'faq_addiction', label: 'व्यसन म्हणजे काय?', payload: 'faq_addiction' },
    { id: 'faq_rehab', label: 'रिहॅबमध्ये उपचार कसे होतात?', payload: 'faq_rehab' },
    { id: 'faq_relapse', label: 'पुन्हा व्यसन सुरू होणे कसे टाळावे?', payload: 'faq_relapse' },
    { id: 'faq_family', label: 'कुटुंबाची भूमिका का महत्त्वाची?', payload: 'faq_family' },
    { id: 'faq_centers', label: 'तुमचे केंद्र कुठे आहे?', payload: 'faq_centers' },
    { id: 'faq_back', label: 'मुख्य मेन्यूवर जा', payload: 'back_to_menu' }
  ] as QuickReply[],

  faqCentersText:
    "### Mitrangan पुनर्वसन केंद्र परिसर\n- **नागपूर केंद्र:** बेसा चौक जवळ, मानेवाडा-बेसा रोड, नागपूर, महाराष्ट्र (हेल्पलाईन: +91 9767362388)\n- **दुर्ग केंद्र:** गुरुद्वारा जवळ, स्टेशन रोड, दुर्ग, छत्तीसगड (हेल्पलाईन: +91 7666890795)\n\nदोन्ही केंद्रांमध्ये शांत व निसर्गरम्य परिसर, २४ तास डॉक्टरांची देखरेख, सीसीटीव्ही सुरक्षा, सकस आहार आणि शिस्तबद्ध दिनचर्या उपलब्ध आहे.",

  // Contact / Human handoff
  contactHeader: 'Mitrangan तज्ज्ञ पथकाशी थेट बोला',
  contactText:
    "आमचे वरिष्ठ समुपदेशक आणि वैद्यकीय अधिकारी २४ तास मदतीसाठी उपलब्ध आहेत. सर्व संभाषण पूर्णपणे गोपनीय ठेवले जाते.",
  emergencyPrompt:
    "परिस्थिती अतिशय गंभीर असल्यास किंवा तातडीच्या वैद्यकीय मदतीची गरज असल्यास कृपया लगेच आमच्या २४ तास हेल्पलाईनवर कॉल करा:",

  // Language switch acknowledgement
  langChangedNotice: 'भाषा मराठी केली आहे. मी तुम्हाला कशी मदत करू शकतो?',
  menuButton: 'मुख्य मेन्यू',
  restartButton: 'नवीन संवाद'
};
