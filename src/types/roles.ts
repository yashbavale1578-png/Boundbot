export type RoleRequestStatus = "PENDING" | "APPROVED" | "DENIED" | "CANCELLED";

export interface RoleRequest {
  id: string;
  guildId: string;
  memberId: string;
  roleId: string;
  status: RoleRequestStatus;
  createdAt: number;
  processedAt?: number;
  processedBy?: string;
  denialReason?: string;
}

export interface ProtectedRole {
  id: string;
  name: string;
}

export interface CraftboundRole {
  id: string;
  name: string;
  color?: number;
  position?: number;
}
