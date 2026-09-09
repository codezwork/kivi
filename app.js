/* ========================================================================
   KIVI — Application Logic (Repositioned)
   State management, navigation, onboarding, register CRUD, dictation sim.
   ======================================================================== */

// ── Profession-specific data ──────────────────────────────────────────────
// Court and Teacher are primary personas; Government and Other are secondary.

// ── SVG Icon Constants (replaces emoji for cross-platform consistency) ────
const SVG_ICONS = {
  document: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>',
  draft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  filed: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success, #1E4D3A)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/></svg>',
};

const PROFESSION_DATA = {
  court: {
    label: 'District Court Staff',
    registers: [
      {
        name: 'Civil Petition',
        category: 'register-legal',
        lang: 'Marathi',
        script: 'native',
        tone: 'formal',
        fields: ['Court Name', 'Case Number', 'Date', 'Petitioner', 'Respondent', 'Subject'],
        preview: 'माननीय न्यायालय के समक्ष... याचिकाकर्ता बनाम प्रतिवादी...',
      },
      {
        name: 'Case Order',
        category: 'register-legal',
        lang: 'Marathi',
        script: 'native',
        tone: 'formal',
        fields: ['Order Number', 'Date', 'Case Reference', 'Order Text', 'Judge Name'],
        preview: 'आदेश क्रमांक... दिनांक... प्रकरण संदर्भ...',
      },
    ],
    dictionary: [
      { word: 'याचिकाकर्ता', romanized: 'Yachikakarta', meaning: 'Petitioner' },
      { word: 'प्रतिवादी', romanized: 'Prativadi', meaning: 'Respondent' },
      { word: 'न्यायाधीश', romanized: 'Nyayadhish', meaning: 'Judge' },
      { word: 'अधिवक्ता', romanized: 'Adhivakta', meaning: 'Advocate' },
      { word: 'शपथ पत्र', romanized: 'Shapath Patra', meaning: 'Affidavit' },
      { word: 'गडचिरोली', romanized: 'Gadchiroli', meaning: 'Gadchiroli' },
    ],
    shortcuts: [
      { trigger: 'court header', expansion: 'माननीय न्यायालय के समक्ष\nदिनांक: ___\nप्रकरण क्रमांक: ___' },
      { trigger: 'petitioner line', expansion: 'याचिकाकर्ता: ___\nपता: ___\nउम्र: ___' },
    ],
    confidenceDemo: `माननीय न्यायालय के समक्ष, याचिकाकर्ता <span class="confidence-word confidence-high">श्री राजेश कुमार<span class="confidence-tooltip">✓ verified — in dictionary</span></span> बनाम प्रतिवादी <span class="confidence-word confidence-medium">सुनील पाटील<span class="confidence-tooltip">⚠ review — 82% match</span></span>, प्रकरण क्रमांक <span class="confidence-word confidence-low">४२/२०२६<span class="confidence-tooltip">✕ uncertain — verify case number</span></span>, दिनांक आज, <span class="confidence-word confidence-high">गडचिरोली<span class="confidence-tooltip">✓ verified — in dictionary</span></span> जिला न्यायालय।`,
    dictationPrompt: 'try: "माननीय न्यायालय के समक्ष, याचिकाकर्ता श्री राजेश कुमार..."',
    recentTakes: [
      { text: 'माननीय न्यायालय के समक्ष, याचिकाकर्ता श्री राजेश कुमार...', time: '3:42 pm', icon: SVG_ICONS.document, register: 'Civil Petition' },
      { text: 'Draft notes for tomorrow\'s hearing — need to check respondent address', time: '1:15 pm', icon: SVG_ICONS.draft, register: null },
      { text: 'ज्ञापन क्रमांक 42/2026, कार्यालय समय परिवर्तन...', time: '11:08 am', icon: SVG_ICONS.filed, register: 'Case Order' },
    ],
  },
  teacher: {
    label: 'Language Teacher',
    registers: [
      {
        name: 'Question Paper',
        category: 'register-academic',
        lang: 'Hindi',
        script: 'native',
        tone: 'formal',
        fields: ['Subject', 'Class', 'Date', 'Total Marks', 'Time Allowed', 'Instructions'],
        preview: 'विषय: ___ कक्षा: ___ पूर्णांक: ___ समय: ___',
      },
      {
        name: 'Lesson Plan',
        category: 'register-academic',
        lang: 'Hindi',
        script: 'native',
        tone: 'conversational',
        fields: ['Topic', 'Class', 'Duration', 'Learning Objectives', 'Activities'],
        preview: 'विषय: ___ कक्षा: ___ अवधि: ___ उद्देश्य: ___',
      },
    ],
    dictionary: [
      { word: 'पाठ्यक्रम', romanized: 'Pathyakram', meaning: 'Curriculum' },
      { word: 'परीक्षा', romanized: 'Pariksha', meaning: 'Examination' },
      { word: 'अभ्यास', romanized: 'Abhyas', meaning: 'Practice/Exercise' },
      { word: 'व्याकरण', romanized: 'Vyakaran', meaning: 'Grammar' },
      { word: 'उत्तर पुस्तिका', romanized: 'Uttar Pustika', meaning: 'Answer sheet' },
      { word: 'मूल्यांकन', romanized: 'Mulyankan', meaning: 'Evaluation' },
    ],
    shortcuts: [
      { trigger: 'paper header', expansion: 'विषय: ___\nकक्षा: ___\nपूर्णांक: ___\nसमय: ___\nनिर्देश: सभी प्रश्न अनिवार्य हैं।' },
      { trigger: 'lesson intro', expansion: 'आज के पाठ का विषय: ___\nकक्षा: ___\nउद्देश्य: ___' },
    ],
    confidenceDemo: `विषय: हिन्दी व्याकरण, कक्षा: <span class="confidence-word confidence-high">दसवीं<span class="confidence-tooltip">✓ verified</span></span>, परीक्षक: <span class="confidence-word confidence-medium">डॉ. अनीता शर्मा<span class="confidence-tooltip">⚠ review — 78% match</span></span>, विद्यालय: <span class="confidence-word confidence-low">केन्द्रीय विद्यालय संगठन<span class="confidence-tooltip">✕ uncertain — verify institution name</span></span>, दिनांक: आज।`,
    dictationPrompt: 'try: "विषय हिन्दी व्याकरण, कक्षा दसवीं, परीक्षक डॉ. अनीता शर्मा..."',
    recentTakes: [
      { text: 'विषय: हिन्दी व्याकरण, कक्षा दसवीं, पूर्णांक 80...', time: '4:10 pm', icon: SVG_ICONS.document, register: 'Question Paper' },
      { text: 'Draft lesson plan for tomorrow — need to add grammar exercises', time: '2:30 pm', icon: SVG_ICONS.draft, register: null },
      { text: 'कक्षा आठवीं, अभ्यास कार्य: निबंध लेखन...', time: '10:45 am', icon: SVG_ICONS.filed, register: 'Lesson Plan' },
    ],
  },
  government: {
    label: 'Government Office',
    registers: [
      {
        name: 'Government Memo',
        category: 'register-government',
        lang: 'Hindi',
        script: 'native',
        tone: 'formal',
        fields: ['Memo Number', 'Date', 'From', 'To', 'Subject', 'Body'],
        preview: 'ज्ञापन क्रमांक... दिनांक... प्रेषक... प्राप्तकर्ता...',
      },
    ],
    dictionary: [
      { word: 'ज्ञापन', romanized: 'Gyapan', meaning: 'Memorandum' },
      { word: 'अधिसूचना', romanized: 'Adhisuchana', meaning: 'Notification' },
      { word: 'कार्यालय', romanized: 'Karyalaya', meaning: 'Office' },
      { word: 'प्रशासन', romanized: 'Prashasan', meaning: 'Administration' },
    ],
    shortcuts: [
      { trigger: 'memo header', expansion: 'ज्ञापन क्रमांक: ___\nदिनांक: ___\nप्रेषक: ___\nप्राप्तकर्ता: ___\nविषय: ___' },
    ],
    confidenceDemo: `ज्ञापन क्रमांक 42/2026, दिनांक आज, प्रेषक: <span class="confidence-word confidence-high">जिलाधिकारी कार्यालय<span class="confidence-tooltip">✓ verified</span></span>, प्राप्तकर्ता: <span class="confidence-word confidence-medium">तहसीलदार, तहसील गडचिरोली<span class="confidence-tooltip">⚠ review — 85% match</span></span>, विषय: <span class="confidence-word confidence-low">कार्यालय समय परिवर्तन<span class="confidence-tooltip">✕ uncertain — verify subject</span></span>।`,
    dictationPrompt: 'try: "ज्ञापन क्रमांक 42/2026, दिनांक आज, प्रेषक जिलाधिकारी कार्यालय..."',
    recentTakes: [
      { text: 'ज्ञापन क्रमांक 42/2026, कार्यालय समय परिवर्तन...', time: '3:00 pm', icon: SVG_ICONS.document, register: 'Government Memo' },
      { text: 'Draft circular for office timing change', time: '1:45 pm', icon: SVG_ICONS.draft, register: null },
    ],
  },
  other: {
    label: 'Other',
    registers: [
      {
        name: 'General Correspondence',
        category: 'register-general',
        lang: 'Hindi',
        script: 'native',
        tone: 'conversational',
        fields: ['Date', 'To', 'From', 'Subject', 'Body'],
        preview: 'दिनांक... प्रति... प्रेषक... विषय...',
      },
    ],
    dictionary: [
      { word: 'पत्र', romanized: 'Patra', meaning: 'Letter' },
      { word: 'प्रेषक', romanized: 'Preshak', meaning: 'Sender' },
      { word: 'प्राप्तकर्ता', romanized: 'Praptakarta', meaning: 'Recipient' },
    ],
    shortcuts: [],
    confidenceDemo: `प्रति: <span class="confidence-word confidence-high">श्रीमान निदेशक<span class="confidence-tooltip">✓ verified</span></span>, विषय: <span class="confidence-word confidence-medium">कार्यालयीन पत्र<span class="confidence-tooltip">⚠ review</span></span>, दिनांक: आज। <span class="confidence-word confidence-low">नई दिल्ली<span class="confidence-tooltip">✕ uncertain — verify location</span></span>।`,
    dictationPrompt: 'try: "प्रति श्रीमान निदेशक, विषय कार्यालयीन पत्र..."',
    recentTakes: [
      { text: 'पत्र: प्रति श्रीमान निदेशक...', time: '2:00 pm', icon: SVG_ICONS.document, register: 'General Correspondence' },
    ],
  },
};

// ── Translations & i18n Dictionary ─────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    navRecord: 'record',
    navHistory: 'history',
    navWorkspace: 'your workspace',
    navRegisters: 'registers',
    navDictionary: 'dictionary',
    navShortcuts: 'shortcuts',
    navScratchpad: 'scratchpad',
    wpmStat: '⇡ 100+ wpm',
    activeRegisterLabel: 'active register',
    noRegister: 'no register',
    recentTakesLabel: 'recent takes',
    allTakesBtn: 'all takes →',
    dictationPlaceholder: 'start typing to simulate dictation, or press left ⌃ to talk...',
    dictateBtn: 'Dictate',
    stopBtn: 'Stop',
    sampleAudioBtn: '⚡ sample audio',
    pressKeyHint: 'press',
    orHoldMicHint: 'or click mic to talk',
    clearBtn: 'clear',
    copyBtn: 'copy',
    historyTitle: 'history',
    historySubtitle: "every dictation you've filed, searchable and reviewable.",
    searchPlaceholder: 'search takes...',
    registersTitle: 'registers',
    registersSubtitle: 'standard document formats for recurring institutional work.',
    newRegisterBtn: '+ new register',
    dictionaryTitle: 'dictionary',
    importBtn: '⊞ import',
    dictHeroTagline: 'words kivi never misspells.',
    dictHeroDesc: 'add the names, places, and terms that appear in your documents. Kivi learns them permanently.',
    youSayLabel: 'you say',
    kiviWritesLabel: 'kivi writes',
    addTermBtn: '⊕ add a term',
    shortcutsTitle: 'shortcuts',
    shortcutsSubtitle: 'phrases you repeat across documents — say a trigger, kivi expands it.',
    addShortcutBtn: '⊕ add a shortcut',
    scratchpadTitle: 'scratchpad',
    scratchpadSubtitle: 'draft space — compose before filing into a register.',
    scratchpadPlaceholder: 'start drafting here. you can send this to a register when ready.',
    sendToRegisterBtn: '→ send to register',
    transformLabel: 'transform',
    transformSubtitle: 'clean up your draft for filing.',
    formalizeBtn: 'formalize for filing',
    simplifyBtn: 'simplify language',
    translateBtn: 'translate to English',
    sendToRegisterModalTitle: 'send to register',
    selectRegisterPrompt: 'select which register to file this draft into.',
    settingsTitle: 'settings & sarvam ai',
    apiKeyLabel: 'Sarvam AI API Key',
    apiKeyHint: 'Official Sarvam AI Saaras Indic STT API',
    testConnectionBtn: 'test connection',
    modelLabel: 'Speech-to-Text Model',
    dictationLangLabel: 'Dictation Language',
    uiLangLabel: 'UI Language',
    uiLangSub: 'Toggle app interface language',
    themeLabel: 'Dark Mode',
    themeSub: 'Sleek obsidian theme',
    cancel: 'cancel',
    saveSettings: 'save settings',
    greetingMorning: 'good morning.',
    greetingAfternoon: 'good afternoon.',
    greetingEvening: 'good evening.',
    registersActive: 'registers active',
    noTakesYet: 'no dictations yet',
    noTakesDesc: 'every document you dictate appears here. start a dictation above to begin filing.',
    noHistoryDesc: 'dictations you file will appear here, searchable and grouped by date.'
  },
  mr: {
    navRecord: 'रेकॉर्ड',
    navHistory: 'इतिहास',
    navWorkspace: 'तुमचे कार्यक्षेत्र',
    navRegisters: 'रजिस्टर्स',
    navDictionary: 'शब्दकोश',
    navShortcuts: 'शॉर्टकट्स',
    navScratchpad: 'स्क्रॅचपॅड',
    wpmStat: '⇡ १००+ शब्द/मि',
    activeRegisterLabel: 'सक्रिय नोंदवही',
    noRegister: 'नोंदवही नाही',
    recentTakesLabel: 'नुकतीच डिक्टेशन्स',
    allTakesBtn: 'सर्व डिक्टेशन्स →',
    dictationPlaceholder: 'डिक्टेशनसाठी टाइप करा किंवा बोलण्यासाठी left ⌃ दाबा...',
    dictateBtn: 'डिक्टेट करा',
    stopBtn: 'थांबवा',
    sampleAudioBtn: '⚡ नमुना ऑडिओ',
    pressKeyHint: 'दाबा',
    orHoldMicHint: 'किंवा बोलण्यासाठी माईक दाबा',
    clearBtn: 'साफ करा',
    copyBtn: 'कॉपी करा',
    historyTitle: 'इतिहास',
    historySubtitle: 'दाखल केलेले प्रत्येक डिक्टेशन, शोधण्यायोग्य आणि पुनरावलोकन करण्यायोग्य.',
    searchPlaceholder: 'डिक्टेशन्स शोधा...',
    registersTitle: 'रजिस्टर्स',
    registersSubtitle: 'वारंवार होणाऱ्या संस्थात्मक कामांसाठी मानक दस्तऐवज स्वरूप.',
    newRegisterBtn: '+ नवीन नोंदवही',
    dictionaryTitle: 'शब्दकोश',
    importBtn: '⊞ आयात करा',
    dictHeroTagline: 'किवी कधीही न चुकवणारे शब्द.',
    dictHeroDesc: 'दस्तऐवजांमध्ये येणारी नावे, ठिकाणे आणि संज्ञा जोडा. किवी ते कायमस्वरूपी शिकते.',
    youSayLabel: 'तुम्ही बोलता',
    kiviWritesLabel: 'किवी लिहिते',
    addTermBtn: '⊕ शब्द जोडा',
    shortcutsTitle: 'शॉर्टकट्स',
    shortcutsSubtitle: 'वारंवार वापरले जाणारे वाक्यांश — ट्रिगर बोला, किवी त्याचा विस्तार करेल.',
    addShortcutBtn: '⊕ शॉर्टकट जोडा',
    scratchpadTitle: 'स्क्रॅचपॅड',
    scratchpadSubtitle: 'मसुदा जागा — नोंदवहीत दाखल करण्यापूर्वी मसुदा तयार करा.',
    scratchpadPlaceholder: 'येथे मसुदा तयार करण्यास प्रारंभ करा. तयार झाल्यावर नोंदवहीत पाठवा.',
    sendToRegisterBtn: '→ नोंदवहीत पाठवा',
    transformLabel: 'रूपांतरित करा',
    transformSubtitle: 'दाखल करण्यासाठी मसुदा परिष्कृत करा.',
    formalizeBtn: 'औपचारिक स्वरूप द्या',
    simplifyBtn: 'भाषा सुलभ करा',
    translateBtn: 'इंग्रजीत भाषांतर करा',
    sendToRegisterModalTitle: 'नोंदवहीत दाखल करा',
    selectRegisterPrompt: 'हा मसुदा कोणत्या नोंदवहीत दाखल करायचा ते निवडा.',
    settingsTitle: 'सेटिंग्ज आणि सर्वम एआय',
    apiKeyLabel: 'सर्वम एआय (Sarvam AI) एपीआय की',
    apiKeyHint: 'अधिकृत सर्वम एआय सारस (Saaras) इंडिक स्पीच एपीआय',
    testConnectionBtn: 'कनेक्शन तपासा',
    modelLabel: 'स्पीच-टू-टेक्स्ट मॉडेल',
    dictationLangLabel: 'डिक्टेशन भाषा',
    uiLangLabel: 'अॅपची भाषा (UI Language)',
    uiLangSub: 'इंटरफेसची भाषा टॉगल करा',
    themeLabel: 'डार्क मोड (Dark Mode)',
    themeSub: 'आकर्षक डार्क थीम',
    cancel: 'रद्द करा',
    saveSettings: 'सेटिंग्ज जतन करा',
    greetingMorning: 'शुभ सकाळ.',
    greetingAfternoon: 'शुभ दुपार.',
    greetingEvening: 'शुभ संध्याकाळ.',
    registersActive: 'नोंदवह्या सक्रिय',
    noTakesYet: 'अजून कोणतीही डिक्टेशन्स नाहीत',
    noTakesDesc: 'तुम्ही डिक्टेट केलेले प्रत्येक दस्तऐवज येथे दिसेल. सुरुवात करण्यासाठी वर डिक्टेशन द्या.',
    noHistoryDesc: 'तुम्ही दाखल केलेले डिक्टेशन्स येथे दिनांकानुसार दिसतील.'
  },
  hi: {
    navRecord: 'रिकॉर्ड',
    navHistory: 'इतिहास',
    navWorkspace: 'आपका कार्यक्षेत्र',
    navRegisters: 'रजिस्टर्स',
    navDictionary: 'शब्दकोश',
    navShortcuts: 'शॉर्टकट्स',
    navScratchpad: 'स्क्रैचपैड',
    wpmStat: '⇡ १००+ शब्द/मि',
    activeRegisterLabel: 'सक्रिय रजिस्टर',
    noRegister: 'कोई रजिस्टर नहीं',
    recentTakesLabel: 'हालिया डिक्टेशन्स',
    allTakesBtn: 'सभी डिक्टेशन्स →',
    dictationPlaceholder: 'डिक्टेशन के लिए टाइप करें या बोलने के लिए left ⌃ दबाएं...',
    dictateBtn: 'डिक्टेट करें',
    stopBtn: 'रोकें',
    sampleAudioBtn: '⚡ नमूना ऑडियो',
    pressKeyHint: 'दबाएं',
    orHoldMicHint: 'या बोलने के लिए माइक पर क्लिक करें',
    clearBtn: 'साफ करें',
    copyBtn: 'कॉपी करें',
    historyTitle: 'इतिहास',
    historySubtitle: 'दर्ज किया गया प्रत्येक डिक्टेशन, खोजने और समीक्षा करने योग्य।',
    searchPlaceholder: 'डिक्टेशन्स खोजें...',
    registersTitle: 'रजिस्टर्स',
    registersSubtitle: 'बार-बार होने वाले संस्थागत कार्यों के लिए मानक प्रारूप।',
    newRegisterBtn: '+ नया रजिस्टर',
    dictionaryTitle: 'शब्दकोश',
    importBtn: '⊞ आयात करें',
    dictHeroTagline: 'शब्द जिन्हें किवी कभी गलत नहीं लिखता।',
    dictHeroDesc: 'अपने दस्तावेज़ों में आने वाले नाम, स्थान और तकनीकी शब्द जोड़ें। किवी उन्हें स्थायी रूप से सीखता है।',
    youSayLabel: 'आप बोलते हैं',
    kiviWritesLabel: 'किवी लिखता है',
    addTermBtn: '⊕ शब्द जोड़ें',
    shortcutsTitle: 'शॉर्टकट्स',
    shortcutsSubtitle: 'बार-बार दोहराए जाने वाले वाक्यांश — ट्रिगर बोलें, किवी उसे विस्तार देगा।',
    addShortcutBtn: '⊕ शॉर्टकट जोड़ें',
    scratchpadTitle: 'स्क्रैचपैड',
    scratchpadSubtitle: 'ड्राफ्ट स्पेस — रजिस्टर में दर्ज करने से पहले ड्राफ्ट तैयार करें।',
    scratchpadPlaceholder: 'यहाँ ड्राफ्ट बनाना शुरू करें। तैयार होने पर इसे रजिस्टर में भेज सकते हैं।',
    sendToRegisterBtn: '→ रजिस्टर में भेजें',
    transformLabel: 'रूपांतरित करें',
    transformSubtitle: 'दर्ज करने के लिए अपने ड्राफ्ट को परिष्कृत करें।',
    formalizeBtn: 'औपचारिक रूप दें',
    simplifyBtn: 'भाषा सरल करें',
    translateBtn: 'अंग्रेजी में अनुवाद करें',
    sendToRegisterModalTitle: 'रजिस्टर में दर्ज करें',
    selectRegisterPrompt: 'चुनें कि इस ड्राफ्ट को किस रजिस्टर में दर्ज करना है।',
    settingsTitle: 'सेटिंग्स और सर्वम एआई',
    apiKeyLabel: 'सर्वम एआई (Sarvam AI) एपीआई कुंजी',
    apiKeyHint: 'आधिकारिक सर्वम एआई सारस (Saaras) इंडिक स्पीच एपीआई',
    testConnectionBtn: 'कनेक्शन जांचें',
    modelLabel: 'स्पीच-टू-टेक्स्ट मॉडल',
    dictationLangLabel: 'डिक्टेशन भाषा',
    uiLangLabel: 'ऐप की भाषा (UI Language)',
    uiLangSub: 'इंटरफ़ेस की भाषा टॉगल करें',
    themeLabel: 'डार्क मोड (Dark Mode)',
    themeSub: 'आकर्षक डार्क थीम',
    cancel: 'रद्द करें',
    saveSettings: 'सेटिंग्स सहेजें',
    greetingMorning: 'शुभ प्रभात।',
    greetingAfternoon: 'शुभ दोपहर।',
    greetingEvening: 'शुभ संध्या।',
    registersActive: 'रजिस्टर सक्रिय',
    noTakesYet: 'अभी कोई डिक्टेशन नहीं है',
    noTakesDesc: 'आपके द्वारा डिक्टेट किया गया प्रत्येक दस्तावेज़ यहाँ दिखाई देगा।',
    noHistoryDesc: 'आपके द्वारा दर्ज डिक्टेशन्स यहाँ दिनांक अनुसार दिखाई देंगे।'
  }
};

// ── Toast Notifications ───────────────────────────────────────────────────
const Toast = {
  show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `kivi-toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ── Theme Management (Dark/Light Mode) ────────────────────────────────────
const Theme = {
  current: 'light',

  init() {
    const saved = localStorage.getItem('kivi_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.set(saved, false);
  },

  set(theme, notify = true) {
    this.current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kivi_theme', theme);

    const icon = document.getElementById('theme-icon');
    if (icon) {
      if (theme === 'dark') {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
      } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      }
    }

    const settingsBtn = document.getElementById('settings-theme-btn');
    if (settingsBtn) {
      settingsBtn.textContent = theme === 'dark' ? 'Switch to Light' : 'Switch to Dark';
    }

    if (notify) {
      Toast.show(theme === 'dark' ? 'Dark Mode active' : 'Light Mode active', 'info', 1800);
    }
  },

  toggle() {
    this.set(this.current === 'dark' ? 'light' : 'dark', true);
  }
};

// ── Internationalization (i18n) ───────────────────────────────────────────
const I18n = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('kivi_ui_lang');
    const targetNative = this.getTargetNativeLang();
    if (saved && (saved === 'en' || saved === targetNative)) {
      this.currentLang = saved;
    } else {
      this.currentLang = 'en';
    }
    this.apply();
  },

  getTargetNativeLang() {
    const lang = State.language ? State.language.toLowerCase() : 'marathi';
    if (lang.includes('hindi') || lang === 'hi') return 'hi';
    return 'mr'; // Marathi by default
  },

  getNativeLabel(langCode) {
    if (langCode === 'hi') return 'हिन्दी';
    return 'मराठी';
  },

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    if (dict && dict[key]) return dict[key];
    return (TRANSLATIONS.en && TRANSLATIONS.en[key]) || key;
  },

  toggle() {
    const target = this.getTargetNativeLang();
    this.currentLang = (this.currentLang === 'en') ? target : 'en';
    localStorage.setItem('kivi_ui_lang', this.currentLang);
    this.apply();
    const langName = this.currentLang === 'en' ? 'English' : this.getNativeLabel(this.currentLang);
    Toast.show(`App UI translated to ${langName}`, 'info', 2000);
  },

  apply() {
    const isEn = this.currentLang === 'en';
    const targetNative = this.getTargetNativeLang();
    const nativeLabel = this.getNativeLabel(targetNative);

    // Update toggle button in sidebar
    const enOpt = document.getElementById('lang-opt-en');
    const nativeOpt = document.getElementById('lang-opt-native');
    if (enOpt && nativeOpt) {
      enOpt.classList.toggle('active', isEn);
      nativeOpt.classList.toggle('active', !isEn);
      nativeOpt.textContent = nativeLabel;
    }

    // Update settings modal button
    const settingsUiBtn = document.getElementById('settings-ui-lang-btn');
    if (settingsUiBtn) {
      settingsUiBtn.textContent = isEn ? `Switch to ${nativeLabel}` : 'Switch to English';
    }

    // Update all static elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) el.textContent = val;
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val) el.setAttribute('placeholder', val);
    });

    // Refresh dynamic labels if App is active
    if (window.App && App.updateGreeting) {
      App.updateGreeting();
      App.renderHomeRegisterChips();
      App.renderRecentTakes();
    }
  }
};

// ── Settings & Sarvam AI Configuration ─────────────────────────────────────
const Settings = {
  apiKey: 'sk_lujlg4xg_mlgJeRRVyBpZtNcS9dmy8srf',
  model: 'saaras:v4',
  languageCode: 'mr-IN',

  init() {
    const savedKey = localStorage.getItem('kivi_sarvam_api_key');
    if (savedKey) this.apiKey = savedKey;

    const savedModel = localStorage.getItem('kivi_sarvam_model');
    if (savedModel) this.model = savedModel;

    const savedLang = localStorage.getItem('kivi_dictation_lang');
    if (savedLang) {
      this.languageCode = savedLang;
    } else {
      this.syncFromStateLanguage();
    }
    this.updateUI();
  },

  syncFromStateLanguage() {
    const lang = State.language ? State.language.toLowerCase() : 'marathi';
    if (lang.includes('marathi') || lang === 'mr') this.languageCode = 'mr-IN';
    else if (lang.includes('hindi') || lang === 'hi') this.languageCode = 'hi-IN';
    else if (lang.includes('gujarati') || lang === 'gu') this.languageCode = 'gu-IN';
    else if (lang.includes('tamil') || lang === 'ta') this.languageCode = 'ta-IN';
    else if (lang.includes('telugu') || lang === 'te') this.languageCode = 'te-IN';
    else if (lang.includes('kannada') || lang === 'kn') this.languageCode = 'kn-IN';
    else if (lang.includes('bengali') || lang === 'bn') this.languageCode = 'bn-IN';
    else if (lang.includes('malayalam') || lang === 'ml') this.languageCode = 'ml-IN';
    else this.languageCode = 'mr-IN';
    localStorage.setItem('kivi_dictation_lang', this.languageCode);
  },

  getLanguageCode() {
    return this.languageCode;
  },

  updateUI() {
    const keyInput = document.getElementById('setting-api-key');
    if (keyInput) keyInput.value = this.apiKey;

    const modelSelect = document.getElementById('setting-model');
    if (modelSelect) modelSelect.value = this.model;

    const langSelect = document.getElementById('setting-lang');
    if (langSelect) langSelect.value = this.languageCode;

    const badge = document.getElementById('dictation-lang-badge');
    if (badge) {
      const langNames = {
        'mr-IN': 'mr-IN (मराठी)',
        'hi-IN': 'hi-IN (हिन्दी)',
        'gu-IN': 'gu-IN (ગુજરાતી)',
        'ta-IN': 'ta-IN (தமிழ்)',
        'te-IN': 'te-IN (తెలుగు)',
        'kn-IN': 'kn-IN (ಕನ್ನಡ)',
        'bn-IN': 'bn-IN (বাংলা)',
        'ml-IN': 'ml-IN (മലയാളം)',
        'en-IN': 'en-IN (English)'
      };
      badge.textContent = langNames[this.languageCode] || this.languageCode;
    }

    const engineLabel = document.getElementById('dictation-engine-label');
    if (engineLabel) {
      engineLabel.textContent = `Sarvam AI ${this.model}`;
    }
  },

  toggleKeyVisibility() {
    const input = document.getElementById('setting-api-key');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  },

  onLanguageChange(val) {
    this.languageCode = val;
    localStorage.setItem('kivi_dictation_lang', val);
    this.updateUI();
  },

  saveForm(e) {
    e.preventDefault();
    const key = document.getElementById('setting-api-key').value.trim();
    const model = document.getElementById('setting-model').value;
    const lang = document.getElementById('setting-lang').value;

    if (key) {
      this.apiKey = key;
      localStorage.setItem('kivi_sarvam_api_key', key);
    }
    this.model = model;
    localStorage.setItem('kivi_sarvam_model', model);

    this.languageCode = lang;
    localStorage.setItem('kivi_dictation_lang', lang);

    this.updateUI();
    App.closeModals();
    Toast.show('Settings saved successfully', 'success', 2500);
  },

  syncUI() {
    this.updateUI();
  }
};

// ── In-Memory 16kHz PCM WAV Audio Encoder ───────────────────────────────────
function downsampleAndEncodeWAV(buffer, fromSampleRate, toSampleRate = 16000) {
  let samples;
  if (fromSampleRate === toSampleRate) {
    samples = buffer;
  } else {
    const ratio = fromSampleRate / toSampleRate;
    const newLength = Math.round(buffer.length / ratio);
    samples = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < samples.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
      let accum = 0, count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      samples[offsetResult] = count > 0 ? accum / count : 0;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
  }

  const wavBuffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(wavBuffer);

  function writeString(v, offset, str) {
    for (let i = 0; i < str.length; i++) {
      v.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono (1 channel)
  view.setUint32(24, toSampleRate, true);
  view.setUint32(28, toSampleRate * 2, true); // 16-bit mono = 2 bytes/sample
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

// ── Real Speech-to-Text with Sarvam AI API ─────────────────────────────────
const Dictation = {
  isRecording: false,
  activeTarget: 'main', // 'main' or 'scratchpad'
  mediaStream: null,
  audioContext: null,
  processorNode: null,
  audioChunks: [],
  recordingStartTime: 0,
  timerInterval: null,

  async toggleRecording(target = 'main') {
    if (this.isRecording) {
      await this.stopRecording();
    } else {
      await this.startRecording(target);
    }
  },

  async startRecording(target = 'main') {
    this.activeTarget = target;
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);

      this.audioChunks = [];
      const bufferSize = 4096;
      this.processorNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
      this.processorNode.onaudioprocess = (e) => {
        if (!this.isRecording) return;
        const inputData = e.inputBuffer.getChannelData(0);
        this.audioChunks.push(new Float32Array(inputData));
      };

      source.connect(this.processorNode);
      this.processorNode.connect(this.audioContext.destination);

      this.isRecording = true;
      this.recordingStartTime = Date.now();
      this.updateUIState('recording');
      Toast.show('🎙️ Recording... Speak clearly in your Indic language', 'info', 1800);

      this.timerInterval = setInterval(() => {
        const secs = Math.floor((Date.now() - this.recordingStartTime) / 1000);
        const mins = Math.floor(secs / 60).toString().padStart(2, '0');
        const remSecs = (secs % 60).toString().padStart(2, '0');
        if (this.activeTarget === 'onboard') {
          const hint = document.getElementById('onboard-dictation-hint');
          if (hint) {
            hint.innerHTML = `<span style="color:#DC2626; font-weight:700;">● ${mins}:${remSecs}</span> Recording with Sarvam AI... Click mic or press ⌃ to stop`;
          }
        } else if (this.activeTarget === 'talkkey_demo') {
          const inst = document.getElementById('talk-key-instruction');
          if (inst) {
            inst.innerHTML = `<span style="color:#DC2626; font-weight:700;">● ${mins}:${remSecs}</span> Listening with Sarvam AI... release key or click to finish`;
          }
        } else {
          const hint = document.getElementById('main-dictation-hint');
          if (hint) {
            hint.innerHTML = `<span style="color:#DC2626; font-weight:700;">● ${mins}:${remSecs}</span> Recording... Click mic or press ⌃ to transcribe`;
          }
        }
      }, 500);

    } catch (err) {
      console.warn('Microphone permission or hardware issue, falling back to Web Speech:', err);
      this.startWebSpeechFallback(target);
    }
  },

  async stopRecording() {
    if (!this.isRecording) return;
    this.isRecording = false;
    clearInterval(this.timerInterval);

    this.updateUIState('processing');

    if (this.processorNode) {
      this.processorNode.disconnect();
      this.processorNode = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }

    const sampleRate = this.audioContext ? this.audioContext.sampleRate : 44100;
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    let totalLength = 0;
    for (let i = 0; i < this.audioChunks.length; i++) {
      totalLength += this.audioChunks[i].length;
    }
    const merged = new Float32Array(totalLength);
    let offset = 0;
    for (let i = 0; i < this.audioChunks.length; i++) {
      merged.set(this.audioChunks[i], offset);
      offset += this.audioChunks[i].length;
    }

    if (totalLength < 1600) {
      this.updateUIState('idle');
      Toast.show('Dictation was too short', 'info', 2000);
      return;
    }

    const wavBlob = downsampleAndEncodeWAV(merged, sampleRate, 16000);
    await this.transcribeWithSarvam(wavBlob, this.activeTarget);
  },

  async transcribeWithSarvam(wavBlob, target) {
    try {
      const formData = new FormData();
      formData.append('file', wavBlob, 'dictation.wav');
      formData.append('model', Settings.model);
      formData.append('language_code', Settings.getLanguageCode());
      formData.append('mode', 'transcribe');

      const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': Settings.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      const transcript = (result && result.transcript) ? result.transcript.trim() : '';

      if (transcript) {
        this.handleTranscript(transcript, target);
        Toast.show('✓ Transcribed with Sarvam AI Saaras', 'success', 2500);
      } else {
        Toast.show('No speech recognized. Try speaking clearly into the mic.', 'info', 3000);
      }
    } catch (err) {
      console.error('Sarvam AI transcription error:', err);
      Toast.show(`Sarvam API: ${err.message}. Trying browser speech fallback...`, 'error', 3500);
      this.startWebSpeechFallback(target);
    } finally {
      this.updateUIState('idle');
    }
  },

  startWebSpeechFallback(target) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      Toast.show('Microphone/Web Speech not accessible. Click "sample audio" to test dictation features.', 'error', 4000);
      this.updateUIState('idle');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = Settings.getLanguageCode();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.updateUIState('recording');
    Toast.show(`Listening via browser recognition (${recognition.lang})...`, 'info', 2500);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (transcript) {
        this.handleTranscript(transcript, target);
        Toast.show('✓ Transcribed via browser Web Speech', 'success', 2500);
      }
      this.updateUIState('idle');
    };

    recognition.onerror = (e) => {
      console.warn('Web Speech error:', e);
      Toast.show(`Speech error: ${e.error || 'mic unavailable'}`, 'error', 3000);
      this.updateUIState('idle');
    };

    recognition.onend = () => {
      this.updateUIState('idle');
    };

    recognition.start();
  },

  handleTranscript(text, target) {
    if (target === 'scratchpad') {
      const el = document.getElementById('scratchpad-input');
      if (el) {
        el.value = el.value ? `${el.value}\n${text}` : text;
        App.onScratchpadInput(el.value);
      }
    } else if (target === 'onboard') {
      const el = document.getElementById('onboard-dictation-input');
      if (el) {
        el.value = el.value ? `${el.value} ${text}` : text;
        Onboarding.onDictation(el.value);
      }
    } else if (target === 'talkkey_demo') {
      const preview = document.getElementById('talkkey-transcript-preview');
      const inst = document.getElementById('talk-key-instruction');
      if (preview) {
        preview.style.display = 'block';
        preview.innerHTML = `
          <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted); margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--color-accent-gold);"></span>
            Transcribed with Sarvam AI Saaras (${Settings.getLanguageCode()})
          </div>
          <div style="font-weight:600; color:var(--color-text-primary); line-height:1.5;">${text}</div>
        `;
      }
      if (inst) {
        inst.innerHTML = `<span style="color:#059669; font-weight:600;">✓ Dictation recognized!</span> Press Left Ctrl or click again to speak more`;
      }
    } else {
      const el = document.getElementById('main-dictation-input');
      if (el) {
        el.value = el.value ? `${el.value} ${text}` : text;
        App.onMainDictation(el.value);
      }
    }

    // Only update workspace takes and stats if in workspace mode
    if (target === 'main' || target === 'scratchpad') {
      if (State.activeRegister) {
        const reg = State.registers.find(r => r.id === State.activeRegister);
        if (reg) reg.uses = (reg.uses || 0) + 1;
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const regName = State.activeRegister
        ? (State.registers.find(r => r.id === State.activeRegister)?.name || null)
        : null;

      State.takes.unshift({
        text,
        time: timeStr,
        icon: SVG_ICONS.document,
        register: regName,
        created: now.toISOString()
      });
      State.save();

      App.renderRecentTakes();
      App.renderHistory();
      App.updateGreeting();
    }
  },

  simulateSample(target = 'main') {
    let sample = '';
    const isHindi = (State.language === 'hindi' || Settings.languageCode.startsWith('hi'));
    if (target === 'onboard') {
      if (State.profession === 'teacher') {
        sample = isHindi
          ? 'वार्षिक परीक्षा २०२६, कक्षा १०, विषय हिंदी, पूर्णांक १००, समय ३ घंटे, सर्व प्रश्न अनिवार्य हैं।'
          : 'वार्षिक परीक्षा २०२६, इयत्ता १०वी, विषय मराठी, एकूण गुण १००, वेळ ३ तास, सर्व प्रश्न अनिवार्य आहेत.';
      } else {
        sample = isHindi
          ? 'माननीय न्यायालय के समक्ष, प्रकरण क्रमांक ४२/२०२६, दिनांक आज, प्रार्थी बनाम प्रतिवादी, शपथ पत्र संलग्न है।'
          : 'माननीय जिल्हा न्यायालय गडचिरोली, दिवाणी याचिका क्र. ४२/२०२६, दिनांक आज, अर्जदार विरुद्ध गैरअर्जदार, सुनावणी सुरू आहे.';
      }
    } else if (target === 'talkkey_demo') {
      sample = isHindi
        ? 'सर्वम एआय द्वारे त्वरित ध्वनी ओळख आणि अचूक टायपिंग — जिल्हा न्यायालय गडचिरोली.'
        : 'सर्वम एआय द्वारे त्वरित ध्वनी ओळख आणि अचूक टायपिंग — जिल्हा न्यायालय गडचिरोली.';
    } else {
      if (isHindi) {
        sample = 'माननीय न्यायालय के समक्ष, प्रकरण क्रमांक 42/2026, दिनांक आज, प्रार्थी बनाम प्रतिवादी, शपथ पत्र संलग्न है।';
      } else {
        sample = 'माननीय जिल्हा न्यायालय गडचिरोली, दिवाणी याचिका क्र. ४२/२०२६, दिनांक आज, अर्जदार विरुद्ध गैरअर्जदार, सुनावणी सुरू आहे.';
      }
    }
    this.handleTranscript(sample, target);
    Toast.show('⚡ Transcribed authentic Indic dictation sample', 'success', 2500);
  },

  async testConnection() {
    const btn = document.getElementById('test-connection-btn');
    const badge = document.getElementById('api-key-status');
    if (btn) btn.textContent = 'testing...';

    try {
      const testBuffer = new Float32Array(1600); // 0.1s silence
      const wav = downsampleAndEncodeWAV(testBuffer, 16000, 16000);
      const formData = new FormData();
      formData.append('file', wav, 'test.wav');
      formData.append('model', Settings.model);
      formData.append('language_code', Settings.getLanguageCode());
      formData.append('mode', 'transcribe');

      const res = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': Settings.apiKey,
        },
        body: formData,
      });

      if (res.ok) {
        if (badge) {
          badge.className = 'api-status-badge connected';
          badge.textContent = '✓ verified';
        }
        Toast.show('✓ Successfully connected to Sarvam AI API!', 'success', 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error?.message || `Status ${res.status}`);
      }
    } catch (err) {
      if (badge) {
        badge.className = 'api-status-badge unverified';
        badge.textContent = 'error';
      }
      Toast.show(`Connection test failed: ${err.message}`, 'error', 4000);
    } finally {
      if (btn) btn.textContent = 'test connection';
    }
  },

  updateUIState(state) {
    const micBtn = document.getElementById('main-mic-btn');
    const micLabel = document.getElementById('main-mic-label');
    const waves = document.getElementById('main-mic-waves');
    const liveDot = document.getElementById('dictation-live-dot');
    const dictArea = document.getElementById('main-dictation-area');

    // Onboarding Step 4 elements
    const onboardMicBtn = document.getElementById('onboard-mic-btn');
    const onboardMicLabel = document.getElementById('onboard-mic-label');
    const onboardWaves = document.getElementById('onboard-mic-waves');
    const onboardLiveDot = document.getElementById('onboard-live-dot');
    const onboardDictArea = document.getElementById('onboard-dictation-area');
    const onboardHint = document.getElementById('onboard-dictation-hint');

    // Onboarding Step 6 elements
    const talkKeyBtn = document.getElementById('onboard-talkkey-btn');
    const talkKeyVisual = document.getElementById('talk-key-visual');
    const talkKeyInstruction = document.getElementById('talk-key-instruction');

    if (state === 'recording') {
      if (this.activeTarget === 'onboard') {
        if (onboardMicBtn) onboardMicBtn.classList.add('recording');
        if (onboardMicLabel) onboardMicLabel.textContent = 'Stop';
        if (onboardWaves) onboardWaves.style.display = 'inline-flex';
        if (onboardLiveDot) onboardLiveDot.className = 'live-dot recording';
        if (onboardDictArea) onboardDictArea.classList.add('recording');
      } else if (this.activeTarget === 'talkkey_demo') {
        if (talkKeyBtn) talkKeyBtn.classList.add('recording');
        if (talkKeyVisual) talkKeyVisual.classList.add('recording');
        if (talkKeyInstruction) {
          talkKeyInstruction.innerHTML = `<span style="color:#DC2626; font-weight:700;">● Listening with Sarvam AI...</span> speak now (click or release to finish)`;
        }
      } else {
        if (micBtn) micBtn.classList.add('recording');
        if (micLabel) micLabel.textContent = I18n.t('stopBtn');
        if (waves) waves.style.display = 'inline-flex';
        if (liveDot) liveDot.className = 'live-dot recording';
        if (dictArea) dictArea.classList.add('recording');
      }
    } else if (state === 'processing') {
      if (this.activeTarget === 'onboard') {
        if (onboardMicBtn) {
          onboardMicBtn.classList.remove('recording');
          onboardMicBtn.classList.add('processing');
        }
        if (onboardMicLabel) onboardMicLabel.textContent = 'Transcribing...';
        if (onboardWaves) onboardWaves.style.display = 'none';
        if (onboardLiveDot) onboardLiveDot.className = 'live-dot transcribing';
        if (onboardDictArea) onboardDictArea.classList.remove('recording');
        if (onboardHint) onboardHint.textContent = 'Sarvam AI Saaras is transcribing your audio...';
      } else if (this.activeTarget === 'talkkey_demo') {
        if (talkKeyBtn) {
          talkKeyBtn.classList.remove('recording');
          talkKeyBtn.classList.add('processing');
        }
        if (talkKeyVisual) talkKeyVisual.classList.remove('recording');
        if (talkKeyInstruction) {
          talkKeyInstruction.innerHTML = `<span style="color:var(--color-accent-gold); font-weight:700;">⟳ Transcribing audio with Sarvam AI Saaras...</span>`;
        }
      } else {
        if (micBtn) {
          micBtn.classList.remove('recording');
          micBtn.classList.add('processing');
        }
        if (micLabel) micLabel.textContent = 'Transcribing...';
        if (waves) waves.style.display = 'none';
        if (liveDot) liveDot.className = 'live-dot transcribing';
        if (dictArea) dictArea.classList.remove('recording');
      }
    } else {
      // idle
      if (micBtn) micBtn.classList.remove('recording', 'processing');
      if (micLabel) micLabel.textContent = I18n.t('dictateBtn');
      if (waves) waves.style.display = 'none';
      if (liveDot) liveDot.className = 'live-dot';
      if (dictArea) dictArea.classList.remove('recording');
      const hint = document.getElementById('main-dictation-hint');
      if (hint) {
        hint.innerHTML = `<span data-i18n="pressKeyHint">${I18n.t('pressKeyHint')}</span> <kbd>Left Ctrl</kbd> <span data-i18n="orHoldMicHint">${I18n.t('orHoldMicHint')}</span>`;
      }

      if (onboardMicBtn) onboardMicBtn.classList.remove('recording', 'processing');
      if (onboardMicLabel) onboardMicLabel.textContent = 'Dictate';
      if (onboardWaves) onboardWaves.style.display = 'none';
      if (onboardLiveDot) onboardLiveDot.className = 'live-dot';
      if (onboardDictArea) onboardDictArea.classList.remove('recording');
      if (onboardHint) {
        onboardHint.innerHTML = `press <kbd>Left Ctrl</kbd> or click mic to talk`;
      }

      if (talkKeyBtn) talkKeyBtn.classList.remove('recording', 'processing');
      if (talkKeyVisual) talkKeyVisual.classList.remove('recording');
      if (talkKeyInstruction && !talkKeyInstruction.innerHTML.includes('✓')) {
        talkKeyInstruction.innerHTML = `press <kbd>Left Ctrl</kbd> or click the mic to talk`;
      }
    }
  }
};

// ── State Management ──────────────────────────────────────────────────────
const State = {
  onboardingDone: false,
  language: null,
  profession: null,
  registers: [],
  dictionary: [],
  shortcuts: [],
  activeRegister: null,
  scratchpad: '',
  takes: [],

  save() {
    localStorage.setItem('kivi-state', JSON.stringify({
      onboardingDone: this.onboardingDone,
      language: this.language,
      profession: this.profession,
      registers: this.registers,
      dictionary: this.dictionary,
      shortcuts: this.shortcuts,
      activeRegister: this.activeRegister,
      scratchpad: this.scratchpad,
      takes: this.takes,
    }));
  },

  load() {
    const saved = localStorage.getItem('kivi-state');
    if (saved) {
      const data = JSON.parse(saved);
      Object.assign(this, data);
      return true;
    }
    return false;
  },
};

// ── Onboarding ────────────────────────────────────────────────────────────
const Onboarding = {
  currentStep: 0,
  totalSteps: 8,

  init() {
    if (State.load() && State.onboardingDone) {
      document.getElementById('onboarding').classList.add('hidden');
      document.getElementById('app-shell').style.display = 'flex';
      App.init();
      return;
    }
    this.showStep(0);
  },

  showStep(index) {
    this.currentStep = index;
    document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
    const steps = document.querySelectorAll('.onboarding-step');
    if (steps[index]) {
      steps[index].classList.add('active');
    }
    // Progress bar
    const pct = index === 0 ? 0 : Math.round((index / (this.totalSteps - 1)) * 100);
    document.getElementById('onboarding-progress').style.width = pct + '%';

    // Step-specific setup
    if (index === 3) this.populatePayoff();
    if (index === 4) this.setupDictation();
    if (index === 5) this.setupConfidence();
  },

  next() {
    if (this.currentStep < this.totalSteps - 1) {
      this.showStep(this.currentStep + 1);
    }
  },

  prev() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  },

  skip() {
    State.profession = State.profession || 'court';
    State.language = State.language || 'marathi';
    this.initProfessionData();
    this.complete();
  },

  selectLanguage(el) {
    document.querySelectorAll('.language-chip').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    State.language = el.dataset.lang;
    Settings.syncFromStateLanguage();
    document.getElementById('lang-next-btn').disabled = false;
  },

  selectProfession(el) {
    // Clear both primary cards and secondary chips
    document.querySelectorAll('.profession-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.profession-chip').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    State.profession = el.dataset.profession;
    document.getElementById('prof-next-btn').disabled = false;
  },

  initProfessionData() {
    const data = PROFESSION_DATA[State.profession] || PROFESSION_DATA.court;
    State.registers = data.registers.map((r, i) => ({
      id: 'reg-' + Date.now() + '-' + i,
      ...r,
      uses: 0,
      created: new Date().toISOString(),
    }));
    State.dictionary = [...data.dictionary];
    State.shortcuts = [...data.shortcuts];
    State.takes = [...data.recentTakes];
  },

  populatePayoff() {
    if (!State.profession) return;
    this.initProfessionData();
    const data = PROFESSION_DATA[State.profession] || PROFESSION_DATA.court;
    const container = document.getElementById('payoff-content');

    let html = '';
    data.registers.forEach(r => {
      html += `
        <div class="payoff-card">
          <div class="payoff-card-label badge badge-accent">register</div>
          <div class="payoff-card-name">${r.name} (${r.lang})</div>
          <div class="payoff-card-snippet">${r.preview}</div>
        </div>
      `;
    });
    html += `
      <div class="payoff-card">
        <div class="payoff-card-label badge badge-muted">dictionary</div>
        <div class="payoff-card-name">${data.dictionary.length} starter terms loaded</div>
        <div class="payoff-card-snippet">${data.dictionary.map(d => d.word).join(', ')}...</div>
      </div>
    `;
    // Accuracy claim card
    html += `
      <div class="payoff-card">
        <div class="payoff-card-label badge badge-success">accuracy</div>
        <div class="payoff-card-name">outperforms Gemini & GPT-4o on Indic transcription</div>
        <div class="payoff-card-snippet">names, legal terms, and technical vocabulary — verified against leading general-purpose models on every supported Indian language.</div>
      </div>
    `;
    container.innerHTML = html;
  },

  setupDictation() {
    const data = PROFESSION_DATA[State.profession] || PROFESSION_DATA.court;
    document.getElementById('dictation-prompt').textContent = data.dictationPrompt;
    
    // Update language badge with active language code
    const langBadge = document.getElementById('onboard-lang-badge');
    if (langBadge) {
      const code = Settings.getLanguageCode();
      const isHindi = (State.language === 'hindi' || code.startsWith('hi'));
      langBadge.textContent = `${code} (${isHindi ? 'हिंदी' : 'मराठी'})`;
    }

    // Pre-fill template preview
    const register = data.registers[0];
    if (register) {
      let templateHtml = '';
      register.fields.forEach(f => {
        templateHtml += `
          <div class="template-field">
            <span class="template-field-label">${f}</span>
            <span class="template-field-value" data-field="${f}">___</span>
          </div>
        `;
      });
      document.getElementById('onboard-template-preview').innerHTML = templateHtml;
    }
  },

  onDictation(value) {
    if (!value.trim()) return;
    const fields = document.querySelectorAll('#onboard-template-preview .template-field-value');
    const words = value.split(/[,，\s]+/).filter(w => w.length > 0);
    fields.forEach((field, i) => {
      if (words[i]) {
        field.textContent = words[i];
        field.classList.add('filled');
      } else {
        field.textContent = '___';
        field.classList.remove('filled');
      }
    });
  },

  setupConfidence() {
    const data = PROFESSION_DATA[State.profession] || PROFESSION_DATA.court;
    document.getElementById('confidence-output').innerHTML = data.confidenceDemo;
  },

  complete() {
    State.onboardingDone = true;
    State.save();
    document.getElementById('onboarding').classList.add('hidden');
    document.getElementById('app-shell').style.display = 'flex';
    Settings.syncFromStateLanguage();
    I18n.init();
    App.init();
  },
};

// ── App (Main Application) ────────────────────────────────────────────────
const App = {
  currentScreen: 'record',

  init() {
    Theme.init();
    Settings.init();
    I18n.init();

    this.updateGreeting();
    this.renderHomeRegisterChips();
    this.renderRecentTakes();
    this.renderRegisters();
    this.renderDictionary();
    this.renderShortcuts();
    this.updateSidebar();

    // Restore scratchpad
    if (State.scratchpad) {
      const el = document.getElementById('scratchpad-input');
      if (el) {
        el.value = State.scratchpad;
        this.onScratchpadInput(State.scratchpad);
      }
    }
  },

  navigate(screen) {
    this.currentScreen = screen;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.sidebar-link[data-screen="${screen}"]`);
    if (link) link.classList.add('active');

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screen}`);
    if (target) target.classList.add('active');

    if (screen === 'registers') {
      document.getElementById('register-detail').style.display = 'none';
      document.getElementById('registers-list').style.display = 'block';
    }
  },

  updateGreeting() {
    const hour = new Date().getHours();
    let greetingKey;
    if (hour < 12) greetingKey = 'greetingMorning';
    else if (hour < 17) greetingKey = 'greetingAfternoon';
    else greetingKey = 'greetingEvening';

    const greetingEl = document.getElementById('home-greeting');
    if (greetingEl) {
      greetingEl.textContent = I18n.t(greetingKey);
    }

    const countEl = document.getElementById('home-register-count');
    if (countEl) {
      countEl.textContent = `${State.registers.length} ${I18n.t('registersActive')}`;
    }
  },

  updateSidebar() {
    const data = PROFESSION_DATA[State.profession] || PROFESSION_DATA.court;
    const roleEl = document.getElementById('sidebar-role');
    if (roleEl) roleEl.textContent = data.label;
  },

  // ── Home Screen ────────────────────────────────────────────
  renderHomeRegisterChips() {
    const container = document.getElementById('register-chips');
    if (!container) return;

    let html = `<button class="register-quick-chip ${!State.activeRegister ? 'active' : ''}"
      onclick="App.setActiveRegister(null)">${I18n.t('noRegister')}</button>`;

    State.registers.forEach(r => {
      const color = r.category === 'register-legal' ? 'var(--color-accent)'
        : r.category === 'register-academic' ? '#1E4D3A'
        : r.category === 'register-government' ? 'var(--color-text-muted)'
        : 'var(--color-border)';

      html += `<button class="register-quick-chip ${State.activeRegister === r.id ? 'active' : ''}"
        onclick="App.setActiveRegister('${r.id}')">
        <span class="dot" style="background: ${color}"></span> ${r.name}
      </button>`;
    });
    container.innerHTML = html;
  },

  setActiveRegister(id) {
    State.activeRegister = id;
    State.save();
    this.renderHomeRegisterChips();
  },

  onMainDictation(value) {
    if (value.length > 20 && !this._dictationSaved) {
      this._dictationSaved = true;
      setTimeout(() => { this._dictationSaved = false; }, 5000);
    }
  },

  clearMainDictation() {
    const input = document.getElementById('main-dictation-input');
    if (input) {
      input.value = '';
      Toast.show('Cleared dictation input', 'info', 1500);
    }
  },

  async copyMainDictation() {
    const input = document.getElementById('main-dictation-input');
    if (input && input.value) {
      await navigator.clipboard.writeText(input.value);
      Toast.show('Copied to clipboard!', 'success', 2000);
    } else {
      Toast.show('Nothing to copy', 'info', 1500);
    }
  },

  clearScratchpad() {
    const input = document.getElementById('scratchpad-input');
    if (input) {
      input.value = '';
      State.scratchpad = '';
      State.save();
      this.onScratchpadInput('');
      Toast.show('Cleared scratchpad', 'info', 1500);
    }
  },

  transformDraft(type) {
    const input = document.getElementById('scratchpad-input');
    if (!input || !input.value.trim()) {
      Toast.show('Draft is empty — write or dictate something first', 'info', 2000);
      return;
    }
    const val = input.value.trim();
    if (type === 'formalize') {
      input.value = `माननीय सक्षम प्राधिकाऱ्यांच्या अवलोकनास्तव:\n${val}\n\nसदर मसुदा तात्काळ मंजुरीसाठी सादर केला जात आहे.`;
      Toast.show('✓ Formalized draft for institutional filing', 'success', 2200);
    } else if (type === 'simplify') {
      input.value = val.replace(/प्रकरण क्रमांक/g, 'केस नं.').replace(/याचिकाकर्ता/g, 'अर्जदार');
      Toast.show('✓ Simplified draft language', 'success', 2000);
    } else if (type === 'translate') {
      input.value = `[Official Translation / इंग्रजी भाषांतर]\n${val}\n\nSubmitted for official records.`;
      Toast.show('✓ Formatted for bilingual record', 'success', 2000);
    }
    this.onScratchpadInput(input.value);
  },

  renderRecentTakes() {
    const container = document.getElementById('recent-takes-list');
    if (!container) return;

    if (State.takes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">${I18n.t('noTakesYet')}</div>
          <div class="empty-state-text">${I18n.t('noTakesDesc')}</div>
        </div>
      `;
      return;
    }

    let html = '';
    State.takes.slice(0, 5).forEach(take => {
      const iconSvg = take.icon || SVG_ICONS.document;
      html += `
        <div class="history-item">
          <div class="history-item-icon">${iconSvg}</div>
          <div class="history-item-text">${take.text}</div>
          <div class="history-item-time">${take.time}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  // ── History Screen ─────────────────────────────────────────
  renderHistory() {
    const container = document.getElementById('history-content');
    if (!container) return;

    if (State.takes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">${I18n.t('noTakesYet')}</div>
          <div class="empty-state-text">${I18n.t('noHistoryDesc')}</div>
        </div>
      `;
      return;
    }

    let html = `
      <div class="history-date">
        <span class="history-date-label">today</span>
        <span class="history-date-line"></span>
        <span class="history-date-count">${State.takes.length} takes</span>
      </div>
    `;
    State.takes.forEach(take => {
      html += `
        <div class="history-item">
          <div class="history-item-icon">${take.icon}</div>
          <div class="history-item-text">${take.text}</div>
          <div class="history-item-time">${take.time}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  // ── Registers Screen ───────────────────────────────────────
  renderRegisters() {
    const container = document.getElementById('registers-list');
    if (!container) return;

    if (State.registers.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">no registers configured</div>
          <div class="empty-state-text">registers are document templates for your recurring institutional work — case types, question papers, memos. create one to start.</div>
        </div>
      `;
      return;
    }

    let html = '';
    State.registers.forEach(reg => {
      html += `
        <div class="register-card ${reg.category}" onclick="App.showRegisterDetail('${reg.id}')">
          <div class="register-card-header">
            <div class="register-card-title">${reg.name}</div>
          </div>
          <div class="register-card-meta">
            <span class="badge badge-accent">${reg.lang}</span>
            <span class="badge badge-muted">${reg.script}</span>
            <span class="badge badge-muted">${reg.tone}</span>
          </div>
          <div class="register-card-preview">${reg.preview}</div>
          <div class="register-card-footer">
            <span>${reg.fields.length} fields</span>
            <span>${reg.uses} uses</span>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  showRegisterDetail(id) {
    const reg = State.registers.find(r => r.id === id);
    if (!reg) return;

    document.getElementById('registers-list').style.display = 'none';
    const detail = document.getElementById('register-detail');
    detail.style.display = 'block';

    let fieldsHtml = '';
    reg.fields.forEach(f => {
      fieldsHtml += `
        <div class="template-field">
          <span class="template-field-label">${f}</span>
          <span class="template-field-value">___</span>
        </div>
      `;
    });

    detail.innerHTML = `
      <button class="register-detail-back" onclick="App.backToRegisters()">← back to registers</button>
      <div class="screen-header">
        <h2 class="screen-title">${reg.name}</h2>
        <div class="flex gap-2 mt-2">
          <span class="badge badge-accent">${reg.lang}</span>
          <span class="badge badge-muted">${reg.script}</span>
          <span class="badge badge-muted">${reg.tone}</span>
        </div>
      </div>

      <div class="register-detail-section">
        <div class="register-detail-section-title">template structure</div>
        <div class="template-preview">
          ${fieldsHtml}
        </div>
      </div>

      <div class="register-detail-section">
        <div class="register-detail-section-title">dictate into this register</div>
        <div class="dictation-area">
          <textarea class="dictation-textarea" placeholder="start dictating to populate the fields above..."></textarea>
          <div class="dictation-hint">
            press <kbd>left ⌃</kbd> to talk
          </div>
        </div>
      </div>

      <div class="register-detail-section">
        <div class="register-detail-section-title">statistics</div>
        <div class="flex gap-6">
          <div>
            <div class="label">uses</div>
            <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 700; margin-top: var(--space-1);">${reg.uses}</div>
          </div>
          <div>
            <div class="label">fields</div>
            <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 700; margin-top: var(--space-1);">${reg.fields.length}</div>
          </div>
          <div>
            <div class="label">created</div>
            <div style="font-family: var(--font-heading); font-size: var(--text-sm); font-weight: 500; margin-top: var(--space-1); color: var(--color-text-secondary);">${new Date(reg.created).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    `;
  },

  backToRegisters() {
    document.getElementById('register-detail').style.display = 'none';
    document.getElementById('registers-list').style.display = 'block';
  },

  // ── Dictionary Screen ──────────────────────────────────────
  renderDictionary() {
    const container = document.getElementById('dictionary-terms-list');
    if (!container) return;

    if (State.dictionary.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">no terms added</div>
          <div class="empty-state-text">add the names, places, and terms that appear in your documents. every term you add is one fewer correction you'll need to make.</div>
        </div>
      `;
      return;
    }

    const data = PROFESSION_DATA[State.profession] || PROFESSION_DATA.court;
    let html = `<div class="label mb-4">${data.label.toLowerCase()} — starter terms</div>`;
    html += '<div class="card card-flat">';
    State.dictionary.forEach(term => {
      html += `
        <div class="dictionary-term">
          <div>
            <div class="dictionary-term-word">${term.word}</div>
            <div class="dictionary-term-category">${term.romanized} — ${term.meaning}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  // ── Shortcuts Screen ───────────────────────────────────────
  renderShortcuts() {
    const container = document.getElementById('shortcuts-list');
    if (!container) return;

    if (State.shortcuts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">no shortcuts configured</div>
          <div class="empty-state-text">add phrases you repeat across documents — headers, standard paragraphs, closing statements. say a trigger word, kivi expands it in full.</div>
        </div>
      `;
      return;
    }

    let html = '<div class="card card-flat">';
    State.shortcuts.forEach(sc => {
      html += `
        <div class="shortcut-item">
          <div class="shortcut-trigger">"${sc.trigger}"</div>
          <div class="shortcut-demo-arrow">→</div>
          <div class="shortcut-expansion">${sc.expansion.replace(/\n/g, '<br/>')}</div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  // ── Scratchpad ─────────────────────────────────────────────
  onScratchpadInput(value) {
    State.scratchpad = value;
    State.save();
    const count = document.getElementById('scratchpad-count');
    if (count) count.textContent = `${value.length} characters`;
  },

  clearScratchpad() {
    document.getElementById('scratchpad-input').value = '';
    State.scratchpad = '';
    State.save();
    const count = document.getElementById('scratchpad-count');
    if (count) count.textContent = '0 characters';
  },

  sendToRegister() {
    if (!State.scratchpad.trim()) return;
    if (State.registers.length === 0) {
      alert('create a register first before sending drafts.');
      return;
    }
    this.openSendToRegisterModal();
  },

  openSendToRegisterModal() {
    const container = document.getElementById('send-register-list');
    let html = '';
    State.registers.forEach(r => {
      html += `
        <button class="btn btn-ghost w-full mb-2" style="justify-content: flex-start; text-align: left;" onclick="App.completeSendToRegister('${r.id}')">
          <span class="badge badge-accent mr-2" style="margin-right: var(--space-2);">${r.lang}</span>
          ${r.name}
        </button>
      `;
    });
    container.innerHTML = html;
    document.getElementById('modal-send-register').classList.add('visible');
  },

  completeSendToRegister(regId) {
    const reg = State.registers.find(r => r.id === regId);
    if (reg) {
      reg.uses++;
      State.takes.unshift({
        text: State.scratchpad.substring(0, 80) + (State.scratchpad.length > 80 ? '...' : ''),
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase(),
        icon: SVG_ICONS.document,
        register: reg.name,
      });
      this.clearScratchpad();
      State.save();
      this.renderRecentTakes();
      this.renderRegisters();
    }
    this.closeModals();
  },

  // ── Modals ─────────────────────────────────────────────────
  openCreateRegisterModal() {
    document.getElementById('modal-create-register').classList.add('visible');
  },

  openDictionaryModal() {
    document.getElementById('modal-dictionary').classList.add('visible');
  },

  openShortcutModal() {
    document.getElementById('modal-shortcut').classList.add('visible');
  },

  openSettings() {
    Settings.updateUI();
    const modal = document.getElementById('modal-settings');
    if (modal) modal.classList.add('visible');
  },

  openImportModal() {
    // Placeholder — just flash the dictionary modal
    this.openDictionaryModal();
  },

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('visible'));
  },

  // ── CRUD Operations ────────────────────────────────────────
  createRegister(e) {
    e.preventDefault();
    const name = document.getElementById('new-register-name').value.trim();
    const lang = document.querySelector('#new-register-lang .toggle-option.active')?.dataset.value || 'marathi';
    const script = document.querySelector('#new-register-script .toggle-option.active')?.dataset.value || 'native';
    const tone = document.querySelector('#new-register-tone .tone-option.active')?.dataset.value || 'formal';
    const fieldsStr = document.getElementById('new-register-fields').value.trim();
    const fields = fieldsStr ? fieldsStr.split(',').map(f => f.trim()).filter(Boolean) : ['Field 1', 'Field 2', 'Field 3'];

    const category = State.profession === 'court' ? 'register-legal'
      : State.profession === 'teacher' ? 'register-academic'
      : State.profession === 'government' ? 'register-government'
      : 'register-general';

    const newReg = {
      id: 'reg-' + Date.now(),
      name,
      category,
      lang: lang.charAt(0).toUpperCase() + lang.slice(1),
      script,
      tone,
      fields,
      preview: fields.slice(0, 3).map(f => f + ': ___').join('  '),
      uses: 0,
      created: new Date().toISOString(),
    };

    State.registers.push(newReg);
    State.save();
    this.renderRegisters();
    this.renderHomeRegisterChips();
    this.updateGreeting();
    this.closeModals();

    // Clear form
    document.getElementById('new-register-name').value = '';
    document.getElementById('new-register-fields').value = '';
  },

  addDictionaryTerm(e) {
    e.preventDefault();
    const word = document.getElementById('dict-term-written').value.trim();
    const romanized = document.getElementById('dict-term-spoken').value.trim();
    const meaning = document.getElementById('dict-term-meaning').value.trim();

    State.dictionary.push({ word, romanized: romanized || word, meaning: meaning || '' });
    State.save();
    this.renderDictionary();
    this.closeModals();

    // Clear form
    document.getElementById('dict-term-written').value = '';
    document.getElementById('dict-term-spoken').value = '';
    document.getElementById('dict-term-meaning').value = '';
  },

  addShortcut(e) {
    e.preventDefault();
    const trigger = document.getElementById('shortcut-trigger').value.trim();
    const expansion = document.getElementById('shortcut-expansion').value.trim();

    State.shortcuts.push({ trigger, expansion });
    State.save();
    this.renderShortcuts();
    this.closeModals();

    // Clear form
    document.getElementById('shortcut-trigger').value = '';
    document.getElementById('shortcut-expansion').value = '';
  },

  // ── Toggle Helpers ─────────────────────────────────────────
  toggleOption(el) {
    el.parentElement.querySelectorAll('.toggle-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
  },

  toggleTone(el) {
    el.parentElement.querySelectorAll('.tone-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
  },
};

// ── Global Talk Key Handler (Left Ctrl) ──────────────────────────────────
let ctrlKeyDownTime = 0;
let startedByKey = false;

function setupGlobalTalkKey() {
  document.addEventListener('keydown', (e) => {
    // Left Control key (location === 1)
    if (e.key === 'Control' && e.location === 1) {
      if (e.repeat) return;
      ctrlKeyDownTime = Date.now();

      const onboardingEl = document.getElementById('onboarding');
      let target = 'main';
      if (onboardingEl && !onboardingEl.classList.contains('hidden')) {
        if (Onboarding.currentStep === 4) target = 'onboard';
        else if (Onboarding.currentStep === 6) target = 'talkkey_demo';
        else return; // Dictation not active on other onboarding steps
      } else {
        if (document.activeElement && document.activeElement.id === 'scratchpad-input') {
          target = 'scratchpad';
        }
      }

      if (!Dictation.isRecording) {
        startedByKey = true;
        Dictation.startRecording(target);
      } else {
        startedByKey = false;
        Dictation.stopRecording();
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Control' && e.location === 1) {
      const pressDuration = Date.now() - ctrlKeyDownTime;
      // If held for more than 350ms, release stops recording (push-to-talk)
      if (startedByKey && Dictation.isRecording && pressDuration > 350) {
        startedByKey = false;
        Dictation.stopRecording();
      }
    }
  });
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Settings.init();
  setupGlobalTalkKey();
  Onboarding.init();
});

// Close modals on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    App.closeModals();
  }
});

// Keyboard shortcut: Escape to close modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    App.closeModals();
  }
});
