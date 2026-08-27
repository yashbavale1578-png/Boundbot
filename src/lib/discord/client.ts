import { REST } from "@discordjs/rest";

export const getDiscordClient = () => {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    throw new Error("DISCORD_TOKEN_MISSING");
  }
  return new REST({ version: "10" }).setToken(token);
};