# 👑 Boundbot: Craftbound MC AI Administrator

Boundbot is a production-grade, AI-powered Discord role management bot engineered exclusively for **Craftbound MC**. Designed for the modern serverless era, it completely abandons traditional long-polling WebSocket connections in favor of an ultra-fast, stateless HTTP Interactions architecture built on Next.js Edge. 

With integrated LLM capabilities via OpenRouter, Boundbot allows server Owners and Trusted Moderators to manage community roles, parse natural language administrative requests, and seamlessly enforce rigorous Staff-Approval hierarchies—all backed by a resilient, GitHub-driven JSON memory core.

---

## ⚡ Core Features

- **🧠 Serverless AI Execution:** Utilizes Vercel's `waitUntil` Edge capabilities to securely route natural language requests through OpenRouter (Gemini/OpenAI) while instantly acknowledging Discord's strict 3-second interaction window.
- **🛡️ Backend Authority:** Boundbot employs a strict Capability-Based Permission model. The AI acts only as an intelligence layer; every tool execution is independently validated against the backend hierarchy before touching the Discord API.
- **💾 GitHub Optimistic Persistence:** No databases. Boundbot uses Octokit with robust 409 Conflict Retry logic to read and write its `config.json` and `memory.json` states directly to a private GitHub repository.
- **📜 Staff-Approval Workflow:** Disallows direct self-assignment of roles. Community members submit role requests via a persistent interactive panel, generating pending tickets that authorized staff can manually (or AI-naturally) approve.
- **🚫 Zero Comments Codebase:** To maintain peak operational minimalism and enforce strict self-documenting code, the entire TypeScript source tree operates with absolutely zero inline or block comments. 

---

## 🛠️ Architecture

Boundbot operates on a strictly defined access principle:
1. **Human Staff** (Owner / Trusted Moderators) issue natural language commands or interact with UI panels.
2. **Authorization Layer** verifies the user's explicit capabilities.
3. **AI Layer** (OpenRouter) processes the prompt and selects the appropriate Boundbot tooling.
4. **Backend Validation** re-verifies hierarchy, capabilities, and protected roles against the current Discord state.
5. **Execution** commits changes to Discord and synchronizes memory back to GitHub.

---

## 🚀 Deployment

Boundbot is built for deployment on **Vercel** as a serverless application.

### Environment Setup
Create a `.env.local` file (or populate your Vercel Project settings) with the variables defined in `.env.example`.

```env
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_application_id
DISCORD_PUBLIC_KEY=your_public_key
OPENROUTER_API_KEY=your_openrouter_api_key
GITHUB_TOKEN=your_github_pat
GITHUB_REPO_OWNER=craftbound
GITHUB_REPO_NAME=boundbot
```

### Registration & Panels
Once your environment is configured and the Vercel deployment URL is set as your **Interactions Endpoint** in the Discord Developer Portal:

1. **Push Slash Commands globally:**
   ```bash
   npm run register
   ```
2. **Deploy the Role Request Panel to a channel:**
   ```bash
   export ROLE_REQUEST_CHANNEL_ID="123456789012345678"
   npx tsx scripts/deploy-panel.ts
   ```

---

## 🏗️ Development

```bash
# Install dependencies
npm install

# Check TypeScript strictness
npm run build

# Run local development server (requires tunneling like ngrok to receive Discord webhooks)
npm run dev
```

> **Note on Vercel Commits:** The included `vercel.json` utilizes `git diff` to intentionally ignore build triggers originating purely from memory updates in the `data/` directory, saving your build minutes!

---

*For Craftbound MC — Built with ☕, Next.js, and TypeScript.*
