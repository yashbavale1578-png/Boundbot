import { Capability } from "./permissions";
import { ProtectedRole } from "./roles";

export interface TrustedModeratorConfig {
  userId: string;
  capabilities: Capability[];
}

export interface GuildConfig {
  ownerId: string;
  trustedModerators: TrustedModeratorConfig[];
  protectedRoles: ProtectedRole[];
  botRoleId: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: number;
  userId: string;
  tier: string;
  requestText?: string;
  action: string;
  toolUsed?: string;
  targetRoleId?: string;
  result: string;
  requestId?: string;
}

export interface BotMemory {
  config: GuildConfig;
  decisions: string[];
}
