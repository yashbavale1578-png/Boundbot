import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";

const commands = [
  {
    name: "admin",
    description: "Boundbot AI Administration",
    options: [
      {
        name: "prompt",
        description: "What do you want Boundbot to do?",
        type: 3,
        required: true
      }
    ]
  },
  {
    name: "requestrole",
    description: "Request a Craftbound community role"
  }
];

const register = async () => {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;
  
  if (!token || !clientId) {
    throw new Error("MISSING_CREDENTIALS");
  }
  
  const rest = new REST({ version: "10" }).setToken(token);
  const api = new API(rest);
  
  try {
    await api.applicationCommands.bulkOverwriteGlobalCommands(clientId, commands as any);
  } catch (error) {
    throw error;
  }
};

register();
