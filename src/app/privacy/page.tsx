import React from "react";

export default function PrivacyPolicy() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> August 27, 2026</p>
      
      <h2>1. Who Boundbot Is</h2>
      <p><strong>Boundbot</strong> is an AI-powered Discord role-management bot built exclusively for the <strong>Craftbound MC</strong> community.</p>

      <h2>2. Information Boundbot Processes</h2>
      <p>Boundbot processes minimal data required for role management and backend authorization. Specifically, we process and store:</p>
      <ul>
        <li><strong>Discord Identifiers:</strong> User IDs, Guild (Server) IDs, and Role IDs.</li>
        <li><strong>Role Requests:</strong> Role selections, request timestamps, staff approval/denial history, and processing timestamps.</li>
        <li><strong>Authorization Data:</strong> Trusted moderator configurations and capability assignments.</li>
        <li><strong>AI Context:</strong> Conversation prompts generated exclusively by authorized staff, as well as AI-generated tool execution requests.</li>
        <li><strong>System Records:</strong> JSON configuration data and short-term audit history necessary for operational integrity.</li>
      </ul>

      <h2>3. AI Processing</h2>
      <p>Boundbot integrates a private Artificial Intelligence administration interface. <strong>Ordinary members cannot access or use this AI interface.</strong> Only the Server Owner and explicitly designated Trusted Moderators have access.</p>
      <p>When an authorized staff member submits a command, their natural language prompt, along with context about available roles, is transmitted to <strong>OpenRouter</strong> for processing. This allows the AI to determine which administrative tool to use (e.g., approving a request or creating a role). The AI acts purely as an interpreter; every action it suggests is strictly validated by Boundbot&#39;s internal backend before any Discord changes occur.</p>

      <h2>4. GitHub Storage</h2>
      <p>To ensure persistent and reliable operation without a traditional database, Boundbot utilizes GitHub as a version-controlled persistence mechanism. The following data is securely written to private JSON files on GitHub:</p>
      <ul>
        <li>Active bot configuration and Protected Roles lists.</li>
        <li>Trusted moderator capability matrices.</li>
        <li>Role request states (Pending, Approved, Denied).</li>
        <li>Limited AI decision memory.</li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>Boundbot does not currently implement an automated data deletion cycle. Data written to our GitHub-backed storage (such as pending or resolved role requests, and trusted moderator configurations) is retained indefinitely to maintain server history and configuration integrity. Temporary processing data generated during Discord HTTP interactions is discarded immediately after the interaction concludes.</p>

      <h2>6. Data Sharing</h2>
      <p>Boundbot does not sell personal data. Data is only shared with essential third-party service providers required for the bot to function:</p>
      <ul>
        <li><strong>Discord:</strong> To receive interactions, verify identities, and modify roles.</li>
        <li><strong>OpenRouter:</strong> To process administrative natural language prompts from authorized staff.</li>
        <li><strong>GitHub:</strong> To persist JSON configuration and memory securely.</li>
        <li><strong>Vercel:</strong> To host the serverless HTTP endpoint and compute infrastructure.</li>
      </ul>

      <h2>7. Security</h2>
      <p>Boundbot implements strict backend security measures to protect server integrity:</p>
      <ul>
        <li><strong>Capability-Based Permissions:</strong> Access to commands is strictly explicitly granted.</li>
        <li><strong>Role Hierarchy Protection:</strong> The backend programmatically prevents modifications to protected roles or roles above the bot&#39;s position.</li>
        <li><strong>Zero-Trust AI:</strong> The AI cannot independently bypass backend authorization checks.</li>
        <li><strong>Cryptographic Verification:</strong> All incoming requests are verified using Discord Ed25519 signatures.</li>
      </ul>

      <h2>8. User Rights</h2>
      <p>Depending on your jurisdiction (such as the GDPR in Europe or the CCPA in California), you may have the right to request access to, correction of, or deletion of the data Boundbot holds about you (primarily your Discord User ID and role request history). To exercise these rights, please contact us using the information below.</p>

      <h2>9. Children&#39;s Privacy</h2>
      <p>Boundbot relies on Discord&#39;s platform requirements, which mandate users be at least 13 years of age (or older, depending on local law). Boundbot does not knowingly collect additional information specifically from children. If we become aware that we have collected information from a child in violation of applicable laws, we will take steps to delete it.</p>

      <h2>10. Policy Changes</h2>
      <p>This Privacy Policy may be updated to reflect changes in Boundbot&#39;s functionality, backend architecture, or data practices. Material changes will be communicated to the community via appropriate Craftbound MC Discord announcement channels.</p>

      <h2>11. Contact</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p><strong>[PRIVACY CONTACT EMAIL]</strong></p>
    </article>
  );
}
