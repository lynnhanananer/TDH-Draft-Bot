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
 * command name: getdivison
 * category: ranking
 * description: Gets the ratings and rankings of a single division
 * options: select from divisions
 * response: returns formatted message with the ratings and rankings of a single division
 */
module.exports = {
    cooldown: 5,
    requiredRole: 'matchmaker',
    category: 'matchmaking',
    data: new SlashCommandBuilder()
        .setName('creatematches')
        .setDescription('Creates this weeks matches')
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

        // TODO: add an api call to verify matches are completed
        const matchesCompleted = true;

        if (matchesCompleted) {
            const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Create matches?')
                .setStyle(ButtonStyle.Primary)

            const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Secondary)
            const row = new ActionRowBuilder().addComponents(confirm, cancel)

            const response = await interaction.followUp({
                content: 'Create this weeks matches?',
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
                        content: 'Creating matches...',
                        ephemeral: true,
                        components: [],
                    })

                    // TODO: add the sheets API call to create the matches for the current week

                    await interaction.followUp({
                        content: 'Matches created.',
                        ephemeral: true,
                    })
                    await interaction.followUp({
                        content: 'TODO: output matches for each division',
                        ephemeral: true,
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
                await interaction.editReply({
                    content:
                        'Confirmation not received within 1 minute, cancelling',
                    components: [],
                    ephemeral: globalEphemeral ?? true,
                })
            }
        } else {
            await interaction.followUp({ ephemeral: globalEphemeral ?? true , content: 'The current matches have not been completed.\nRun **/completematches** command to complete the matches'})
        }
    },
}
