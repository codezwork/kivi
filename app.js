/* ========================================================================
   KIVI — Application Logic (Repositioned)
   State management, navigation, onboarding, register CRUD, dictation sim.
   ======================================================================== */

// ── Profession-specific data ──────────────────────────────────────────────
// Court and Teacher are primary personas; Government and Other are secondary.
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
      { text: 'माननीय न्यायालय के समक्ष, याचिकाकर्ता श्री राजेश कुमार...', time: '3:42 pm', icon: '📄', register: 'Civil Petition' },
      { text: 'Draft notes for tomorrow\'s hearing — need to check respondent address', time: '1:15 pm', icon: '✏️', register: null },
      { text: 'ज्ञापन क्रमांक 42/2026, कार्यालय समय परिवर्तन...', time: '11:08 am', icon: '🟢', register: 'Case Order' },
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
      { text: 'विषय: हिन्दी व्याकरण, कक्षा दसवीं, पूर्णांक 80...', time: '4:10 pm', icon: '📄', register: 'Question Paper' },
      { text: 'Draft lesson plan for tomorrow — need to add grammar exercises', time: '2:30 pm', icon: '✏️', register: null },
      { text: 'कक्षा आठवीं, अभ्यास कार्य: निबंध लेखन...', time: '10:45 am', icon: '🟢', register: 'Lesson Plan' },
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
      { text: 'ज्ञापन क्रमांक 42/2026, कार्यालय समय परिवर्तन...', time: '3:00 pm', icon: '📄', register: 'Government Memo' },
      { text: 'Draft circular for office timing change', time: '1:45 pm', icon: '✏️', register: null },
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
      { text: 'पत्र: प्रति श्रीमान निदेशक...', time: '2:00 pm', icon: '📄', register: 'General Correspondence' },
    ],
  },
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
    App.init();
  },
};

// ── App (Main Application) ────────────────────────────────────────────────
const App = {
  currentScreen: 'record',

  init() {
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
    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.sidebar-link[data-screen="${screen}"]`);
    if (link) link.classList.add('active');

    // Show/hide screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screen}`);
    if (target) target.classList.add('active');

    // If navigating to registers and detail is shown, go back to list
    if (screen === 'registers') {
      document.getElementById('register-detail').style.display = 'none';
      document.getElementById('registers-list').style.display = 'block';
    }
  },

  updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = 'good morning.';
    else if (hour < 17) greeting = 'good afternoon.';
    else greeting = 'good evening.';

    document.getElementById('home-greeting').textContent = greeting;

    const countEl = document.getElementById('home-register-count');
    if (countEl) {
      countEl.textContent = `${State.registers.length} registers active`;
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
      onclick="App.setActiveRegister(null)">no register</button>`;

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
    // Simple simulation: just track the text
    if (value.length > 20 && !this._dictationSaved) {
      this._dictationSaved = true;
      // Auto-create a take after some content
      setTimeout(() => { this._dictationSaved = false; }, 5000);
    }
  },

  renderRecentTakes() {
    const container = document.getElementById('recent-takes-list');
    if (!container) return;

    if (State.takes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">no dictations yet</div>
          <div class="empty-state-text">every document you dictate appears here. start a dictation above to begin filing.</div>
        </div>
      `;
      return;
    }

    let html = '';
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

  // ── History Screen ─────────────────────────────────────────
  renderHistory() {
    // Uses same takes data
    const container = document.getElementById('history-content');
    if (!container) return;

    if (State.takes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">no history yet</div>
          <div class="empty-state-text">dictations you file will appear here, searchable and grouped by date.</div>
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
        icon: '📄',
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

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
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
