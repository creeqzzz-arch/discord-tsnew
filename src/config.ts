import dotenv from "dotenv";
dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const CLIENT_ID = process.env.CLIENT_ID;
export const GUILD_ID = process.env.GUILD_ID;
export const CHANNEL_ID = process.env.CHANNEL_ID;
export const ROLE_ID = process.env.ROLE_ID;
export const PORT = process.env.PORT || 3000;
