const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
        await wait(4_000);
        await interaction.editReply('Pong 4s later!');
    },
};
