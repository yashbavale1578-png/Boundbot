import React from "react";

export default function TermsOfService() {
  return (
    <article>
      <h1>Terms of Service</h1>
      <p><strong>Effective Date:</strong> August 27, 2026</p>

      <h2>1. Acceptance</h2>
      <p>By using, communicating with, or otherwise interacting with Boundbot in the Craftbound MC Discord server, you agree to be bound by these Terms of Service. If you do not agree, you may not interact with Boundbot.</p>

      <h2>2. Service Description</h2>
      <p>Boundbot is a custom Discord role-management bot. It provides an AI-powered administration assistant interface for authorized staff and a persistent role request system where community members can apply for roles subject to manual staff approval.</p>

      <h2>3. Authorization</h2>
      <p>Boundbot operates on a strict, capability-based permission model:</p>
      <ul>
        <li><strong>Owner:</strong> Possesses full capabilities over Boundbot, subject to Discord&#39;s API and role hierarchy limitations.</li>
        <li><strong>Trusted Moderators:</strong> May access the private AI interface, but possess explicitly limited, configured capabilities.</li>
        <li><strong>Normal Moderators:</strong> Do not automatically receive access to the AI interface.</li>
        <li><strong>Members:</strong> Cannot access the private AI administration interface.</li>
      </ul>
      <p>Permissions are programmatically enforced by Boundbot&#39;s backend layer and Discord&#39;s native hierarchy, not by AI interpretation alone.</p>

      <h2>4. Staff Responsibility</h2>
      <p>Server administrators and authorized staff are solely responsible for:</p>
      <ul>
        <li>Configuring Boundbot securely and accurately.</li>
        <li>Reviewing and validating all member role requests.</li>
        <li>Managing Trusted Moderator assignments.</li>
        <li>Protecting their Discord account credentials.</li>
        <li>Reviewing and confirming AI-generated administrative actions before or immediately after execution.</li>
      </ul>

      <h2>5. AI Disclaimer</h2>
      <p>Boundbot utilizes Artificial Intelligence (NVIDIA Nemotron 3.5 Lightning via OpenRouter) to interpret natural language requests from authorized staff. <strong>AI output can be incorrect, hallucinatory, or misinterpreted.</strong> The AI does not independently determine authorization. The backend capability checks remain strictly authoritative. Staff are strictly responsible for reviewing any potentially destructive actions suggested or executed by the AI.</p>

      <h2>6. Role Requests</h2>
      <p>Community members may request eligible roles via Boundbot&#39;s interactive panels. Every role assignment requires staff approval. Submitting a request does not guarantee approval. Authorized staff reserve the right to approve, deny, or ignore requests at their sole discretion.</p>

      <h2>7. Prohibited Use</h2>
      <p>You agree not to engage in misuse of Boundbot, including but not limited to:</p>
      <ul>
        <li>Attempting to bypass Boundbot permissions or backend authorizations.</li>
        <li>Attempting to gain unauthorized access to the AI administration interface.</li>
        <li>Attempting to exploit vulnerabilities or extract repository secrets.</li>
        <li>Attempting to manipulate the Discord role hierarchy.</li>
        <li>Using Boundbot to violate Discord&#39;s Terms of Service or to harass other users.</li>
      </ul>

      <h2>8. Availability</h2>
      <p>Boundbot is provided on an &quot;as-available&quot; basis. We do not guarantee uninterrupted availability. The service may experience downtime due to maintenance, network failures, or outages from our upstream providers including Discord, OpenRouter, GitHub, and Vercel.</p>

      <h2>9. Third-Party Services</h2>
      <p>Boundbot relies on external third-party services to function. Your interactions with Boundbot are also subject to the respective terms and privacy policies of:</p>
      <ul>
        <li><strong>Discord:</strong> The platform hosting the server and UI.</li>
        <li><strong>OpenRouter:</strong> The LLM aggregator routing AI requests.</li>
        <li><strong>GitHub:</strong> The storage provider persisting Boundbot&#39;s configuration memory.</li>
        <li><strong>Vercel:</strong> The serverless hosting infrastructure executing Boundbot&#39;s logic.</li>
      </ul>

      <h2>10. Intellectual Property</h2>
      <p>Boundbot&#39;s original software and source code are licensed under the MIT License (Copyright &copy; 2026 Yash Bavale). All third-party trademarks, service marks, and logos (such as Discord, GitHub, and OpenRouter) are the property of their respective owners.</p>

      <h2>11. Disclaimer of Warranties</h2>
      <p>BOUNDBOT IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.</p>

      <h2>12. Limitation of Liability</h2>
      <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE OPERATORS OF BOUNDBOT OR CRAFTBOUND MC BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE BOUNDBOT.</p>

      <h2>13. Termination</h2>
      <p>We reserve the right to restrict, suspend, or terminate access to Boundbot at any time, without notice, for abuse, unauthorized access attempts, violation of these Terms, violation of Discord rules, or if the service is discontinued entirely.</p>

      <h2>14. Governing Law</h2>
      <p><strong>[GOVERNING LAW / JURISDICTION TO BE COMPLETED BY OPERATOR]</strong></p>

      <h2>15. Contact</h2>
      <p>If you have any questions regarding these Terms, please contact us at:</p>
      <p><strong>[SUPPORT CONTACT EMAIL]</strong></p>
    </article>
  );
}
