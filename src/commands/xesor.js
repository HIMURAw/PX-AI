const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xesor")
    .setDescription("Yapay zekaya soru sorar")
    .addStringOption(option =>
      option.setName("soru")
        .setDescription("AI'ya sormak istediğiniz şey")
        .setRequired(true)
    ),

  async execute(interaction) {
    const input = interaction.options.getString("soru");
    
    await interaction.deferReply();
    
    await interaction.editReply("🧠 Yapay zeka yazıyor, lütfen bekleyin...");

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: "llama3",
        prompt: input,
        stream: false
      });

      const output = response.data.response;
      await interaction.editReply({ content: `**Soru:** ${input}\n\n**Yanıt:**\n${output}` });
    } catch (error) {
      console.error("Ollama poku yedi:", error.message);
      await interaction.editReply({ content: "❌ Yapay zekadan yanıt alınamadı" });
    }
  },
};