import { verifyKey } from "discord-interactions";

export const verifyDiscordRequest = async (req: Request) => {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  
  if (!signature || !timestamp) {
    return false;
  }
  
  const rawBody = await req.clone().text();
  const publicKey = process.env.DISCORD_PUBLIC_KEY;
  
  if (!publicKey) {
    throw new Error("DISCORD_PUBLIC_KEY_MISSING");
  }
  
  return verifyKey(rawBody, signature, timestamp, publicKey);
};
