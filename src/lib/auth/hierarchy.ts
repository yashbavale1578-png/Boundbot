import { getGuildConfig } from "../github/config";
import { fetchGuildRoles } from "../discord/roles";

export const isRoleProtected = async (roleId: string): Promise<boolean> => {
  const config = await getGuildConfig();
  return config.protectedRoles.some(r => r.id === roleId);
};

export const canModifyRole = async (guildId: string, targetRoleId: string): Promise<boolean> => {
  const protectedRole = await isRoleProtected(targetRoleId);
  if (protectedRole) {
    return false;
  }
  
  const config = await getGuildConfig();
  const botRoleId = config.botRoleId;
  if (!botRoleId) {
    return false;
  }
  
  const roles = await fetchGuildRoles(guildId);
  const botRole = roles.find(r => r.id === botRoleId);
  const targetRole = roles.find(r => r.id === targetRoleId);
  
  if (!botRole || !targetRole) {
    return false;
  }
  
  return botRole.position > targetRole.position;
};
