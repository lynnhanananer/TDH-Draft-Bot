const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout
const { getMemberDivision } = require('../../util/memberUtils')
const { constants } = require('../../util/constants')

/**
 * command name: getdivison
 * category: ranking
 * description: Gets the ratings and rankings of a single division
 * options: select from list of divisions
 * response: returns formatted message with the ratings and rankings of a single division
 * ephemeral: true
 * localizeResponse: true
 */
module.exports = {
    cooldown: 5,
    category: 'ranking',
    data: new SlashCommandBuilder()
        .setName('getdivision')
        .setDescription('Gets the ratings and rankings of a single division')
        .addStringOption((option) =>
            option
                .setName('division')
                .setDescription('The division')
                .addChoices(constants.divisionMap)
        ),
    async execute(interaction) {
        const division =
            interaction.options.getString('division') ??
            getMemberDivision(interaction.member)
        await interaction.deferReply({ ephemeral: true })
        await wait(4_000)
        await interaction.editReply({
            content: `Returns formatted message with the ratings and rankings of a single division: ${division}`,
            ephemeral: true,
        })
    },
}
