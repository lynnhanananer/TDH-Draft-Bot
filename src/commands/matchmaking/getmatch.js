const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout
const { getMemberDivision } = require('../../util/memberUtils')
const { globalEphemeral } = require('../../../config.json')
const { constants } = require('../../util/constants')

/**
 * command name: getmatch
 * category: matchmaking
 * description: Gets the match of the user the submits the match details
 * options: select a user
 * response: returns formatted message with the ratings and rankings of a single division
 * ephemeral: true
 * localizeResponse: true
 */
module.exports = {
    cooldown: 5,
    category: 'matchmaking',
    data: new SlashCommandBuilder()
        .setName('getmatch')
        .setDescription('Gets the match details for your player')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription(
                    '(Optional) Get the match for a specific player'
                )
        ),
    async execute(interaction) {
        const username =
            interaction.options.getUser('user')?.username ??
            interaction.user.username
        await interaction.reply({
            content: `Returns formatted message match for ${username}`,
            ephemeral: globalEphemeral ?? true,
        })
    },
}
