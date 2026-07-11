# ⚡ ScriptFlow 10x
### AI Research & Visual Storyboard Assistant for Creators

> Generate professional YouTube scripts, structured outlines, and visual storyboards in seconds — powered by Google Gemini AI.

---

## 🎯 What is ScriptFlow 10x?

ScriptFlow 10x is a productivity tool built for educational content creators like Dhruv Rathee. Instead of spending hours researching and structuring a video, creators simply type their topic and instantly receive:

- A **viral-worthy Video Hook** to grab attention in the first 30 seconds
- A **timestamped Core Structure** breaking down the full video flow
- A **Visual Storyboard** with scene-by-scene directions, text overlays, and B-roll suggestions

**10x your content creation speed. Zero fluff. Pure output.**

---

## ✨ Features

- 🎣 **AI Video Hook Generator** — Compelling opening lines that stop the scroll
- 🏗️ **Core Structure Builder** — Timestamped segment breakdown ready to record
- 🎬 **Visual Storyboard** — Scene-by-scene visual direction for editors
- 🕐 **Recent Topics History** — LocalStorage-powered sidebar for quick re-access
- 💀 **Skeleton Loading UI** — Premium shimmer animation while AI generates
- 📋 **One-Click Copy** — Copy any section instantly to clipboard
- 🔑 **Secure API Key Management** — Key stored in localStorage, never hardcoded or exposed
- ⚡ **Enter Key Submit** — Keyboard-first workflow for speed

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic app structure |
| CSS3 | Premium dark UI, skeleton animation, responsive layout |
| JavaScript ES6 | DOM manipulation, async/await, localStorage |
| Google Gemini API | AI script generation (gemini-1.5-flash) |
| Font Awesome | Icons |

---

## 🚀 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/babluverse/scriptflow-10x.git
```

2. Open the project folder:
```bash
cd scriptflow-10x
```

3. Open `index.html` in your browser — no build tools, no dependencies!

4. On first use, enter your **Google Gemini API Key** when prompted.
   - Get your free key at: https://aistudio.google.com/app/apikey
   - Key is saved to localStorage — never shared or exposed

---

## 📁 Project Structure

scriptflow-10x/
│
├── index.html        # App layout — sidebar, input, output cards
├── style.css         # Dark premium UI, skeleton loader, animations
└── script.js         # Gemini API integration, parsing, localStorage

---

## 🔑 API Key Security

ScriptFlow 10x uses a secure client-side key management approach:

- API key is **never hardcoded** in source code
- Key is requested once via `window.prompt()` on first use
- Stored in browser `localStorage` — stays on your device only
- If an invalid key is detected, it is **automatically cleared** and re-requested

---

## 🔮 Mesh API Integration (Phase 2)

ScriptFlow 10x is structurally prepared for Mesh API integration:

- Creator authentication sync via Mesh Link
- User profile pipeline ready in `script.js`
- Phase 2 roadmap: connect creator accounts for personalized script tone and style matching

---

## 📊 How It Works

User types topic
↓
Gemini API called with expert prompt
↓
Response parsed into [HOOK] [STRUCTURE] [STORYBOARD]
↓
Cards rendered with copy functionality
↓
Topic saved to Recent History

---

## 🌐 Live Demo

🔗 [View Live](https://babluverse.github.io/scriptflow)

---

## 👤 Built By

**Bablu Kushwaha** — Self-taught Full-Stack Developer, Kathmandu, Nepal
- Portfolio: https://babluverse.github.io/my-portfolio
- GitHub: https://github.com/babluverse
- LinkedIn: https://www.linkedin.com/in/babloo-kushwaha

---

*Built for the Mesh API Hackathon — ScriptFlow 10x · Powered by Google Gemini AI*