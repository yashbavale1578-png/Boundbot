import { InteractionType, InteractionResponseType } from "discord-interactions";
import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { executeAdminCommand } from "@/lib/ai/executor";
import { handleRoleRequestSelection } from "@/lib/discord/requests";

export const handleInteraction = async (interaction: any) => {
  if (interaction.type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }
  
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === "admin") {
      const prompt = interaction.data.options[0].value;
      const userId = interaction.member?.user?.id || interaction.user?.id;
      const guildId = interaction.guild_id;
      
      waitUntil(executeAdminCommand(interaction.token, userId, guildId, prompt));
      
      return NextResponse.json({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
      });
    }
  }

  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    if (interaction.data.custom_id === "role_request_select") {
      const selectedRole = interaction.data.values[0];
      const userId = interaction.member?.user?.id || interaction.user?.id;
      const guildId = interaction.guild_id;
      
      waitUntil(handleRoleRequestSelection(interaction.token, userId, guildId, selectedRole));
      
      return NextResponse.json({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: 64 } 
      });
    }
  }
  
  return NextResponse.json({ error: "UNKNOWN_INTERACTION" }, { status: 400 });
};
