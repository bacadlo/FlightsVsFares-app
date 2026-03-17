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

FlightsVsFares is a web application designed to simplify flight search by providing strategic advice and one-click access to eight of the world's largest flight booking sites. Rather than entering your trip details into each site individually, you describe your trip once, receive AI-powered guidance on booking timing and routing strategies, then launch all searches simultaneously.


---

## Features

### Core Features
- **AI Trip Advisor** 
- **8 Booking Sites Integrated** 
- **One-Click Launch** 
- **Beautiful Sky-Themed UI** 
- **Strategic Flight Tips** 

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 with App Router
- **UI Library:** React 19.2.4
- **HTTP Client:** Fetch API

### Backend Integration
- **API Route:** Next.js API routes for server-side API key management

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
- **Node.js:** 18+ (22.22.1 LTS recommended)
- **npm** or **yarn** for package management

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

   Edit `.env.local` and add your AI API key:
   ```
   AI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:3000`

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
- `POST /api/chat` - Send a message to the AI Trip Advisor
  - Request: `{ message: string }`
  - Response: `{ reply: string }`

---

## License

This project is licensed under the [MIT License](./LICENSE) - see the LICENSE file for details.

---

## Support

Have questions or encountered a problem? Please reach out with:
- What you were trying to do
- What happened
- Any relevant details
