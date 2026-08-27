import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";

const deployPanel = async () => {
  const token = process.env.DISCORD_TOKEN;
  const channelId = process.env.ROLE_REQUEST_CHANNEL_ID;
  
  if (!token || !channelId) {
    throw new Error("MISSING_CREDENTIALS_OR_CHANNEL");
  }
  
  const rest = new REST({ version: "10" }).setToken(token);
  const api = new API(rest);
  
  try {
    await api.channels.createMessage(channelId, {
      content: "Craftbound MC\nRole Requests\n\nSelect a role you would like to request.\n\nEvery role request requires staff approval.",
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: "role_request_select",
              options: [
                { label: "Builder", value: "Builder", description: "Request the Builder role" },
                { label: "Redstoner", value: "Redstoner", description: "Request the Redstoner role" },
                { label: "Farmer", value: "Farmer", description: "Request the Farmer role" },
                { label: "Explorer", value: "Explorer", description: "Request the Explorer role" },
                { label: "PvPer", value: "PvPer", description: "Request the PvPer role" }
              ],
              placeholder: "Select Role ▼"
            }
          ]
        }
      ]
    });
  } catch (error) {
    throw error;
  }
};

deployPanel();
