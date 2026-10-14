/**
 * AI Study Assistant - Backend (Gemini edition)
 * Delegates to ../api/index.js for unified local and Vercel execution.
 */

const app = require('../api/index');
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AI Study Assistant backend (Gemini) running on http://localhost:${PORT}`);
  });
}

module.exports = app;
