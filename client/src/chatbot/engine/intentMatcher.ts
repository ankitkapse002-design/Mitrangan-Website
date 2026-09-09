import { matchesAnyKeyword, normalizeInput } from './normalizer';

export type RecognizedIntent =
  | 'self_help'
  | 'family_help'
  | 'admission_help'
  | 'pickup_request'
  | 'concern_alcohol'
  | 'concern_drugs'
  | 'concern_opioids'
  | 'concern_cannabis'
  | 'concern_mobile'
  | 'concern_prescription'
  | 'register_now'
  | 'check_status'
  | 'talk_to_team'
  | 'emergency'
  | 'faq_addiction'
  | 'faq_rehab'
  | 'faq_relapse'
  | 'faq_family'
  | 'faq_centers'
  | 'programs_help'
  | 'greeting'
  | 'menu'
  | 'unknown';

export function matchIntent(input: string): RecognizedIntent {
  const norm = normalizeInput(input);

  // 1. Direct Payload Matching
  if (norm === 'for_myself' || norm === 'self') return 'self_help';
  if (norm === 'for_family' || norm === 'family') return 'family_help';
  if (norm === 'admission_help') return 'admission_help';
  if (norm === 'programs_help') return 'programs_help';
  if (norm === 'emergency_pickup') return 'pickup_request';
  if (norm === 'register_now') return 'register_now';
  if (norm === 'check_status') return 'check_status';
  if (norm === 'talk_to_team') return 'talk_to_team';
  if (norm === 'back_to_menu' || norm === 'menu') return 'menu';
  if (norm === 'just_info') return 'programs_help';

  // Direct Concern Payloads
  if (norm === 'concern_alcohol') return 'concern_alcohol';
  if (norm === 'concern_drugs') return 'concern_drugs';
  if (norm === 'concern_opioids') return 'concern_opioids';
  if (norm === 'concern_cannabis') return 'concern_cannabis';
  if (norm === 'concern_mobile') return 'concern_mobile';
  if (norm === 'concern_prescription') return 'concern_prescription';

  // Direct FAQ Payloads
  if (norm === 'faq_addiction') return 'faq_addiction';
  if (norm === 'faq_rehab') return 'faq_rehab';
  if (norm === 'faq_relapse') return 'faq_relapse';
  if (norm === 'faq_family') return 'faq_family';
  if (norm === 'faq_centers') return 'faq_centers';

  // 2. Emergency / Critical intent
  if (matchesAnyKeyword(norm, [
    'emergency', 'urgent', 'overdose', 'critical', 'suicide', 'unconscious',
    'आपातकालीन', 'गंभीर', 'तातडीचे', 'बेहोश', 'प्राणघातक'
  ])) {
    return 'emergency';
  }

  // 3. Status Checking Intent
  if (
    /^mit-\d+/i.test(norm) ||
    matchesAnyKeyword(norm, [
      'check status', 'status', 'application status', 'स्टेटस', 'स्थिति', 'तपासा',
      'user id', 'userid', 'nondani number', 'track'
    ])
  ) {
    return 'check_status';
  }

  // 4. Registration Intent
  if (matchesAnyKeyword(norm, [
    'register', 'registration', 'admit', 'admission form', 'online registration',
    'रजिस्टर', 'रजिस्ट्रेशन', 'पंजीकरण', 'नोंदणी', 'दाखल करणे', 'form'
  ])) {
    return 'register_now';
  }

  // 5. Contact / Call Human Team
  if (matchesAnyKeyword(norm, [
    'call', 'phone', 'contact', 'helpline', 'whatsapp', 'counselor', 'human', 'doctor', 'number',
    'कॉल', 'फोन', 'संपर्क', 'नंबर', 'काउंसलर', 'व्हॉट्सॲप', 'बात करनी है', 'बोलायचे आहे'
  ])) {
    return 'talk_to_team';
  }

  // 6. Self vs Family
  if (matchesAnyKeyword(norm, [
    'myself', 'for me', 'i need help', 'my addiction', 'मेरे लिए', 'माझ्यासाठी',
    'mujhe madat', 'mala madat', 'me swatah', 'main khud'
  ])) {
    return 'self_help';
  }

  if (matchesAnyKeyword(norm, [
    'family', 'brother', 'husband', 'father', 'son', 'relative', 'friend',
    'परिवार', 'भाई', 'बेटा', 'पति', 'पिता', 'दोस्त',
    'कुटुंब', 'भाऊ', 'मुलगा', 'पती', 'वडील', 'मित्र'
  ])) {
    return 'family_help';
  }

  // 7. Concerns
  if (matchesAnyKeyword(norm, ['alcohol', 'daru', 'sharab', 'wine', 'beer', 'दारू', 'शराब', 'मद्य'])) {
    return 'concern_alcohol';
  }
  if (matchesAnyKeyword(norm, ['opioid', 'heroin', 'smack', 'afeem', 'opium', 'अफीम', 'हेरोइन'])) {
    return 'concern_opioids';
  }
  if (matchesAnyKeyword(norm, ['cannabis', 'weed', 'ganja', 'charas', 'bhang', 'गांजा', 'चरस'])) {
    return 'concern_cannabis';
  }
  if (matchesAnyKeyword(norm, ['drug', 'drugs', 'mdma', 'cocaine', 'powder', 'ड्रग्स', 'अमली पदार्थ', 'मादक'])) {
    return 'concern_drugs';
  }
  if (matchesAnyKeyword(norm, ['mobile', 'screen', 'phone', 'gaming', 'गेमिंग', 'स्क्रीन', 'मोबाईल'])) {
    return 'concern_mobile';
  }
  if (matchesAnyKeyword(norm, ['sleeping pill', 'prescription', 'sedative', 'tablets', 'दवा', 'गोली', 'औषध'])) {
    return 'concern_prescription';
  }

  // 8. Admission & Pickup
  if (matchesAnyKeyword(norm, ['pickup', 'ambulance', 'गाड़ी', 'पिकअप', 'रुग्णवाहिका'])) {
    return 'pickup_request';
  }
  if (matchesAnyKeyword(norm, ['admission', 'admit', 'admission process', 'प्रवेश', 'भर्ती', 'दाखल'])) {
    return 'admission_help';
  }

  // 9. FAQs & Centers
  if (matchesAnyKeyword(norm, ['what is addiction', 'नशा क्या है', 'व्यसन म्हणजे काय'])) {
    return 'faq_addiction';
  }
  if (matchesAnyKeyword(norm, ['how rehab works', 'rehab', 'rehabilitation', 'पुनर्वसन', 'रिहैब'])) {
    return 'faq_rehab';
  }
  if (matchesAnyKeyword(norm, ['relapse', 'रिलैप्स', 'दोबारा नशा', 'पुन्हा व्यसन'])) {
    return 'faq_relapse';
  }
  if (matchesAnyKeyword(norm, ['family role', 'family support', 'परिवार का महत्व', 'कुटुंबाची भूमिका'])) {
    return 'faq_family';
  }
  if (matchesAnyKeyword(norm, ['center', 'location', 'address', 'nagpur', 'durg', 'कहाँ है', 'कुठे आहे', 'पत्ता'])) {
    return 'faq_centers';
  }
  if (matchesAnyKeyword(norm, ['programs', 'treatment', 'treatments', 'कार्यक्रम', 'इलाज', 'उपचार'])) {
    return 'programs_help';
  }

  // 10. Greetings & Menu
  if (matchesAnyKeyword(norm, ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'नमस्ते', 'नमस्कार'])) {
    return 'greeting';
  }
  if (matchesAnyKeyword(norm, ['menu', 'start', 'options', 'home', 'main menu', 'शुरू', 'मेन्यू'])) {
    return 'menu';
  }

  return 'unknown';
}
