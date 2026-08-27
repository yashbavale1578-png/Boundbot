# Security Policy

## Supported Versions

Currently, Boundbot is maintained as a rolling-release internal project for Craftbound MC. We actively support and patch the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |

## Security Architecture

Boundbot is fundamentally designed around **Zero Trust** regarding Artificial Intelligence outputs.

1. **AI is Not the Authority:** The OpenRouter LLM integration operates strictly as an intelligence/translation layer. It parses natural language into JSON tool requests.
2. **Capability Verification:** Every single tool execution request triggered by the AI is intercepted by `src/lib/ai/executor.ts`. The backend forces a hard check against the requesting user's explicit capabilities (`hasCapability`) before proceeding. 
3. **Discord Hierarchy Protection:** Actions modifying roles are cross-referenced with `canModifyRole()`, ensuring Boundbot respects Discord's native role positioning and custom Protected Roles configurations. The AI cannot bypass this.
4. **Stateless Interactions:** Boundbot uses Ed25519 signature validation (`discord-interactions`) to cryptographically guarantee that incoming webhooks are strictly authorized requests originating directly from Discord's servers.

## Reporting a Vulnerability

If you discover a security vulnerability—particularly regarding authorization bypasses, capability elevations, or unprotected role modifications—please do not report it via public GitHub Issues.

Instead, confidentially contact the Craftbound MC Ownership team directly via Discord DMs or email the repository maintainer. 

We will acknowledge receipt of your vulnerability report within 48 hours and work with you to patch the capability leak before pushing the mitigation to the production Vercel environment.
