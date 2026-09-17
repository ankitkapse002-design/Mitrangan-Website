import { QuickReply } from '../types';

export const enLocale = {
  mitraName: 'Aasha',
  assistantTitle: 'Mitrangan Assistant',
  onlineBadge: 'Online • 24/7 Support',
  langSelectorTitle: 'Language',
  welcomeHeader: 'Welcome to Mitrangan De-Addiction & Rehabilitation Center',
  welcomeMessage:
    "Welcome to Mitrangan De-Addiction & Rehabilitation Center.\n\nHi, I'm Aasha. I'm here to help you understand recovery, rehabilitation, admission, and the next step.\n\nAre you looking for help for yourself, or for someone in your family?",
  inputPlaceholder: 'Ask Aasha anything (admission, programs, help)...',
  typingIndicator: 'Aasha is typing...',
  sendButton: 'Send',
  resetChatTooltip: 'Restart conversation',
  closeTooltip: 'Close chat',
  talkToTeamButton: 'Talk to Mitrangan Team',
  
  // Quick replies
  initialQuickReplies: [
    { id: 'self', label: 'For Myself', payload: 'for_myself' },
    { id: 'family', label: 'For My Family', payload: 'for_family' },
    { id: 'admission', label: 'Admission Help', payload: 'admission_help' },
    { id: 'programs', label: 'Programs & Treatments', payload: 'programs_help' },
    { id: 'info', label: 'Just Information', payload: 'just_info' },
    { id: 'register', label: 'Register Now', payload: 'register_now' },
    { id: 'status', label: 'Check Status', payload: 'check_status' }
  ] as QuickReply[],

  scenarioSelf:
    "I understand that taking this first step takes immense courage. At Mitrangan, we provide a safe, respectful, and confidential space with complete dignity. You don't have to face this alone.\n\nWhat kind of substance or concern are you dealing with?",
  
  scenarioFamily:
    "Watching a loved one struggle with addiction can be painful and exhausting for the entire family. Please remember that addiction is a treatable health condition, not a moral failure.\n\nWhat kind of support is your family member in need of?",

  concernOptions: [
    { id: 'c_alcohol', label: 'Alcohol / Drinking', payload: 'concern_alcohol' },
    { id: 'c_drugs', label: 'Drugs / Narcotics / MDMA', payload: 'concern_drugs' },
    { id: 'c_opioids', label: 'Opioids / Smack / Heroin', payload: 'concern_opioids' },
    { id: 'c_cannabis', label: 'Cannabis / Weed / Ganja', payload: 'concern_cannabis' },
    { id: 'c_mobile', label: 'Mobile / Screen Addiction', payload: 'concern_mobile' },
    { id: 'c_prescription', label: 'Sleeping Pills / Medicines', payload: 'concern_prescription' },
    { id: 'c_other', label: 'Talk to a Counselor', payload: 'talk_to_team' }
  ] as QuickReply[],

  concernResponse: (concernName: string) =>
    `Thank you for sharing that. Mitrangan has specialized medical and psychological protocols specifically designed for ${concernName}.\n\nOur structured residential care ensures a safe detox, compassionate therapy, and complete life restoration. Would you like to check admission steps, start a quick registration, or speak with our senior counselor?`,

  // Admission info
  admissionInfo:
    "### Mitrangan Admission Process\n1. **Confidential Call or Inquiry**: Connect with us via chat, WhatsApp, or phone.\n2. **Free Clinical Consultation**: We assess health condition and substance history.\n3. **Safe & Discrete Pickup**: Available 24x7 across Maharashtra and surrounding regions.\n4. **Structured Recovery**: Safe room allocation, medical evaluation, and healing begins.",
  
  admissionQuickReplies: [
    { id: 'adm_reg', label: 'Start Registration', payload: 'register_now' },
    { id: 'adm_call', label: 'Call 24/7 Helpline', payload: 'talk_to_team' },
    { id: 'adm_pickup', label: 'Emergency Pickup Details', payload: 'emergency_pickup' },
    { id: 'adm_back', label: 'Back to Menu', payload: 'back_to_menu' }
  ] as QuickReply[],

  // Registration flow
  registrationStart:
    "I can help you complete a quick admission pre-registration in just a minute. All information is confidential and securely stored.\n\nLet's start: **What is the patient's Full Name?**",
  registrationAskAge: (name: string) =>
    `Thank you, ${name}. **What is the patient's age?** (e.g. 28)`,
  registrationAskMobile:
    "Got it. **What is the primary contact mobile number?** (10 digits)",
  registrationAskAddress:
    "Thank you. **What is your city or address?** (e.g. Nagpur, Wardha, Amravati, Chandrapur)",
  registrationAskProgram:
    "Almost done! Which recovery program are you seeking admission for?",
  registrationAskPickup:
    "Do you require our **discrete ambulance/pickup assistance** to transport the patient to our center safely?",
  
  pickupOptions: [
    { id: 'pk_yes', label: 'Yes, 24x7 Pickup Required', payload: 'pickup_yes' },
    { id: 'pk_no', label: 'No, We will bring the patient', payload: 'pickup_no' }
  ] as QuickReply[],

  registrationSubmitting:
    "Submitting your registration securely to Mitrangan intake team...",
  registrationSuccess: (userId: string, name: string) =>
    `### Registration Confirmed!\n\n**User ID: ${userId}**\n**Patient:** ${name}\n**Status:** Pending Review\n\nYour registration has been received successfully. Please save your **User ID (${userId})** to check your status at any time.\n\nOur senior medical intake officer will reach out shortly. If this is urgent, feel free to call our 24/7 helpline immediately.`,
  
  registrationError: (msg: string) =>
    `There was an issue submitting your registration: ${msg}\nPlease try again or contact our helpline directly.`,

  // Validation errors
  errInvalidName: 'Please enter a valid full name (at least 2 letters).',
  errInvalidAge: 'Please enter a valid age (between 10 and 120).',
  errInvalidMobile: 'Please enter a valid 10-digit mobile number.',
  errInvalidAddress: 'Please provide a valid city or address (at least 5 characters).',

  // Status check
  statusPrompt:
    "Please enter your 4-12 digit **User ID** (e.g., `MIT-2026-1001` or your registered ID number) to check current admission status:",
  statusSearching: 'Checking admission status in the official database...',
  statusNotFound: (id: string) =>
    `No active admission record was found for User ID "${id.toUpperCase()}". Please verify the ID or contact our intake desk.`,
  statusFound: {
    title: 'Mitrangan Admission Status',
    userIdLabel: 'User ID',
    nameLabel: 'Patient',
    statusLabel: 'Status',
    programLabel: 'Program',
    dateLabel: 'Registered',
    notes: {
      Pending: 'Your registration has been received and is currently pending review.',
      'Under Review': 'Your details are currently being reviewed by our clinical intake team.',
      Approved: 'Admission has been approved! Our team is ready to welcome you.',
      'Not Approved': 'Admission could not be processed at this time. Please call our counselor directly.'
    }
  },

  // General Rehab FAQs
  faqMenu: 'Here are common questions about addiction, recovery, and life at Mitrangan:',
  faqOptions: [
    { id: 'faq_addiction', label: 'What is Addiction?', payload: 'faq_addiction' },
    { id: 'faq_rehab', label: 'How Does Rehab Work?', payload: 'faq_rehab' },
    { id: 'faq_relapse', label: 'How to Prevent Relapse?', payload: 'faq_relapse' },
    { id: 'faq_family', label: 'Why Family Support Matters?', payload: 'faq_family' },
    { id: 'faq_centers', label: 'Where is your Center?', payload: 'faq_centers' },
    { id: 'faq_back', label: 'Back to Main Menu', payload: 'back_to_menu' }
  ] as QuickReply[],

  faqCentersText:
    "### Mitrangan Rehabilitation Center\n- **Nagpur Campus:** Plot no. 7, Manasvi Multi-speciality hospital, Khangar layout, opposite Satyam Garden, Godhani, Nagpur - 441123, Maharashtra (Helpline: +91 9767362388)\n\nOur facility features a peaceful green campus, round-the-clock medical care, CCTV security, healthy nutrition, and structured rehabilitation routines.",

  // Contact / Human handoff
  contactHeader: 'Talk to Mitrangan Human Support Team',
  contactText:
    "Our counselors, doctors, and intake coordinators are available 24 hours a day, 7 days a week. All inquiries are strictly confidential.",
  emergencyPrompt:
    "If this is a critical medical emergency or severe acute crisis, please call our direct 24x7 helpline immediately:",

  // Language switch acknowledgement
  langChangedNotice: 'Language updated to English. How can I assist you now?',
  menuButton: 'Main Menu',
  restartButton: 'Restart Chat'
};
