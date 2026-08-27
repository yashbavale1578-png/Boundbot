import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

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

  await rest.put(Routes.applicationCommands(clientId), {
    body: commands
  });
};

register();