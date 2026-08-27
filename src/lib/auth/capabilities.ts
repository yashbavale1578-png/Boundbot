import { Capability, UserCapabilities } from "@/types/permissions";
import { getGuildConfig } from "../github/config";

export const getUserCapabilities = async (userId: string): Promise<UserCapabilities> => {
  const config = await getGuildConfig();
  
  if (config.ownerId === userId) {
    return {
      tier: "OWNER",
      capabilities: Object.values(Capability)
    };
  }
  
  const trustedModerator = config.trustedModerators.find(m => m.userId === userId);
  if (trustedModerator) {
    return {
      tier: "TRUSTED_MODERATOR",
      capabilities: trustedModerator.capabilities
    };
  }
  
  return {
    tier: "NONE",
    capabilities: []
  };
};

export const hasCapability = async (userId: string, capability: Capability): Promise<boolean> => {
  const caps = await getUserCapabilities(userId);
  return caps.capabilities.includes(capability);
};
