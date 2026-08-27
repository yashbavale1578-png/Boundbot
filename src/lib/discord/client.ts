import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";

export const getDiscordClient = () => {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    throw new Error("DISCORD_TOKEN_MISSING");
  }
  const rest = new REST({ version: "10" }).setToken(token);
  return new API(rest);
};
