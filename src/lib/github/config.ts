import { BotMemory, GuildConfig } from "@/types/memory";
import { readJsonFile, writeJsonFile } from "./store";

const MEMORY_FILE_PATH = "data/memory.json";

const DEFAULT_CONFIG: GuildConfig = {
  ownerId: "",
  trustedModerators: [],
  protectedRoles: [],
  botRoleId: ""
};

const DEFAULT_MEMORY: BotMemory = {
  config: DEFAULT_CONFIG,
  decisions: []
};

export const getMemory = async (): Promise<BotMemory> => {
  const { data } = await readJsonFile<BotMemory>(MEMORY_FILE_PATH);
  if (!data) {
    return DEFAULT_MEMORY;
  }
  return data;
};

export const saveMemory = async (memory: BotMemory, message: string): Promise<void> => {
  const { sha } = await readJsonFile<BotMemory>(MEMORY_FILE_PATH);
  await writeJsonFile<BotMemory>(MEMORY_FILE_PATH, memory, message, sha);
};

export const getGuildConfig = async (): Promise<GuildConfig> => {
  const memory = await getMemory();
  return memory.config;
};

export const updateGuildConfig = async (updater: (config: GuildConfig) => GuildConfig, message: string): Promise<void> => {
  const memory = await getMemory();
  memory.config = updater(memory.config);
  await saveMemory(memory, message);
};
