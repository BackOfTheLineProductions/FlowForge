// ===== FLOWFORGE - ADVANCED RAP LYRIC ASSISTANT =====
// AI-Powered Lyric Writing Platform with Complex Rhyme Schemes

// ===== PHONETIC & RHYME ENGINE =====
class PhoneticEngine {
    constructor() {
        // Phoneme mappings for advanced rhyme detection
        this.vowelSounds = {
            'a': ['eɪ', 'æ', 'ɑ', 'ə'],
            'e': ['i', 'ɛ', 'ə'],
            'i': ['aɪ', 'ɪ', 'i'],
            'o': ['oʊ', 'ɔ', 'ɑ'],
            'u': ['ju', 'ʌ', 'ʊ', 'u'],
            'y': ['aɪ', 'ɪ']
        };

        this.consonantClusters = {
            'ch': 'tʃ', 'sh': 'ʃ', 'th': 'θ', 'ph': 'f',
            'gh': 'f', 'wh': 'w', 'ck': 'k', 'ng': 'ŋ'
        };

        // Common clichés to avoid in rap lyrics
        this.cliches = [
            'grind', 'hustle', 'stack paper', 'get money', 'chase dreams',
            'haters gonna hate', 'started from the bottom', 'money trees',
            'wake up every morning', 'looking at the mirror', 'real recognize real',
            'keep it 100', 'stay woke', 'on my grind', 'get this bread',
            'rose from the ashes', 'phoenix rising', 'king/queen of the game',
            'money on my mind', 'cash rules everything', 'mo money mo problems',
            'abstract metaphor', 'third eye', 'conscious rap', 'woke up like this',
            'manifest destiny', 'energy', 'vibes', 'aura', 'chakra'
        ];
    }

    // Convert word to phonetic representation
    toPhonetic(word) {
        word = word.toLowerCase().replace(/[^a-z]/g, '');
        let phonetic = '';
        
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            let nextChar = word[i + 1] || '';
            let cluster = char + nextChar;
            
            if (this.consonantClusters[cluster]) {
                phonetic += this.consonantClusters[cluster];
                i++; // Skip next char
            } else {
                phonetic += char;
            }
        }
        
        return phonetic;
    }

    // Extract vowel sounds for assonance detection
    getVowelPattern(word) {
        return word.toLowerCase().match(/[aeiou]/gi)?.join('') || '';
    }

    // Extract consonant sounds for consonance detection
    getConsonantPattern(word) {
        return word.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/gi)?.join('') || '';
    }

    // Calculate slant rhyme similarity (0-1)
    slantRhymeScore(word1, word2) {
        const phone1 = this.toPhonetic(word1);
        const phone2 = this.toPhonetic(word2);
        
        // Compare endings (last 2-3 phonemes)
        const end1 = phone1.slice(-3);
        const end2 = phone2.slice(-3);
        
        let matches = 0;
        const maxLen = Math.max(end1.length, end2.length);
        
        for (let i = 0; i < Math.min(end1.length, end2.length); i++) {
            if (end1[end1.length - 1 - i] === end2[end2.length - 1 - i]) {
                matches++;
            }
        }
        
        return matches / maxLen;
    }

    // Calculate assonance score
    assonanceScore(word1, word2) {
        const vowels1 = this.getVowelPattern(word1);
        const vowels2 = this.getVowelPattern(word2);
        
        if (!vowels1 || !vowels2) return 0;
        
        let matches = 0;
        const minLen = Math.min(vowels1.length, vowels2.length);
        
        for (let i = 0; i < minLen; i++) {
            if (vowels1[i] === vowels2[i]) matches++;
        }
        
        return matches / Math.max(vowels1.length, vowels2.length);
    }

    // Calculate consonance score
    consonanceScore(word1, word2) {
        const cons1 = this.getConsonantPattern(word1);
        const cons2 = this.getConsonantPattern(word2);
        
        if (!cons1 || !cons2) return 0;
        
        let matches = 0;
        const chars1 = cons1.split('');
        const chars2 = cons2.split('');
        
        chars1.forEach(c => {
            if (chars2.includes(c)) matches++;
        });
        
        return matches / Math.max(cons1.length, cons2.length);
    }

    // Find internal rhymes in a line
    findInternalRhymes(line) {
        const words = line.toLowerCase().match(/\b\w+\b/g) || [];
        const rhymes = [];
        
        for (let i = 0; i < words.length - 1; i++) {
            for (let j = i + 1; j < words.length; j++) {
                const score = this.slantRhymeScore(words[i], words[j]);
                if (score > 0.5) {
                    rhymes.push({
                        word1: words[i],
                        word2: words[j],
                        score: score,
                        type: 'internal'
                    });
                }
            }
        }
        
        return rhymes;
    }

    // Detect clichés in text
    detectCliches(text) {
        const lowerText = text.toLowerCase();
        const found = [];
        
        this.cliches.forEach(cliche => {
            if (lowerText.includes(cliche.toLowerCase())) {
                found.push(cliche);
            }
        });
        
        return found;
    }

    // Count syllables in a word
    countSyllables(word) {
        word = word.toLowerCase().replace(/[^a-z]/g, '');
        if (word.length <= 3) return 1;
        
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        
        const syllables = word.match(/[aeiouy]{1,2}/g);
        return syllables ? syllables.length : 1;
    }
}

// ===== RHYME GENERATOR =====
class RhymeGenerator {
    constructor(phoneticEngine) {
        this.engine = phoneticEngine;
        
        // Extensive rhyme database (sample - would be much larger in production)
        this.rhymeDatabase = {
            'success': ['excess', 'process', 'confess', 'progress', 'assess', 'possess', 'address', 'impress'],
            'money': ['honey', 'sunny', 'funny', 'bunny'],
            'fame': ['game', 'name', 'blame', 'claim', 'frame', 'shame', 'tame', 'flame'],
            'power': ['tower', 'hour', 'flower', 'shower', 'devour'],
            'mind': ['grind', 'find', 'kind', 'blind', 'wind', 'signed', 'refined', 'designed'],
            'flow': ['glow', 'show', 'know', 'grow', 'throw', 'slow', 'pro', 'though'],
            'skill': ['will', 'still', 'thrill', 'drill', 'chill', 'bill', 'fill', 'spill'],
            'real': ['deal', 'feel', 'steel', 'heal', 'reveal', 'conceal', 'appeal'],
        };
    }

    // Generate slant rhymes
    generateSlantRhymes(word, count = 10) {
        const results = [];
        const allWords = Object.values(this.rhymeDatabase).flat();
        
        allWords.forEach(candidate => {
            const score = this.engine.slantRhymeScore(word, candidate);
            if (score > 0.3 && score < 0.9) { // Slant rhymes, not perfect
                results.push({ word: candidate, score });
            }
        });
        
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, count)
            .map(r => r.word);
    }

    // Generate assonance matches
    generateAssonance(word, count = 10) {
        const results = [];
        const allWords = Object.values(this.rhymeDatabase).flat();
        
        allWords.forEach(candidate => {
            const score = this.engine.assonanceScore(word, candidate);
            if (score > 0.5) {
                results.push({ word: candidate, score });
            }
        });
        
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, count)
            .map(r => r.word);
    }

    // Generate consonance matches
    generateConsonance(word, count = 10) {
        const results = [];
        const allWords = Object.values(this.rhymeDatabase).flat();
        
        allWords.forEach(candidate => {
            const score = this.engine.consonanceScore(word, candidate);
            if (score > 0.4) {
                results.push({ word: candidate, score });
            }
        });
        
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, count)
            .map(r => r.word);
    }

    // Generate multi-syllabic rhymes
    generateMultiSyllabic(phrase, count = 10) {
        const words = phrase.split(' ');
        const lastWord = words[words.length - 1];
        
        // For demo, return some multi-syllabic matches
        const multiSyllabic = [
            'elaborate', 'celebrate', 'demonstrate', 'operate', 'navigate',
            'dominate', 'illuminate', 'accelerate', 'concentrate', 'generate'
        ];
        
        return multiSyllabic.slice(0, count);
    }
}

// ===== AI LYRIC GENERATOR =====
class LyricGenerator {
    constructor(phoneticEngine) {
        this.engine = phoneticEngine;
        
        // Advanced templates avoiding clichés
        this.templates = {
            witty: [
                "Cerebral {adjective}, my thoughts {verb} like {noun}",
                "Linguistic acrobat, I {verb} between the {noun}",
                "Mathematical precision when I {verb} the {noun}",
                "Quantum leap in thought, I {verb} through {noun}",
            ],
            aggressive: [
                "Verbal guillotine, I {verb} your {noun}",
                "Intellectual assassin, {verb} your {noun}",
                "Cognitive superiority, I {verb} like {noun}",
            ],
            wordplay: [
                "{noun} on {noun}, I'm {verb} the paradigm",
                "Double helix syntax, I {verb} the {noun}",
                "Metaphorical architect, I {verb} these {noun}",
            ],
            metaphor: [
                "Like {noun} in a {noun}, I {verb}",
                "Photosynthesis of thought, I {verb} the {noun}",
                "Tectonic shift in {noun}, I {verb}",
            ]
        };

        // Non-cliché vocabulary
        this.vocabulary = {
            adjectives: ['cerebral', 'kinetic', 'atomic', 'lucid', 'visceral', 'cryptic', 'mnemonic', 'surgical'],
            verbs: ['dissect', 'architect', 'synthesize', 'fracture', 'calibrate', 'navigate', 'oscillate', 'deviate'],
            nouns: ['syntax', 'paradigm', 'frequency', 'architecture', 'tessellation', 'algorithm', 'apparatus', 'mechanism']
        };
    }

    // Generate a complex bar
    generateBar(topic, style = 'witty') {
        const templates = this.templates[style] || this.templates.witty;
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        let bar = template;
        bar = bar.replace('{adjective}', this.getRandomWord('adjectives'));
        bar = bar.replace(/{verb}/g, this.getRandomWord('verbs'));
        bar = bar.replace(/{noun}/g, this.getRandomWord('nouns'));
        
        // Add topic context
        bar += `, ${topic} reconstructed`;
        
        return bar;
    }

    getRandomWord(type) {
        const words = this.vocabulary[type];
        return words[Math.floor(Math.random() * words.length)];
    }

    // Generate punchline
    generatePunchline(topic, style = 'witty', setup = '') {
        const punchlines = [];
        
        // Generate 5 variations
        for (let i = 0; i < 5; i++) {
            let punchline = '';
            
            switch (style) {
                case 'witty':
                    punchline = `Intellectual ${this.getRandomWord('nouns')}, I ${this.getRandomWord('verbs')} your ${topic} like ${this.getRandomWord('adjectives')} mathematics`;
                    break;
                case 'aggressive':
                    punchline = `Your ${topic}'s ${this.getRandomWord('adjective')}, mine's ${this.getRandomWord('verbs')} the ${this.getRandomWord('nouns')}`;
                    break;
                case 'wordplay':
                    punchline = `${topic.toUpperCase()} but I ${this.getRandomWord('verbs')} it different, ${this.getRandomWord('adjective')} ${this.getRandomWord('nouns')}`;
                    break;
                case 'metaphor':
                    punchline = `Like ${this.getRandomWord('nouns')} through ${this.getRandomWord('nouns')}, ${topic} gets ${this.getRandomWord('verbs')}`;
                    break;
                case 'double':
                    punchline = `${topic} twice: once for the ${this.getRandomWord('nouns')}, once when I ${this.getRandomWord('verbs')}`;
                    break;
                case 'intellectual':
                    punchline = `${this.getRandomWord('adjective')} ${topic}, ${this.getRandomWord('verbs')} through ${this.getRandomWord('nouns')} like Schrödinger`;
                    break;
            }
            
            punchlines.push({
                text: punchline,
                complexity: Math.floor(Math.random() * 30) + 70, // 70-100
                style: style
            });
        }
        
        return punchlines;
    }
}

// ===== FLOW ANALYZER =====
class FlowAnalyzer {
    constructor(phoneticEngine) {
        this.engine = phoneticEngine;
    }

    analyzeLyrics(lyrics) {
        const lines = lyrics.split('\n').filter(l => l.trim());
        
        const analysis = {
            syllablePattern: [],
            stressPattern: [],
            flowConsistency: 0,
            rhymeScheme: [],
            internalRhymes: 0
        };

        // Analyze each line
        lines.forEach(line => {
            const words = line.match(/\b\w+\b/g) || [];
            const syllables = words.reduce((sum, word) => 
                sum + this.engine.countSyllables(word), 0);
            
            analysis.syllablePattern.push(syllables);
            
            // Find internal rhymes
            const internals = this.engine.findInternalRhymes(line);
            analysis.internalRhymes += internals.length;
        });

        // Calculate flow consistency
        if (analysis.syllablePattern.length > 1) {
            const avg = analysis.syllablePattern.reduce((a, b) => a + b, 0) / 
                       analysis.syllablePattern.length;
            const variance = analysis.syllablePattern.reduce((sum, val) => 
                sum + Math.pow(val - avg, 2), 0) / analysis.syllablePattern.length;
            
            analysis.flowConsistency = Math.max(0, 100 - variance * 5);
        }

        return analysis;
    }

    getFlowVisualization(analysis) {
        const maxSyllables = Math.max(...analysis.syllablePattern);
        return analysis.syllablePattern.map(count => {
            const percentage = (count / maxSyllables) * 100;
            return `<div style="width: ${percentage}%; height: 20px; background: linear-gradient(90deg, #6366f1, #8b5cf6); margin: 4px 0; border-radius: 4px; display: flex; align-items: center; padding: 0 8px; color: white; font-size: 12px;">${count} syllables</div>`;
        }).join('');
    }
}

// ===== APP STATE & UI CONTROLLER =====
class FlowForgeApp {
    constructor() {
        this.phoneticEngine = new PhoneticEngine();
        this.rhymeGenerator = new RhymeGenerator(this.phoneticEngine);
        this.lyricGenerator = new LyricGenerator(this.phoneticEngine);
        this.flowAnalyzer = new FlowAnalyzer(this.phoneticEngine);
        
        this.currentView = 'write';
        this.lyricContent = '';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateLineNumbers();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                this.switchView(view);
            });
        });

        // Lyric editor
        const editor = document.getElementById('lyric-editor');
        if (editor) {
            editor.addEventListener('input', () => {
                this.updateLineNumbers();
                this.updateStats();
                this.checkCliches();
            });

            // Ctrl+Space for suggestions
            editor.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.code === 'Space') {
                    e.preventDefault();
                    this.showSuggestions();
                }
            });
        }

        // Rhyme lab
        const findRhymesBtn = document.getElementById('find-rhymes');
        if (findRhymesBtn) {
            findRhymesBtn.addEventListener('click', () => this.findRhymes());
        }

        // Punchline generator
        const generatePunchlineBtn = document.getElementById('generate-punchline');
        if (generatePunchlineBtn) {
            generatePunchlineBtn.addEventListener('click', () => this.generatePunchlines());
        }

        // Flow analyzer
        const analyzeFlowBtn = document.getElementById('analyze-flow-btn');
        if (analyzeFlowBtn) {
            analyzeFlowBtn.addEventListener('click', () => this.analyzeFlow());
        }

        // Syllable counter
        const syllableInput = document.getElementById('syllable-input');
        if (syllableInput) {
            syllableInput.addEventListener('input', () => this.updateSyllableBreakdown());
        }

        // Wordplay tools
        document.getElementById('find-entendre')?.addEventListener('click', () => this.findDoubleEntendre());
        document.getElementById('find-homophones')?.addEventListener('click', () => this.findHomophones());
        document.getElementById('build-compounds')?.addEventListener('click', () => this.buildCompounds());
        document.getElementById('find-synonyms')?.addEventListener('click', () => this.findSynonyms());

        // Suggestion generator
        document.getElementById('generate-suggestion')?.addEventListener('click', () => this.generateSuggestion());

        // Toolbar buttons
        document.getElementById('analyze-flow')?.addEventListener('click', () => this.analyzeCurrentFlow());
        document.getElementById('check-cliches')?.addEventListener('click', () => this.checkCliches());
    }

    switchView(view) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`)?.classList.add('active');

        // Update content
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.add('hidden');
        });
        document.getElementById(`${view}-view`)?.classList.remove('hidden');

        this.currentView = view;
    }

    updateLineNumbers() {
        const editor = document.getElementById('lyric-editor');
        const lineNumbers = document.getElementById('line-numbers');
        
        if (editor && lineNumbers) {
            const lines = editor.value.split('\n').length;
            lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
        }
    }

    updateStats() {
        const editor = document.getElementById('lyric-editor');
        if (!editor) return;

        const text = editor.value;
        const lines = text.split('\n').filter(l => l.trim());
        const words = text.match(/\b\w+\b/g) || [];
        
        let totalSyllables = 0;
        words.forEach(word => {
            totalSyllables += this.phoneticEngine.countSyllables(word);
        });

        // Calculate rhyme density
        let totalRhymes = 0;
        lines.forEach(line => {
            totalRhymes += this.phoneticEngine.findInternalRhymes(line).length;
        });
        const rhymeDensity = lines.length > 0 ? 
            Math.min(100, (totalRhymes / lines.length) * 50) : 0;

        // Update UI
        document.getElementById('line-count').textContent = lines.length;
        document.getElementById('word-count').textContent = words.length;
        document.getElementById('syllable-count').textContent = totalSyllables;
        document.getElementById('rhyme-density').textContent = rhymeDensity.toFixed(0) + '%';
        document.getElementById('complexity-score').textContent = 
            this.calculateComplexity(text);
    }

    calculateComplexity(text) {
        const words = text.match(/\b\w+\b/g) || [];
        if (words.length === 0) return '—';

        // Average word length
        const avgLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
        
        // Vocabulary diversity
        const uniqueWords = new Set(words.map(w => w.toLowerCase()));
        const diversity = uniqueWords.size / words.length;

        // Combine metrics
        const score = (avgLength * 10 + diversity * 50);
        
        if (score > 70) return 'High ⭐⭐⭐';
        if (score > 50) return 'Medium ⭐⭐';
        return 'Basic ⭐';
    }

    checkCliches() {
        const editor = document.getElementById('lyric-editor');
        const status = document.getElementById('cliche-status');
        
        if (!editor || !status) return;

        const cliches = this.phoneticEngine.detectCliches(editor.value);
        
        if (cliches.length === 0) {
            status.innerHTML = `
                <div class="status-badge status-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    No clichés detected
                </div>
            `;
        } else {
            status.innerHTML = `
                <div class="status-badge status-warning">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    ${cliches.length} cliché(s) found
                </div>
                <div style="margin-top: 8px; font-size: 12px; color: var(--text-secondary);">
                    ${cliches.join(', ')}
                </div>
            `;
        }
    }

    findRhymes() {
        const input = document.getElementById('rhyme-search');
        if (!input || !input.value.trim()) return;

        const word = input.value.trim();
        
        // Generate different types of rhymes
        const slant = this.rhymeGenerator.generateSlantRhymes(word, 15);
        const assonance = this.rhymeGenerator.generateAssonance(word, 15);
        const consonance = this.rhymeGenerator.generateConsonance(word, 15);
        const multi = this.rhymeGenerator.generateMultiSyllabic(word, 15);

        // Display results
        this.displayRhymes('slant-rhymes', slant);
        this.displayRhymes('assonance-matches', assonance);
        this.displayRhymes('consonance-matches', consonance);
        this.displayRhymes('multisyllabic-rhymes', multi);
        
        // Internal and phonetic
        this.displayRhymes('internal-rhymes', slant.slice(0, 10));
        this.displayRhymes('phonetic-variations', assonance.slice(0, 10));
    }

    displayRhymes(containerId, rhymes) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (rhymes.length === 0) {
            container.innerHTML = '<div class="empty-state">No matches found</div>';
            return;
        }

        container.innerHTML = rhymes.map(word => 
            `<div class="rhyme-item">${word}</div>`
        ).join('');
    }

    generatePunchlines() {
        const topic = document.getElementById('punchline-topic')?.value || 'skill';
        const style = document.getElementById('punchline-style')?.value || 'witty';
        const setup = document.getElementById('punchline-setup')?.value || '';

        const punchlines = this.lyricGenerator.generatePunchline(topic, style, setup);
        
        const container = document.getElementById('punchline-results');
        if (!container) return;

        container.innerHTML = punchlines.map(p => `
            <div class="punchline-card">
                <div class="punchline-text">${p.text}</div>
                <div class="punchline-meta">
                    <span class="meta-badge">Complexity: ${p.complexity}%</span>
                    <span class="meta-badge">Style: ${p.style}</span>
                </div>
            </div>
        `).join('');
    }

    analyzeFlow() {
        const input = document.getElementById('flow-input');
        if (!input || !input.value.trim()) return;

        const analysis = this.flowAnalyzer.analyzeLyrics(input.value);
        
        // Update metrics
        document.getElementById('syllable-pattern').textContent = 
            analysis.syllablePattern.join(' - ');
        document.getElementById('flow-consistency').textContent = 
            analysis.flowConsistency.toFixed(0) + '%';
        document.getElementById('stress-pattern').textContent = 
            `${analysis.internalRhymes} internal rhymes`;

        // Update visualization
        const viz = document.getElementById('flow-visualization');
        if (viz) {
            viz.innerHTML = this.flowAnalyzer.getFlowVisualization(analysis);
        }
    }

    analyzeCurrentFlow() {
        const editor = document.getElementById('lyric-editor');
        if (!editor || !editor.value.trim()) return;

        const analysis = this.flowAnalyzer.analyzeLyrics(editor.value);
        
        // Update rhyme visualization
        const rhymeViz = document.getElementById('rhyme-viz');
        if (rhymeViz) {
            rhymeViz.innerHTML = `
                <div style="padding: 12px;">
                    <div style="margin-bottom: 8px;">
                        <strong>Pattern:</strong> ${analysis.syllablePattern.join('-')}
                    </div>
                    <div style="margin-bottom: 8px;">
                        <strong>Internal Rhymes:</strong> ${analysis.internalRhymes}
                    </div>
                    <div>
                        <strong>Consistency:</strong> ${analysis.flowConsistency.toFixed(0)}%
                    </div>
                </div>
            `;
        }
    }

    updateSyllableBreakdown() {
        const input = document.getElementById('syllable-input');
        const breakdown = document.getElementById('syllable-breakdown');
        
        if (!input || !breakdown) return;

        const lines = input.value.split('\n').filter(l => l.trim());
        
        if (lines.length === 0) {
            breakdown.innerHTML = '<div class="empty-state">Type lyrics to see syllable breakdown</div>';
            return;
        }

        breakdown.innerHTML = lines.map(line => {
            const words = line.match(/\b\w+\b/g) || [];
            const syllables = words.reduce((sum, word) => 
                sum + this.phoneticEngine.countSyllables(word), 0);
            
            return `
                <div class="syllable-line">
                    ${line}
                    <span class="syllable-count">${syllables}</span>
                </div>
            `;
        }).join('');
    }

    findDoubleEntendre() {
        const input = document.getElementById('entendre-input')?.value;
        const results = document.getElementById('entendre-results');
        
        if (!input || !results) return;

        // Sample double meanings
        const meanings = [
            `"${input}" - Primary: literal meaning`,
            `"${input}" - Secondary: metaphorical interpretation`,
            `"${input}" - Contextual: depends on delivery`
        ];

        results.innerHTML = meanings.map(m => 
            `<div class="result-item">${m}</div>`
        ).join('');
    }

    findHomophones() {
        const input = document.getElementById('homophone-input')?.value;
        const results = document.getElementById('homophone-results');
        
        if (!input || !results) return;

        // Sample homophones (would be from a real database)
        const homophones = ['knight/night', 'write/right', 'bare/bear', 'brake/break'];
        
        results.innerHTML = homophones.map(h => 
            `<div class="result-item">${h}</div>`
        ).join('');
    }

    buildCompounds() {
        const input = document.getElementById('compound-input')?.value;
        const results = document.getElementById('compound-results');
        
        if (!input || !results) return;

        const compounds = [
            `${input}-craft`, `${input}-scape`, `${input}-work`,
            `over-${input}`, `under-${input}`, `${input}-wave`
        ];

        results.innerHTML = compounds.map(c => 
            `<div class="result-item">${c}</div>`
        ).join('');
    }

    findSynonyms() {
        const input = document.getElementById('synonym-input')?.value;
        const results = document.getElementById('synonym-results');
        
        if (!input || !results) return;

        // Sample synonyms
        const synonyms = ['alternative', 'substitute', 'replacement', 'equivalent', 'analog'];
        
        results.innerHTML = synonyms.map(s => 
            `<div class="result-item">${s}</div>`
        ).join('');
    }

    generateSuggestion() {
        const prompt = document.getElementById('suggestion-prompt')?.value;
        if (!prompt) return;

        const bar = this.lyricGenerator.generateBar(prompt, 'witty');
        
        // Insert at cursor in editor
        const editor = document.getElementById('lyric-editor');
        if (editor) {
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            const text = editor.value;
            
            editor.value = text.substring(0, start) + bar + '\n' + text.substring(end);
            editor.focus();
            
            this.updateLineNumbers();
            this.updateStats();
        }
    }

    showSuggestions() {
        // Show AI suggestions based on current context
        alert('AI Suggestion: Press Ctrl+Space while typing to get intelligent line completions!');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.flowForgeApp = new FlowForgeApp();
    console.log('🎤 FlowForge initialized - Advanced Rap Lyric Assistant ready!');
});
