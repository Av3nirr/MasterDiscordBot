const { SlashCommandBuilder} = require('@discordjs/builders');
const { Interaction, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { footer } = require('../config.json');

module.exports = {
    data: 
    new SlashCommandBuilder()
    .setName('ticket_intit')
    .setDescription('Initialiser le ticket !')
    .addChannelOption(option => {
        return option
          .setName('channel')
          .setDescription('Channel de création de tickets')
          .setRequired(true)
    }),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)){
            const channel = interaction.options.getChannel('channel');
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('create')
                        .setLabel('Créer un ticket')
                        .setEmoji('📩')
                        .setStyle('PRIMARY'),
            );
            const embed = new MessageEmbed()
                .setTitle("Créer un ticket")
                .setColor("BLUE")
                .setDescription("Vous pouvez crééer un ticket pour plusieurs raisons:\n**Pour contacter le staff a propos d'un bug, ou d'un suggestions d'ajout**\n\n**Faire une candidature pour rentrer dans le staff**\n(Nous nous laissons un délai de réponse de 1 semaine)\n\nVoici les __**seuls**__ raisons pour crééer un ticket, tout abus sera sanctionné !")
                .setFooter({
                    text: footer
                })
                .setTimestamp()
            await interaction.reply('Initialisé !')
            await channel.send({embeds: [embed], components: [row]})
        }else{
            const denyembed = new MessageEmbed()
                .setTitle("Erreur !")
                .setColor("RED")
                .setDescription("Tu n'as pas la permission !")
                .setFooter({
                    text: footer
                })
                .setTimestamp()
            interaction.reply({embeds: [denyembed]})
        }
    }

}