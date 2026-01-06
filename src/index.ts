import {
    Client,
    Events,
    GatewayIntentBits,
    SlashCommandBuilder,
    Partials,
    REST,
    Routes,
    Collection
} from "discord.js";
import type { SlashCommand } from "./types";
import { join } from "path";
import { readdirSync } from "fs";
import dotenv from "dotenv";
import express from "express";
import { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, CHANNEL_ID, ROLE_ID, PORT } from "./config";
dotenv.config();
import testCommand from "./slashCommands/ping";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});
client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.tag}`);
});
console.log("jweqioweqeqww");

const slashCommands = new Collection<string, SlashCommand>()
slashCommands.set(testCommand.command.name, testCommand)
const slashCommandsArr: SlashCommandBuilder[] = [testCommand.command]

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: slashCommandsArr.map(command => command.toJSON())
}).then((data: any) => {
    console.log(`🔥 Successfully loaded ${data.length} slash command(s)`)
}).catch(e => {
    console.log(e)
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = slashCommands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

const app = express();
app.use(express.json());

app.post('/roblox-event', (req, res) => {
    const data = req.body;
    console.log('Received Roblox event:', data);

    // Assuming the data has an 'event' fie
    if (data.event === "help") {
    const channel = client.channels.cache.get(CHANNEL_ID);

    if (channel && channel.isTextBased()) {
        const playerName = data.data?.player ?? "Unknown player";
        const message = data.data?.message ?? "Needs help";

        channel.send(
            `<@&${ROLE_ID}> **Help request in Roblox**\n` +
            `👤 Player: **${playerName}**\n` +
            `💬 Message: ${message}`
        );
    }
}


    res.status(200).send('Event received');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

client
    .login(DISCORD_TOKEN)
    .catch((error) => console.error("Discord.Client.Login.Error", error));