# ---- AI Study Assistant (Gemini edition): single-container build ----
# The Express backend serves the static frontend directly,
# so this one image runs the whole app.

FROM node:20-alpine

WORKDIR /app

# Install backend dependencies first (better layer caching)
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copy the rest of the app
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "server.js"]
