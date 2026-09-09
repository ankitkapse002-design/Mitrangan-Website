import { Language } from '../types';

// Devanagari Unicode Range: \u0900-\u097F
const DEVANAGARI_REGEX = /[\u0900-\u097F]/;

const MARATHI_DEVANAGARI_KEYWORDS = [
  'आहे', 'आहेत', 'माहिती', 'पाहिजे', 'मला', 'माझ्या', 'कसे', 'काय', 'होते',
  'करा', 'प्रवेश', 'व्यसनमुक्ती', 'नाही', 'कधी', 'कुठे', 'नमस्कार', 'नोंदणी',
  'तपासणी', 'मदत', 'रुग्ण', 'उपचार', 'केंद्रात', 'कुटुंब', 'व्यसन'
];

const HINDI_DEVANAGARI_KEYWORDS = [
  'है', 'हैं', 'जानकारी', 'चाहिए', 'मुझे', 'मेरे', 'नमस्ते', 'करना', 'कैसे',
  'क्या', 'नशामुक्ति', 'नहीं', 'कब', 'कहाँ', 'एडमिशन', 'पंजीकरण', 'मदद',
  'मरीज', 'इलाज', 'केंद्र', 'परिवार', 'नशा', 'बताएं', 'कृपया'
];

const MARATHI_LATIN_KEYWORDS = [
  'mala', 'ahe', 'aahe', 'mahit', 'mahiti', 'pahije', 'majhya', 'kasa', 'kay',
  'namaskar', 'vyasan', 'nondani', 'madat', 'upchar', 'kutumb'
];

const HINDI_LATIN_KEYWORDS = [
  'mujhe', 'chahiye', 'jankari', 'mera', 'mere', 'kaise', 'kya', 'namaste',
  'nasha', 'nashe', 'panjikaran', 'madad', 'mareez', 'kripya', 'batao', 'bataiye'
];

/**
 * Automatically detects whether the input string is predominantly Hindi, Marathi, or English.
 * Returns null if no strong confidence, allowing conversation state to retain current language.
 */
export function detectLanguageFromText(text: string): Language | null {
  if (!text || text.trim().length === 0) return null;

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // 1. Check Devanagari Script
  if (DEVANAGARI_REGEX.test(trimmed)) {
    let mrScore = 0;
    let hiScore = 0;

    for (const word of MARATHI_DEVANAGARI_KEYWORDS) {
      if (trimmed.includes(word)) mrScore += 2;
    }

    for (const word of HINDI_DEVANAGARI_KEYWORDS) {
      if (trimmed.includes(word)) hiScore += 2;
    }

    if (mrScore > hiScore && mrScore > 0) return 'mr';
    if (hiScore > mrScore && hiScore > 0) return 'hi';
    
    // Devanagari fallback: If both or neither match, check character subtleties
    if (trimmed.includes('ळ')) return 'mr'; // 'ळ' is characteristically Marathi in modern Devanagari
    if (mrScore > 0) return 'mr';
    if (hiScore > 0) return 'hi';

    // Default to Hindi for ambiguous Devanagari
    return 'hi';
  }

  // 2. Check Transliterated / Romanized Hindi vs Marathi
  let mrLatinScore = 0;
  let hiLatinScore = 0;

  for (const token of MARATHI_LATIN_KEYWORDS) {
    if (new RegExp(`\\b${token}\\b`, 'i').test(lower)) mrLatinScore += 2;
  }

  for (const token of HINDI_LATIN_KEYWORDS) {
    if (new RegExp(`\\b${token}\\b`, 'i').test(lower)) hiLatinScore += 2;
  }

  if (mrLatinScore > hiLatinScore && mrLatinScore >= 2) return 'mr';
  if (hiLatinScore > mrLatinScore && hiLatinScore >= 2) return 'hi';

  // 3. Check for clear English stopwords/keywords
  const ENGLISH_KEYWORDS = [
    'i', 'want', 'to', 'know', 'about', 'admission', 'help', 'need', 'please',
    'how', 'what', 'where', 'when', 'why', 'is', 'for', 'the', 'my', 'can',
    'center', 'rehabilitation', 'program', 'cost', 'fee', 'doctor'
  ];

  let enScore = 0;
  for (const token of ENGLISH_KEYWORDS) {
    if (new RegExp(`\\b${token}\\b`, 'i').test(lower)) enScore += 2;
  }

  if (enScore >= 2) return 'en';

  // Ambiguous or internal string: retain current language
  return null;
}

/**
 * Detects browser language preference for the initial session.
 */
export function getInitialBrowserLanguage(): Language {
  try {
    if (typeof window === 'undefined' || !window.navigator) return 'en';

    const lang = (window.navigator.language || '').toLowerCase();
    if (lang.startsWith('mr')) return 'mr';
    if (lang.startsWith('hi')) return 'hi';

    const languages = window.navigator.languages || [];
    for (const l of languages) {
      const lower = l.toLowerCase();
      if (lower.startsWith('mr')) return 'mr';
      if (lower.startsWith('hi')) return 'hi';
    }
  } catch {
    // Ignore fallback
  }

  return 'en';
}
