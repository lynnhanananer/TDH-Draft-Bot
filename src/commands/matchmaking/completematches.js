const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
} = require('discord.js')
const { constants } = require('../../util/constants')
const { globalEphemeral } = require('../../../config.json')

/**
 * command name: completematches
 * category: matchmaking
 * description: Completes the matchmaking for the current week
 * options: select from divisions
 * response: returns formatted message with the updated ratings for each division or the specified division
 */
module.exports = {
    cooldown: 5,
    requiredRole: 'matchmaker',
    category: 'matchmaking',
    data: new SlashCommandBuilder()
        .setName('completematches')
        .setDescription('Completes this weeks matches')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption((option) =>
            option
                .setName('division')
                .setDescription(
                    '(Optional) Complete matches for a specific division'
                )
                .addChoices(constants.divisionMap)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: globalEphemeral ?? true });

        // TODO: verify that the matches have been created
        const matchesCreated = true;

        if (matchesCreated) {
            const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Complete matches?')
                .setStyle(ButtonStyle.Primary)

            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Secondary)
            const row = new ActionRowBuilder().addComponents(confirm, cancel)

            const response = await interaction.followUp({
                content: 'Complete this weeks matches?',
                ephemeral: globalEphemeral ?? true,
                components: [row],
            })

            const collectorFilter = (i) => i.user.id === interaction.user.id

            try {
                const confirmation = await response.awaitMessageComponent({
                    filter: collectorFilter,
                    time: 60_000,
                })

                if (confirmation.customId === 'confirm') {
                    await confirmation.update({
                        content: 'Completing matches...',
                        ephemeral: globalEphemeral ?? true,
                        components: [],
                    })

                    // TODO: add sheets API call to complete matches

                    await interaction.followUp({
                        content: 'Matches completed.',
                        ephemeral: globalEphemeral ?? true,
                    })
                    await interaction.followUp({
                        content:
                            'TODO: output each divisions new rankings and player ratings',
                        ephemeral: globalEphemeral ?? true,
                    })
                }
                if (confirmation.customId === 'cancel') {
                    await confirmation.update({
                        content: 'Cancelled',
                        ephemeral: globalEphemeral ?? true,
                        components: [],
                    })
                }
            } catch (e) {
                console.log(e)
                await interaction.editReply({
                    content:
                        'Confirmation not received within 1 minute, cancelling',
                    components: [],
                    ephemeral: globalEphemeral ?? true,
                })
            }
        }
        else {
            await interaction.followUp({ ephemeral: globalEphemeral ?? true , content: 'The current matches have not been created.\nRun **/creatematches** command to create the matches'})
        }
    },
}
