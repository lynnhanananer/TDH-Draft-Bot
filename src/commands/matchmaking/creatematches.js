const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
} = require('discord.js')
const { constants } = require('../../util/constants')
const wait = require('node:timers/promises').setTimeout

/**
 * command name: getdivison
 * category: ranking
 * description: Gets the ratings and rankings of a single division
 * options: select from divisions
 * response: returns formatted message with the ratings and rankings of a single division
 */
module.exports = {
    cooldown: 5,
    category: 'matchmaking',
    data: new SlashCommandBuilder()
        .setName('creatematches')
        .setDescription('Creates this weeks matches')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption((option) =>
            option
                .setName('division')
                .setDescription('The division')
                .addChoices(constants.divisionMap)
        ),
    async execute(interaction) {
        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm Matchmaking')
            .setStyle(ButtonStyle.Primary)
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cnacel')
            .setStyle(ButtonStyle.Secondary)
        const row = new ActionRowBuilder().addComponents(confirm, cancel)

        const response = await interaction.reply({
            content: 'Create this weeks matches?',
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
                    components: [],
                })
                // await wait(4_000);
                await interaction.followUp('Matches created. Creating rooms...')
                try {
                    await interaction.guild.channels.create({
                        name: 'new-channel',
                    })
                    // await wait(4_000);
                    await interaction.followUp(
                        'Rooms created. Pinging users in each room...'
                    )
                } catch (e) {
                    console.log(e)
                    await interaction.followUp('Unable to create rooms')
                }
            }
        } catch (e) {
            await interaction.editReply({
                content:
                    'Confirmation not received within 1 minute, cancelling',
                components: [],
            })
        }
    },
}
