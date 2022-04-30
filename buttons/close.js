const { ButtonInteraction, MessageEmbed, Permissions } = require('discord.js');
const bdd = require('../bdd.json')
const { footer } = require('../config.json');
module.exports = {
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(client, interaction) {
        const user_ticket_owner_id = bdd["ticket-channel-user-id"][interaction.message.channelId]
        const denyembed = new MessageEmbed()
                .setTitle("Erreur !")
                .setColor("RED")
                .setDescription("Tu n'as pas la permission !")
                .setFooter({
                    text: footer
                })
                .setTimestamp()
        if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)){
            
            const valide = new MessageEmbed()
                .setTitle("Bien joué")
                .setColor("GREEN")
                .setDescription("L'utilisateur <@" + user_ticket_owner_id + "> ne peut plus accèder au ticket !")
                .setFooter({
                    text: footer
                })
                .setTimestamp()
            interaction.channel.permissionOverwrites.edit(user_ticket_owner_id, { VIEW_CHANNEL: false });
            interaction.reply({embeds: [valide]})
        }else{
            interaction.reply({embeds: [denyembed]})
        }
    }

}