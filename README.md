# StudyDesk – AI Study Assistant

StudyDesk is an AI-powered learning platform designed to make education smarter, faster, and more interactive. Powered by Google's Gemini AI, it helps students understand complex topics, organize study materials, generate notes, and improve their learning experience through intelligent AI-driven features.

### 🌐 Live Demo
**[https://ai-study-assistant-gemini.vercel.app](https://ai-study-assistant-gemini.vercel.app)**

### 🎯 Project Objective
To develop an intelligent study companion that uses generative AI to simplify the learning process, reduce manual study effort, and provide students with personalized academic assistance.

### ✨ Key Features
- **AI Study Assistant:** Interact with an AI-powered chatbot to ask questions and get educational explanations.
- **AI Note Generation & Summarization:** Generate structured study notes and concise summaries with the help of AI.
- **Flashcard Decks:** Spaced-repetition study decks with SM-2 scheduling, saved locally in your browser.
- **Practice Quiz Maker:** Generate custom practice quizzes on any topic or from pasted study notes.
- **Focus Timer:** Pomodoro-style interval timer that logs sessions automatically to your dashboard.
- **Math & Equation Solver:** Solve linear equations and evaluate complex expressions locally.
- **Cubby UI Design System:** Clean, tactile, craft-grade user interface with seamless Dark Mode and ⌘K Command Palette.

### 🛠️ Tools Overview

| Tool | Powered by Gemini? | Description |
|------|-------------------|-------------|
| **Ask a Tutor** | Yes | Open-ended Q&A chat tutor, explains concepts step by step |
| **Summarize Notes** | Yes (Offline fallback) | Condenses notes into structured key takeaways and terms |
| **Quiz Maker** | Yes (Offline fallback) | Generates practice multiple-choice questions with explanations |
| **Flashcards** | Offline (SM-2) | Spaced-repetition review decks stored in localStorage |
| **Focus Timer** | Offline | Pomodoro intervals logging to weekly activity chart |
| **Math Helper** | Offline | Solves linear algebraic equations and evaluates expressions |

### 🤖 AI Integration
Google Gemini API powers the intelligent features, enabling natural-language understanding, content generation, and contextual academic assistance with automatic model failover (`gemini-3.5-flash-lite`, `gemini-3.5-flash`, `gemini-2.5-flash`).

### 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arunkarvedant/AI-Study-Assistant-Gemini.git
   cd AI-Study-Assistant-Gemini
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```
   *(Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey))*

4. **Run locally:**
   ```bash
   npm start
   ```
   Open `http://localhost:5000` in your browser.
