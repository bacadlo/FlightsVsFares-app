# FlightsVsFares

AI-powered flight search launcher. Describe your trip, get strategic advice, open every major booking site simultaneously.

**Status:** In Development

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [License](#license)
- [Support](#support)

---

## Overview

FlightsVsFares is a three-page web application that simplifies flight search. You describe your trip once, receive AI-powered guidance on booking timing, routing strategies, and budget expectations, then open all eight major booking sites simultaneously in one click. The app never books flights itself — it gives you the strategy and the instant access to find the best deal yourself.

---

## Features

### Core Features
- **AI Trip Advisor** — Chat interface backed by a configurable AI provider. Gives concise budget reality checks, optimal booking windows, and routing hacks.
- **8 Booking Sites** — Google Flights, Skyscanner, Kayak, Kiwi.com, Momondo, Expedia, CheapFlights, and Hopper, each with a description of its unique strength.
- **One-Click Launch** — Opens all 8 sites simultaneously in separate tabs from a single button.
- **Sky-Themed UI** — Animated atmospheric background that cycles between a daytime sky and a night city view. Manually switchable between auto, day, and night modes.
- **Flight Tips** — Editorial page with 6 practical tips covering booking windows, departure day pricing, nearby airports, and more.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.7 with App Router
- **UI Library:** React 19.2.4
- **HTTP Client:** Fetch API

### Backend Integration
- **API Route:** Next.js API routes for server-side API key management
- **AI Providers:** Anthropic Claude (default), OpenAI, DeepSeek, Google Gemini, Ollama — switchable via `AI_PROVIDER` env var
- **AI SDKs:** `@anthropic-ai/sdk` 0.79.0, `openai` 6.31.0, `@google/genai` 1.45.0

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bacadlo/flightsvsfares.git
   cd flightsvsfares/flightsvsfares-app
   ```

2. **Install dependencies** (follow Quick Start section below)

---

## Quick Start

### Prerequisites
- **Node.js:** 22.22.1 LTS
- **npm** for package management

### Development Setup

1. **Navigate to project directory**
   ```bash
   cd flightsvsfares-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**

   **Windows:**
   ```cmd
   copy .env.example .env.local
   ```

   **macOS/Linux:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set your chosen provider and API key:
   ```
   AI_PROVIDER=anthropic

   ANTHROPIC_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   DEEPSEEK_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   OLLAMA_MODEL=llama3.3
   ```

   `AI_PROVIDER` accepts: `anthropic` (default), `openai`, `deepseek`, `gemini`, `ollama`. Only the key for the active provider is required.

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:3000`

### Running Tests

```bash
npm test
```

### Production Build

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

---

## API Documentation

### Internal Routes

**Chat Endpoint**
- `POST /api/chat` — Send a message to the AI Trip Advisor
  - Request: `{ message: string }`
  - Response: `{ reply: string }`
  - The active provider is determined by `AI_PROVIDER` in `.env.local`. All API keys are kept server-side and never exposed to the client.

---

## License

This project is licensed under the [MIT License](./LICENSE) - see the LICENSE file for details.

---

## Support

Have questions or encountered a problem? Please reach out with:
- What you were trying to do
- What happened
- Any relevant details
