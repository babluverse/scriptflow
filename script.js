// ── DOM Elements ──
const topicInput = document.getElementById('topic-input');
const generateBtn = document.getElementById('generate-btn');
const skeletonGrid = document.getElementById('skeleton-grid');
const resultGrid = document.getElementById('result-grid');
const emptyState = document.getElementById('empty-state');
const recentList = document.getElementById('recent-list');

// ── State ──
let recentTopics = JSON.parse(localStorage.getItem('scriptflow_recent')) || [
  'History of Internet',
  'Climate Change Explained',
  'How AI Works',
  'Rise of China Economy',
  'India vs Pakistan Water War',
];

// ── Secure API Key Helper ──
function getApiKey() {
  let key = localStorage.getItem('gemini_api_key');
  if (!key) {
    key = window.prompt(
      '🔑 Enter your Gemini API Key to use ScriptFlow 10x:\n(It will be saved locally and never shared)'
    );
    if (key && key.trim()) {
      localStorage.setItem('gemini_api_key', key.trim());
    } else {
      throw new Error('API key not provided.');
    }
  }
  return key.trim();
}

// ── Show / Hide Helpers ──
function showSkeleton() {
  skeletonGrid.removeAttribute('hidden');
  resultGrid.setAttribute('hidden', '');
  emptyState.setAttribute('hidden', '');
}

function showResult() {
  skeletonGrid.setAttribute('hidden', '');
  resultGrid.removeAttribute('hidden');
  emptyState.setAttribute('hidden', '');
}

function showEmpty() {
  skeletonGrid.setAttribute('hidden', '');
  resultGrid.setAttribute('hidden', '');
  emptyState.removeAttribute('hidden');
}

// ── Render Recent Topics ──
function renderRecent() {
  recentList.innerHTML = '';
  recentTopics.slice(0, 7).forEach(topic => {
    const li = document.createElement('li');
    li.classList.add('recent-item');
    li.textContent = topic;
    li.addEventListener('click', () => {
      topicInput.value = topic;
      topicInput.focus();
    });
    recentList.appendChild(li);
  });
}

// ── Save Recent Topic ──
function saveRecent(topic) {
  recentTopics = recentTopics.filter(t => t.toLowerCase() !== topic.toLowerCase());
  recentTopics.unshift(topic);
  recentTopics = recentTopics.slice(0, 7);
  localStorage.setItem('scriptflow_recent', JSON.stringify(recentTopics));
  renderRecent();
}

// ── Parse Gemini Response ──
function parseResponse(text) {
  const extract = (marker) => {
    const regex = new RegExp(
      `\\[${marker}\\]([\\s\\S]*?)(?=\\[(?:HOOK|STRUCTURE|STORYBOARD)\\]|$)`,
      'i'
    );
    const match = text.match(regex);
    return match ? match[1].trim() : 'Content not generated. Please try again.';
  };

  return {
    hook: extract('HOOK'),
    structure: extract('STRUCTURE'),
    storyboard: extract('STORYBOARD'),
  };
}

// ── Call Gemini API ──
async function generateScript(topic) {
  const API_KEY = getApiKey();
 const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

  const prompt = `You are an expert educational YouTube content writer, similar to Dhruv Rathee. Your task is to generate a complete, structured video script breakdown for the following topic: "${topic}".

Your response MUST follow this EXACT format with these three section markers in this order. Do not add any extra text before [HOOK]:

[HOOK]
Write a powerful 3-4 sentence video opening hook here. Start with a shocking fact, a bold question, or an emotional statement. Make it urgent, viral-worthy, and impossible to skip.

[STRUCTURE]
Write the full video structure here in this format:
INTRO (0:00 - 1:00): Brief description of intro
SEGMENT 1 (1:00 - 4:00): Segment title - what will be covered
SEGMENT 2 (4:00 - 8:00): Segment title - what will be covered
SEGMENT 3 (8:00 - 12:00): Segment title - what will be covered
SEGMENT 4 (12:00 - 16:00): Segment title - what will be covered
OUTRO (16:00 - 18:00): Call to action and closing

[STORYBOARD]
Write the visual storyboard here in this format:
SCENE 1 - Hook
Visual: Describe exact on-screen visual or animation
Text Overlay: What bold text appears on screen
B-roll: What footage or graphic to use

SCENE 2 - Opening
Visual: Describe visual
Text Overlay: Text shown
B-roll: Footage type

SCENE 3 - Main Content
Visual: Describe visual
Text Overlay: Key stat or quote
B-roll: Related footage

SCENE 4 - Data/Stats
Visual: Chart or graph description
Text Overlay: Key statistic to display
B-roll: Related footage

SCENE 5 - Conclusion
Visual: Closing visual
Text Overlay: CTA text
B-roll: Outro footage`;

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (response.status === 400 || response.status === 403) {
    // Invalid key — clear it so user can re-enter
    localStorage.removeItem('gemini_api_key');
    throw new Error('Invalid API key. Please refresh and enter a valid key.');
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  return parseResponse(text);
}

// ── Render Result Cards ──
function renderCards(data) {
  document.getElementById('hook-content').innerText = data.hook;
  document.getElementById('structure-content').innerText = data.structure;
  document.getElementById('storyboard-content').innerText = data.storyboard;
  showResult();
}

// ── Copy Button Logic ──
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const content = document.getElementById(targetId).innerText;
    navigator.clipboard.writeText(content).then(() => {
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    });
  });
});

// ── Main Generate Handler ──
async function handleGenerate() {
  const topic = topicInput.value.trim();

  if (!topic) {
    topicInput.focus();
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
  showSkeleton();

  try {
    const data = await generateScript(topic);
    saveRecent(topic);
    renderCards(data);
  } catch (error) {
    console.error('Generation failed:', error);
    showEmpty();
    emptyState.querySelector('h2').textContent = '⚠️ Generation Failed!';
    emptyState.querySelector('p').textContent = error.message || 'Check your API key or internet and try again.';
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerHTML = '<i class="fas fa-bolt"></i> Generate Script';
  }
}

// ── Event Listeners ──
generateBtn.addEventListener('click', handleGenerate);

topicInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleGenerate();
});

// ── Init ──
renderRecent();
showEmpty();