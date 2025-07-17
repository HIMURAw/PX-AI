const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildInvites,
    ]
});

client.commands = new Collection();

client.login(config.TOKEN)
    .then(() => console.log('Logged in successfully!'))
    .catch(err => console.error('Login failed:', err));