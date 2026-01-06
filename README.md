---
title: Discord Bot Typescript
description: A Discord bot written in Typescript
tags:
  - discord.js
  - typescript
  - javascript
---

# Discord.ts Example

This example starts a Discord bot using [discord.js](https://discord.js.org/#/).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/EWKFBX?referralCode=8A6l-m)

## ✨ Features

- Discord.js
- TypeScript
- Live-reload development
- Roblox integration: Receive events from Roblox and ping roles in Discord

## 💁‍♀️ How to use

- Install dependencies `npm install`
- Set up environment variables (see below)
- Connect to your Railway project `railway link`
- Start the bot `railway run npm start`

## Environment Variables

Create a `.env` file or set in Railway:

- `DISCORD_TOKEN`: Your Discord bot token
- `CLIENT_ID`: Your Discord application client ID
- `GUILD_ID`: Your Discord server (guild) ID
- `CHANNEL_ID`: The ID of the channel to send notifications to
- `ROLE_ID`: The ID of the role to ping when an event occurs
- `PORT`: Port for the HTTP server (default 3000)

## Roblox Integration

The bot runs an HTTP server that listens for POST requests at `/roblox-event`.

Send JSON data like:

```json
{
  "event": "certain_thing",
  "data": { ... }
}
```

When `event` is "certain_thing", it will ping the role in the specified channel.

In your Roblox game, use HttpService to POST to your bot's URL.

## 📝 Notes

- To create a new command, just create a file in the `Commands` directory. You can take a look at the `Template.js` file for an example of what commands should look like. For any additional help see the [discord.js guide](https://discordjs.guide).
- If you need any additional help with this, join our [Discord server](https://discord.gg/railway) and create a thread in the project help channel.