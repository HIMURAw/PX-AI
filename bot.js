const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.js');
const fs = require('node:fs');
const path = require('node:path');

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

const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[UYARI] ${filePath} dosyasındaki komut, gerekli "data" veya "execute" özelliklerinden birine sahip değil.`);
    }
}
// eventhandler yazmadım buraya yazdım 
client.once('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı ve bot hazır!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return; // ya butonsa

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction); // bu çalışmazsa doğru hatırlıyorsam çokküyordı
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Bu komutu çalıştırırken bir hata oluştu!', ephemeral: true });
    }
});

client.login(config.TOKEN)
    .catch(err => console.error(' neyi başaramadın:', err));