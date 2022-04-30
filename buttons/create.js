const { ButtonInteraction, Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const bdd = require('../bdd.json')
const fs = require('fs')
const { footer, ticket_parent, staff_role } = require('../config.json')
module.exports = {
    /**
     * 
     * @param {Client} client
     * @param {ButtonInteraction} interaction 
     */
    async execute(client, interaction) {
    const ping_user = '<@' + interaction.user.id + '>'
    const user_id = interaction.user.id
    ticket_name = interaction.user.username
    interaction.guild.channels.create('ticket-' + ticket_name, {
        type: 'GUILD_TEXT',
        parent: ticket_parent,
        permissionOverwrites: [
            {
                id: interaction.guildId,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
                id: interaction.user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
            },
            {
                id: staff_role,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
            },

        ],
    
    }).then(channel => {
        
        
        interaction.reply({content: 'Ticket créé dans <#' + channel.id + '>', ephemeral: true})
        const embed = new MessageEmbed()
            .setTitle("Création de ticket !")
            .setColor('00ff0d')
            .setDescription("Ticket de " + ping_user)
            .setFooter({
                text: footer
            })
            .setTimestamp()
        const row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('close')
					.setLabel('⛔Fermer le ticket')
					.setStyle('DANGER')
                    .setDisabled(false),
                new MessageButton()
					.setCustomId('delete')
					.setLabel('🗑 Supprimer le ticket')
					.setStyle('DANGER')
                    .setDisabled(false),		
			);
        function Savebdd() {
            fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
                if (err) channel.send("Une erreur est survenue.");
            });
        }
        bdd["ticket-channel-user-id"][channel.id] = user_id
        Savebdd()    
        channel.send({embeds: [embed], components: [row1]})
    })
}

}