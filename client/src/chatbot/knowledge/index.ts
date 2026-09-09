import { Language } from '../types';

export interface KnowledgeItem {
  id: string;
  topic: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  points?: Record<Language, string[]>;
}

export interface ProgramInfo {
  id: string;
  name: Record<Language, string>;
  shortDescription: Record<Language, string>;
  details: Record<Language, string>;
  duration: Record<Language, string>;
}

export const VERIFIED_CONTACTS = {
  nagpurPhone: '+919767362388',
  nagpurDisplay: '+91 9767362388',
  durgPhone: '+917666890795',
  durgDisplay: '+91 7666890795',
  whatsAppUrl: 'https://wa.me/919767362388?text=Hello%20Mitrangan,%20I%20need%20help%20regarding%20rehabilitation',
  nagpurAddress: 'Mitrangan Rehabilitation Kendra, Near Besa Square, Manewada-Besa Road, Nagpur, Maharashtra - 440037',
  durgAddress: 'Mitrangan Rehabilitation Kendra, Near Gurudwara, Station Road, Durg, Chhattisgarh - 491001'
};

export const MITRANGAN_PROGRAMS: ProgramInfo[] = [
  {
    id: 'alcohol',
    name: {
      en: 'Alcohol Addiction Treatment',
      hi: 'शराब नशामुक्ति कार्यक्रम',
      mr: 'दारू व्यसनमुक्ती कार्यक्रम'
    },
    shortDescription: {
      en: 'Comprehensive medical detox, behavioral therapy, craving management, and relapse prevention.',
      hi: 'सुरक्षित मेडिकल डिटॉक्स, काउंसलिंग, इच्छा नियंत्रण और दोबारा नशा रोकने की योजना।',
      mr: 'सुरक्षित मेडिकल डिटॉक्स, समुपदेशन, व्यसन इच्छा नियंत्रण आणि पुनर्वसन नियोजन.'
    },
    details: {
      en: 'Structured residential care addressing physical withdrawal safely under medical supervision, followed by individual psychological therapy, group support, and family counseling.',
      hi: 'चिकित्सकीय देखरेख में सुरक्षित विथड्रॉल प्रबंधन, जिसके बाद व्यक्तिगत काउंसलिंग, समूह सत्र और पारिवारिक मार्गदर्शन किया जाता है।',
      mr: 'वैद्यकीय देखरेखीखाली सुरक्षित विथड्रॉल व्यवस्थापन, त्यानंतर वैयक्तिक समुपदेशन, गट चर्चा आणि कौटुंबिक मार्गदर्शन केले जाते.'
    },
    duration: {
      en: '60 to 90 Days',
      hi: '६० से ९० दिन',
      mr: '६० ते ९० दिवस'
    }
  },
  {
    id: 'drugs',
    name: {
      en: 'Narcotics & Substance De-Addiction',
      hi: 'मादक पदार्थ (ड्रग्स) नशामुक्ति',
      mr: 'अमली पदार्थ (ड्रग्ज) व्यसनमुक्ती'
    },
    shortDescription: {
      en: 'Clinical protocol for brown sugar, smack, MDMA, and poly-substance dependencies.',
      hi: 'ब्राउन शुगर, एमडी, स्मैक और विभिन्न नशीले पदार्थों के लिए गहन उपचार।',
      mr: 'ब्राउन शुगर, एमडी, स्नॅक व इतर अमली पदार्थांच्या सवयींसाठी विशेष उपचार.'
    },
    details: {
      en: 'Focuses on neurobiological stabilization, intense CBT counseling, emotional regulation, and step-by-step life restructuring.',
      hi: 'शारीरिक संतुलन, गहन मानसिक काउंसलिंग, मनोबल सुधार और जीवनशैली के पुनर्निर्माण पर केंद्रित।',
      mr: 'शारीरिक स्थैर्य, सखोल मानसिक समुपदेशन, मनोबल वाढवणे आणि जीवनशैली सुधारण्यावर भर दिला जातो.'
    },
    duration: {
      en: '90 to 120 Days',
      hi: '९० से १२० दिन',
      mr: '९० ते १२० दिवस'
    }
  },
  {
    id: 'opioids',
    name: {
      en: 'Opioid & Heroin Recovery',
      hi: 'अफीम व हेरोइन नशामुक्ति',
      mr: 'हेरॉईन व ओपिऑईड व्यसनमुक्ती'
    },
    shortDescription: {
      en: 'Gentle, scientifically managed withdrawal and psychiatric stabilization.',
      hi: 'वैज्ञानिक पद्धति से दर्द रहित विथड्रॉल और मानसिक स्थिरता प्रबंधन।',
      mr: 'वैज्ञानिक पद्धतीने विथड्रॉल व्यवस्थापन आणि मानसिक संतुलन पुनर्संचयन.'
    },
    details: {
      en: 'Specialized 24/7 care to safely navigate intense withdrawal symptoms with compassionate nursing and cognitive re-patterning.',
      hi: 'गंभीर विथड्रॉल लक्षणों को सुरक्षित रूप से संभालने के लिए 24 घंटे विशेष नर्सिंग और मनोवैज्ञानिक सहयोग।',
      mr: 'विथड्रॉल त्रासातून सुरक्षित बाहेर काढण्यासाठी २४ तास नर्सिंग आणि मानसोपचार तज्ज्ञांचे मार्गदर्शन.'
    },
    duration: {
      en: '90 to 120 Days',
      hi: '९० से १२० दिन',
      mr: '९० ते १२० दिवस'
    }
  },
  {
    id: 'cannabis',
    name: {
      en: 'Cannabis & Synthetic Drug Addiction',
      hi: 'गांजा और सिंथेटिक ड्रग्स नशामुक्ति',
      mr: 'गांजा आणि सिंथेटिक ड्रग्ज व्यसनमुक्ती'
    },
    shortDescription: {
      en: 'Recovery from marijuana, hashish, synthetic weed, and related psychological dependence.',
      hi: 'गांजा, चरस और रासायनिक नशे की मानसिक निर्भरता को समाप्त करने का उपचार।',
      mr: 'गांजा, चरस आणि रासायनिक नशामधून कायमची सुटका व मानसिक पुनर्वसन.'
    },
    details: {
      en: 'Targeted support for mood swings, paranoia, lethargy, memory lapses, and social withdrawal through mindfulness and psychotherapy.',
      hi: 'चिड़चिड़ापन, सुस्ती और याददाश्त की कमजोरी को दूर करने के लिए ध्यान और मनोचिकित्सा का उपयोग।',
      mr: 'चिडचिड, आळस आणि विस्मृती यांसारख्या लक्षणांवर मात करण्यासाठी समुपदेशन व ध्यानधारणा.'
    },
    duration: {
      en: '60 to 90 Days',
      hi: '६० से ९० दिन',
      mr: '६० ते ९० दिवस'
    }
  },
  {
    id: 'mobile',
    name: {
      en: 'Digital & Mobile Addiction Therapy',
      hi: 'मोबाइल और डिजिटल स्क्रीन नशामुक्ति',
      mr: 'मोबाईल आणि स्क्रीन व्यसनमुक्ती'
    },
    shortDescription: {
      en: 'Restoring real-world focus, natural sleep cycles, and healthy habits for youth and adults.',
      hi: 'युवाओं और बड़ों के लिए स्क्रीन की लत छोड़कर वास्तविक जीवन, पढ़ाई और काम में ध्यान लगाना।',
      mr: 'अति मोबाईल वापरावर नियंत्रण, झोपेचे संतुलन आणि एकाग्रता परत मिळवण्याचे तंत्र.'
    },
    details: {
      en: 'Behavioral conditioning, digital detox periods, outdoor sports, creative engagement, and study/career habit coaching.',
      hi: 'डिजिटल डिटॉक्स, खेलकूद, रचनात्मक गतिविधियाँ और पढ़ाई/करियर के लिए अनुशासन का विकास।',
      mr: 'डिजिटल डिटॉक्स, मैदानी खेळ, सर्जनशीलता आणि अभ्यासात मन रमवण्याचे मार्गदर्शन.'
    },
    duration: {
      en: '30 to 60 Days',
      hi: '३० से ६० दिन',
      mr: '३० ते ६० दिवस'
    }
  },
  {
    id: 'prescription',
    name: {
      en: 'Prescription Drug Dependency',
      hi: 'नींद की गोलियों व दवाओं की लत का उपचार',
      mr: 'झोपेच्या गोळ्या व औषधी सवयींवर उपचार'
    },
    shortDescription: {
      en: 'Overcoming dependency on sedatives, sleeping pills, cough syrups, and pain medications.',
      hi: 'स्लीपिंग पिल्स, कफ सिरप और पेनकिलर की लत से सुरक्षित मुक्ति।',
      mr: 'झोपेच्या गोळ्या, कफ सिरप आणि वेदनाशामक औषधांच्या अतिरेकी सवयींवर मात.'
    },
    details: {
      en: 'Gradual physician-supervised tapering, anxiety management, and natural insomnia treatment modalities.',
      hi: 'डॉक्टर की निगरानी में धीरे-धीरे दवा कम करना, चिंता प्रबंधन और प्राकृतिक नींद के उपाय।',
      mr: 'डॉक्टरांच्या सल्ल्यानुसार हळूहळू गोळ्या कमी करणे आणि नैसर्गिक झोपेसाठी थेरपी.'
    },
    duration: {
      en: '60 to 90 Days',
      hi: '६० से ९० दिन',
      mr: '६० ते ९० दिवस'
    }
  }
];

export const ADMISSION_STEPS = {
  en: [
    { step: 1, title: 'Confidential Call / Inquiry', desc: 'Speak to our counselors or request a callback via chat.' },
    { step: 2, title: 'Free Initial Assessment', desc: 'We understand the individual’s health condition and substance history.' },
    { step: 3, title: 'Safe & Discrete Pickup', desc: 'Trained pickup team available 24x7 across Maharashtra & Chhattisgarh.' },
    { step: 4, title: 'Commence Recovery', desc: 'Admission, medical evaluation, safe room allocation, and healing journey begins.' }
  ],
  hi: [
    { step: 1, title: 'गोपनीय बातचीत / फोन', desc: 'हमारे काउंसलर से सीधे फोन या चैट के जरिए संपर्क करें।' },
    { step: 2, title: 'निःशुल्क प्रारंभिक मूल्यांकन', desc: 'मरीज की स्थिति, नशे के प्रकार और स्वास्थ्य की पूरी जानकारी समझी जाती है।' },
    { step: 3, title: 'सुरक्षित और गोपनीय पिकअप', desc: 'नागपुर, विदर्भ और दुर्ग/छत्तीसगढ़ में 24 घंटे सुरक्षित एम्बुलेंस/टीम सहायता उपलब्ध।' },
    { step: 4, title: 'नई शुरुआत और इलाज', desc: 'प्रवेश, मेडिकल चेकअप, आरामदायक आवास और नए जीवन की शुरुआत।' }
  ],
  mr: [
    { step: 1, title: 'गोपनीय संवाद / फोन', desc: 'आमच्या समुपदेशकांशी थेट फोन किंवा चॅटद्वारे मोफत चर्चा करा.' },
    { step: 2, title: 'विनामूल्य प्राथमिक तपासणी', desc: 'रुग्णाची सद्यस्थिती, व्यसनाचा प्रकार आणि आरोग्याची संपूर्ण माहिती घेतली जाते.' },
    { step: 3, title: 'सुरक्षित व गोपनीय पिकअप', desc: 'नागपूर, विदर्भ आणि दुर्ग/छत्तीसगड परिसरात २४ तास सुरक्षित रुग्णवाहिका व पथक उपलब्ध.' },
    { step: 4, title: 'नवीन आयुष्याची सुरुवात', desc: 'प्रवेश, वैद्यकीय तपासणी, सुरक्षित कक्ष आणि संपूर्ण पुनर्वसन प्रक्रियेची सुरुवात.' }
  ]
};

export const GENERAL_REHAB_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: 'what_is_addiction',
    topic: 'addiction',
    title: {
      en: 'What is Addiction?',
      hi: 'नशा क्या है और यह कैसे होता है?',
      mr: 'व्यसन म्हणजे काय?'
    },
    summary: {
      en: 'Addiction is a chronic, treatable medical condition that alters brain circuitry. It is not simply a moral failure or lack of willpower; with structured care, recovery is completely achievable.',
      hi: 'नशा किसी व्यक्ति की नैतिक कमजोरी नहीं, बल्कि मस्तिष्क और शरीर से जुड़ी एक बीमारी है। सही मेडिकल मदद और काउंसलिंग से कोई भी व्यक्ति पूरी तरह ठीक हो सकता है।',
      mr: 'व्यसन ही केवळ सवय किंवा मनाचा कमकुवतपणा नसून मेंदू आणि शरीराशी संबंधित एक आजार आहे. योग्य उपचार आणि समुपदेशनाने व्यक्ती नक्की बरी होऊ शकते.'
    }
  },
  {
    id: 'what_is_rehab',
    topic: 'rehab',
    title: {
      en: 'How Does Rehabilitation Work at Mitrangan?',
      hi: 'पुनर्वास (रिहैब) केंद्र में इलाज कैसे होता है?',
      mr: 'पुनर्वसन केंद्रामध्ये (रिहॅब) उपचार कसे होतात?'
    },
    summary: {
      en: 'Rehabilitation provides a peaceful, structured environment free from triggers. It combines medically supervised detoxification, psychological counseling, yoga, meditation, life-skill coaching, and relapse prevention.',
      hi: 'रिहैब में व्यक्ति को नशे के माहौल से दूर एक सुरक्षित और शांतिपूर्ण वातावरण मिलता है। यहाँ दवाओं से शरीर का शुद्धिकरण (डिटॉक्स), मनोवैज्ञानिक काउंसलिंग, योग और नई आदतें सिखाई जाती हैं।',
      mr: 'रिहॅब केंद्रामध्ये रुग्णाला व्यसनाच्या वातावरणापासून दूर एक सुरक्षित आणि सकारात्मक वातावरण मिळते. येथे औषधोपचार (डिटॉक्स), समुपदेशन, योग, ध्यान आणि चांगल्या सवयींचे प्रशिक्षण दिले जाते.'
    }
  },
  {
    id: 'relapse_prevention',
    topic: 'relapse',
    title: {
      en: 'What is Relapse & How is it Prevented?',
      hi: 'दोबारा नशा (रिलैप्स) होने से कैसे बचा जाए?',
      mr: 'व्यसन पुन्हा सुरू होणे (रिलॅप्स) कसे टाळावे?'
    },
    summary: {
      en: 'Relapse happens when emotional triggers or old environments overwhelm a person. At Mitrangan, we equip individuals with trigger-coping strategies, stress relief tools, and continuous aftercare support.',
      hi: 'रिलैप्स तब होता है जब पुराना तनाव या पुरानी संगत व्यक्ति को दोबारा प्रभावित करती है। Mitrangan में हम मरीजों को मानसिक मजबूती, तनाव से निपटने के तरीके और डिस्चार्ज के बाद भी सहयोग देते हैं।',
      mr: 'जुना ताण किंवा व्यसनी मित्र भेटल्यास पुन्हा व्यसन सुरू होण्याचा धोका असतो. Mitrangan मध्ये आम्ही रुग्णांना ताणावर मात करण्याचे तंत्र आणि डिस्चार्जनंतरही नियमित मार्गदर्शन देतो.'
    }
  },
  {
    id: 'family_support',
    topic: 'family',
    title: {
      en: 'Why is Family Support Critical in Recovery?',
      hi: 'मरीज के ठीक होने में परिवार का क्या महत्व है?',
      mr: 'रुग्ण बरा होण्यासाठी कुटुंबाची भूमिका का महत्त्वाची आहे?'
    },
    summary: {
      en: 'Family members are the strongest anchor of recovery. We conduct regular family counseling sessions to heal relationships, reduce guilt and resentment, and create a supportive, positive home environment.',
      hi: 'मरीज के पूरी तरह ठीक होने में परिवार का प्यार और समझ सबसे बड़ी ताकत होती है। हम परिवार के लिए विशेष काउंसलिंग सत्र आयोजित करते हैं ताकि घर में विश्वास और सकारात्मकता वापस आ सके।',
      mr: 'रुग्णाला नवजीवन मिळवून देण्यासाठी कुटुंबाची साथ सर्वात महत्त्वाची असते. नातेसंबंधांमधील तणाव दूर करण्यासाठी आम्ही कुटुंबासाठी विशेष समुपदेशन सत्रे आयोजित करतो.'
    }
  }
];
