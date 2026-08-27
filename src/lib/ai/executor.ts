import { hasCapability } from "../auth/capabilities";
import { canModifyRole } from "../auth/hierarchy";
import { Capability } from "@/types/permissions";
import { createGuildRole, deleteGuildRole, assignRoleToMember } from "../discord/roles";
import { updateRoleRequestStatus } from "../discord/requests";
import { getOpenRouterClient } from "./openrouter";
import { boundbotTools } from "./tools";
import { getDiscordClient } from "../discord/client";

export const executeAdminCommand = async (
  interactionToken: string,
  userId: string,
  guildId: string,
  prompt: string
): Promise<void> => {
  const openrouter = getOpenRouterClient();
  const discord = getDiscordClient();
  const appId = process.env.DISCORD_CLIENT_ID;

  try {
    const authorized = await hasCapability(userId, Capability.USE_AI);
    if (!authorized) {
      await discord.interactions.editReply(appId!, interactionToken, { content: "UNAUTHORIZED_ACCESS" });
      return;
    }

    const model = process.env.OPENROUTER_MODEL;
    if (!model) {
      throw new Error("OPENROUTER_MODEL_MISSING");
    }

    const response = await openrouter.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      tools: boundbotTools,
      tool_choice: "auto"
    });

    const message = response.choices[0].message;

    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      const toolName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);

      const result = await executeTool(userId, guildId, toolName, args);
      await discord.interactions.editReply(appId!, interactionToken, { content: `Action completed: ${result}` });
    } else {
      await discord.interactions.editReply(appId!, interactionToken, { content: message.content || "NO_ACTION_TAKEN" });
    }
  } catch (error: any) {
    await discord.interactions.editReply(appId!, interactionToken, { content: `ERROR: ${error.message}` });
  }
};

export const executeTool = async (
  userId: string,
  guildId: string,
  toolName: string,
  args: any
): Promise<string> => {
  if (toolName === "create_role") {
    const authorized = await hasCapability(userId, Capability.CREATE_COMMUNITY_ROLE);
    if (!authorized) throw new Error("UNAUTHORIZED");
    await createGuildRole(guildId, args.name, args.color);
    return "ROLE_CREATED";
  }

  if (toolName === "delete_role") {
    const authorized = await hasCapability(userId, Capability.REMOVE_COMMUNITY_ROLE);
    if (!authorized) throw new Error("UNAUTHORIZED");
    const canModify = await canModifyRole(guildId, args.roleId);
    if (!canModify) throw new Error("HIERARCHY_VIOLATION");
    await deleteGuildRole(guildId, args.roleId);
    return "ROLE_DELETED";
  }

  if (toolName === "assign_role") {
    const authorized = await hasCapability(userId, Capability.ASSIGN_APPROVED_ROLE);
    if (!authorized) throw new Error("UNAUTHORIZED");
    const canModify = await canModifyRole(guildId, args.roleId);
    if (!canModify) throw new Error("HIERARCHY_VIOLATION");
    await assignRoleToMember(guildId, args.userId, args.roleId, args.reason);
    return "ROLE_ASSIGNED";
  }

  if (toolName === "approve_request") {
    const authorized = await hasCapability(userId, Capability.APPROVE_ROLE_REQUESTS);
    if (!authorized) throw new Error("UNAUTHORIZED");
    const result = await updateRoleRequestStatus(args.requestId, "APPROVED", userId);
    if (!result) throw new Error("REQUEST_NOT_FOUND");
    await assignRoleToMember(guildId, result.memberId, result.roleId, "Approved via AI");
    return "REQUEST_APPROVED";
  }

  throw new Error("UNKNOWN_TOOL");
};
