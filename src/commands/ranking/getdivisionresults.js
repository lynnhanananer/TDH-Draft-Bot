const { SlashCommandBuilder } = require('discord.js')

/**
 * command name: getdivisionresults
 * category: ranking
 * description: Displays the ratings and rankings of all divisions
 * response: returns formatted message with the ratings and rankings of all divisions
 * ephemeral: false
 */
module.exports = {
    cooldown: 5,
    category: 'ranking',
    data: new SlashCommandBuilder()
        .setName('getdivisionresults')
        .setDescription('Gets the ratings and rankings of all the divisions'),
    async execute(interaction) {
        await interaction.reply(
            'Returns formatted message with the ratings and rankings of all divisions'
        )
        const message = await interaction.fetchReply()
    },
}
