const { SlashCommandBuilder } = require('discord.js')

/**
 * command name: getrating
 * category: ranking
 * description: Gets the ELO rating and division ranking of the user the executed the command
 * options: specify the user to get the ELO rating and division
 * response: returns formatted message with the ratings and divison ranking
 * ephemeral: true
 */
module.exports = {
    cooldown: 5,
    category: 'ranking',
    data: new SlashCommandBuilder()
        .setName('getrating')
        .setDescription('Gets your ELO rating and division ranking')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The member to get the rating for')
        ),
    async execute(interaction) {
        const username =
            interaction.options.getUser('user')?.username ??
            interaction.user.username
        await interaction.reply({
            content: `Returns formatted message with elo rating and division ranking for ${username}`,
            ephemeral: true,
        })
    },
}
