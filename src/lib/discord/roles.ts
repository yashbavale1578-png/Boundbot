import { getDiscordClient } from "./client";

export const fetchGuildRoles = async (guildId: string) => {
  const api = getDiscordClient();
  return await api.guilds.getRoles(guildId);
};

export const createGuildRole = async (guildId: string, name: string, color?: number) => {
  const api = getDiscordClient();
  return await api.guilds.createRole(guildId, {
    name,
    color
  });
};

export const editGuildRole = async (guildId: string, roleId: string, name?: string, color?: number) => {
  const api = getDiscordClient();
  return await api.guilds.editRole(guildId, roleId, {
    name,
    color
  });
};

export const deleteGuildRole = async (guildId: string, roleId: string) => {
  const api = getDiscordClient();
  await api.guilds.deleteRole(guildId, roleId);
};

export const assignRoleToMember = async (guildId: string, userId: string, roleId: string, reason?: string) => {
  const api = getDiscordClient();
  await api.guilds.addRoleToMember(guildId, userId, roleId, { reason });
};

export const removeRoleFromMember = async (guildId: string, userId: string, roleId: string, reason?: string) => {
  const api = getDiscordClient();
  await api.guilds.removeRoleFromMember(guildId, userId, roleId, { reason });
};
