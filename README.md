# Cortex - AI-Powered Code Editor

> Code with Intent. Build with Memory.

Cortex is a next-generation, AI-first code editor built on the MERN stack with Monaco Editor. Unlike conventional AI copilots that only autocomplete code, Cortex understands the intent behind your code, explains your entire codebase visually, and remembers every architectural decision you make.

## Tech Stack

- **Frontend**: React 18 + Vite, Monaco Editor 0.47.x, Zustand 4.x, SCSS
- **Backend**: Node.js 20 LTS, Express.js 4.x, MongoDB 7.x, Mongoose 8.x, Socket.IO 4.x
- **AI**: Google Gemini 2.0 Flash, Groq (fallback)
- **Auth**: Clerk

## Features

- 🎯 **Intent Mode** - AI-powered code refactoring with 5 intent types
- 🧠 **Decision Memory** - Architectural decision tracking with annotations
- 📊 **Codebase Explainer** - Visual dependency graphs and data flow tracing
- 🔐 **Authentication** - Secure auth with Clerk

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development server
npm run dev
