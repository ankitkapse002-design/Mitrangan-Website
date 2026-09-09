export type Language = 'en' | 'hi' | 'mr';

export type Scenario =
  | 'welcome'
  | 'self'
  | 'family'
  | 'programs'
  | 'admission'
  | 'registration'
  | 'status'
  | 'faq'
  | 'emergency'
  | 'contact';

export type RegistrationStep =
  | 'idle'
  | 'asking_name'
  | 'asking_age'
  | 'asking_mobile'
  | 'asking_address'
  | 'asking_program'
  | 'asking_pickup'
  | 'submitting'
  | 'completed';

export type StatusStep =
  | 'idle'
  | 'asking_userId'
  | 'checking'
  | 'completed';

export interface QuickReply {
  id: string;
  label: string;
  payload: string;
  action?: string;
}

export interface CardData {
  title?: string;
  userId?: string;
  maskedName?: string;
  admissionStatus?: string;
  programPreference?: string;
  registeredDate?: string;
  phoneNagpur?: string;
  phoneDurg?: string;
  whatsAppUrl?: string;
  items?: string[];
  [key: string]: any;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
  language: Language;
  quickReplies?: QuickReply[];
  cardType?: 'contact' | 'status' | 'registration_success' | 'programs_list' | 'emergency';
  cardData?: CardData;
}

export interface RegistrationDraft {
  fullName?: string;
  age?: number;
  mobileNumber?: string;
  address?: string;
  programPreference?: string;
  pickupRequired?: boolean;
}

export interface ConversationState {
  language: Language;
  scenario: Scenario;
  concern?: string;
  registrationStep: RegistrationStep;
  registrationDraft: RegistrationDraft;
  statusStep: StatusStep;
  lastIntent?: string;
}

export interface EngineResult {
  replyText: string;
  nextState: ConversationState;
  quickReplies?: QuickReply[];
  cardType?: 'contact' | 'status' | 'registration_success' | 'programs_list' | 'emergency';
  cardData?: CardData;
}
