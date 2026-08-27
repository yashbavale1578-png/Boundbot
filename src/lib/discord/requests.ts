import { RoleRequest, RoleRequestStatus } from "@/types/roles";
import { readJsonFile, writeJsonFile } from "../github/store";
import { getDiscordClient } from "./client";
import { randomUUID } from "crypto";

const REQUESTS_FILE_PATH = "data/requests.json";

export const getRoleRequests = async (): Promise<RoleRequest[]> => {
  const { data } = await readJsonFile<RoleRequest[]>(REQUESTS_FILE_PATH);
  return data || [];
};

export const saveRoleRequests = async (requests: RoleRequest[], message: string): Promise<void> => {
  const { sha } = await readJsonFile<RoleRequest[]>(REQUESTS_FILE_PATH);
  await writeJsonFile<RoleRequest[]>(REQUESTS_FILE_PATH, requests, message, sha);
};

export const addRoleRequest = async (request: RoleRequest): Promise<void> => {
  const requests = await getRoleRequests();
  requests.push(request);
  await saveRoleRequests(requests, `Add role request ${request.id}`);
};

export const updateRoleRequestStatus = async (
  requestId: string,
  status: RoleRequestStatus,
  processedBy: string,
  denialReason?: string
): Promise<RoleRequest | null> => {
  const requests = await getRoleRequests();
  const index = requests.findIndex((r) => r.id === requestId);
  if (index === -1) {
    return null;
  }
  
  requests[index] = {
    ...requests[index],
    status,
    processedAt: Date.now(),
    processedBy,
    denialReason
  };
  
  await saveRoleRequests(requests, `Update role request ${requestId} to ${status}`);
  return requests[index];
};

export const handleRoleRequestSelection = async (
  interactionToken: string,
  userId: string,
  guildId: string,
  selectedRole: string
): Promise<void> => {
  const discord = getDiscordClient();
  const appId = process.env.DISCORD_CLIENT_ID;

  try {
    const newRequest: RoleRequest = {
      id: randomUUID(),
      guildId,
      memberId: userId,
      roleId: selectedRole,
      status: "PENDING",
      createdAt: Date.now()
    };

    await addRoleRequest(newRequest);

    await discord.interactions.editReply(appId!, interactionToken, {
      content: `Request submitted.\nRole: ${selectedRole}\nStatus: Pending Staff Approval`
    });
  } catch (error: any) {
    await discord.interactions.editReply(appId!, interactionToken, {
      content: `ERROR: Failed to submit role request.`
    });
  }
};
