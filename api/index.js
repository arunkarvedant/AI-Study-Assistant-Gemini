/**
 * AI Study Assistant - Serverless API & Express Application
 * ---------------------------------------------------------
 * Runs as a Vercel Serverless Function under /api/index.js
 * or as a standalone Express server locally.
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
].filter(Boolean);

let workingModel = null; // cached once we find a model ID that responds successfully

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Serve static frontend files when run locally as a standalone server
const publicDir = path.join(__dirname, '..', 'public');
const frontendDir = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
} else if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir));
}

/**
 * Call the Gemini API, trying each candidate model until one works.
 * Once a model succeeds, it's cached in `workingModel` so later calls
 * skip straight to it instead of re-probing every time.
 */
async function callGemini(systemPrompt, userContent) {
  if (!GEMINI_API_KEY) {
    const err = new Error('Missing GEMINI_API_KEY. Add a free key from https://aistudio.google.com/apikey to your environment variables.');
    err.code = 'NO_KEY';
    throw err;
  }

  const modelsToTry = workingModel ? [workingModel, ...MODEL_CANDIDATES.filter((m) => m !== workingModel)] : MODEL_CANDIDATES;
  let lastError = null;

  for (const model of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: userContent }] }],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        lastError = new Error(`Gemini API error (${response.status}) for model "${model}": ${errText}`);
        if (workingModel === model) workingModel = null;
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
      if (workingModel !== model) {
        workingModel = model;
        console.log(`Using Gemini model: ${model}`);
      }
      return text;
    } catch (err) {
      lastError = err;
      if (workingModel === model) workingModel = null;
    }
  }

  throw lastError || new Error('All Gemini model candidates failed.');
}

// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    model: workingModel || (MODEL_CANDIDATES[0] || null),
    modelConfirmed: Boolean(workingModel),
    aiConfigured: Boolean(GEMINI_API_KEY),
  });
});

// ---------------------------------------------------------------------------
// POST /api/chat - conversational Q&A tutor
// ---------------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, subject = 'General', history = [] } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ error: 'message is required' });

    const systemPrompt = `You are a patient, encouraging AI study assistant helping an
intermediate-level student understand "${subject}". Explain concepts clearly with
simple language and examples, break down complex ideas step by step, and ask a short
follow-up question when it helps learning. Keep answers focused and easy to read.`;

    const historyText = history.map((h) => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.content}`).join('\n');
    const userContent = historyText ? `${historyText}\nStudent: ${message}` : message;

    const reply = await callGemini(systemPrompt, userContent);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(err.code === 'NO_KEY' ? 503 : 500).json({ error: err.message, code: err.code });
  }
});

// ---------------------------------------------------------------------------
// POST /api/summarize - condense notes into a study summary
// ---------------------------------------------------------------------------
app.post('/api/summarize', async (req, res) => {
  try {
    const { notes } = req.body;
    if (!notes || !notes.trim()) return res.status(400).json({ error: 'notes is required' });

    const systemPrompt = `You are an AI study assistant. Summarize the student's notes
into a well-structured study summary for an intermediate learner: a short overview,
then key points as bullet lists, then any important terms bolded with a one-line
definition. Keep it concise and skimmable.`;

    const summary = await callGemini(systemPrompt, notes);
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(err.code === 'NO_KEY' ? 503 : 500).json({ error: err.message, code: err.code });
  }
});

// ---------------------------------------------------------------------------
// POST /api/quiz - generate practice questions on a topic or from pasted text
// ---------------------------------------------------------------------------
app.post('/api/quiz', async (req, res) => {
  try {
    const { topic, count = 5, difficulty = 'intermediate' } = req.body;
    if (!topic || !topic.trim()) return res.status(400).json({ error: 'topic is required' });

    const systemPrompt = `You are an AI study assistant that writes practice quizzes.
Respond ONLY with valid JSON (no markdown fences, no preamble) matching this shape:
{
  "questions": [
    { "question": "string", "options": ["A", "B", "C", "D"], "answer": "the correct option text", "explanation": "short reason" }
  ]
}`;
    const userContent = `Create ${count} ${difficulty}-level multiple choice questions about: ${topic}`;

    const raw = await callGemini(systemPrompt, userContent);
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let quiz;
    try {
      quiz = JSON.parse(cleaned);
    } catch (parseErr) {
      return res.status(502).json({ error: 'Failed to parse quiz JSON from model', raw });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(err.code === 'NO_KEY' ? 503 : 500).json({ error: err.message, code: err.code });
  }
});

// Standalone execution support
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AI Study Assistant running on http://localhost:${PORT}`);
    if (!GEMINI_API_KEY) console.log('Warning: GEMINI_API_KEY is not set — AI endpoints will return 503 until you add one');
  });
}

module.exports = app;
