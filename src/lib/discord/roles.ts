import { Routes, APIRole } from "discord-api-types/v10";
import { getDiscordClient } from "./client";

export const fetchGuildRoles = async (guildId: string): Promise<APIRole[]> => {
  const api = getDiscordClient();
  return await api.get(Routes.guildRoles(guildId)) as APIRole[];
};

export const createGuildRole = async (guildId: string, name: string, color?: number) => {
  const api = getDiscordClient();
  return await api.post(Routes.guildRoles(guildId), {
    body: {
      name,
      ...(color !== undefined ? { color } : {})
    }
  });
};

export const editGuildRole = async (guildId: string, roleId: string, name?: string, color?: number) => {
  const api = getDiscordClient();
  return await api.patch(Routes.guildRole(guildId, roleId), {
    body: {
      ...(name !== undefined ? { name } : {}),
      ...(color !== undefined ? { color } : {})
    }
  });
};

export const deleteGuildRole = async (guildId: string, roleId: string) => {
  const api = getDiscordClient();
  await api.delete(Routes.guildRole(guildId, roleId));
};

export const assignRoleToMember = async (
  guildId: string,
  userId: string,
  roleId: string,
  reason?: string
) => {
  const api = getDiscordClient();
  await api.put(Routes.guildMemberRole(guildId, userId, roleId), {
    auth: true,
    reason
  });
};

export const removeRoleFromMember = async (
  guildId: string,
  userId: string,
  roleId: string,
  reason?: string
) => {
  const api = getDiscordClient();
  await api.delete(Routes.guildMemberRole(guildId, userId, roleId), {
    auth: true,
    reason
  });
};