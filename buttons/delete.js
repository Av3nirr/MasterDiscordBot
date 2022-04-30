const { ButtonInteraction, MessageEmbed, Permissions } = require('discord.js');
const bdd = require('../bdd.json')
const { footer } = require('../config.json');
module.exports = {
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(client, interaction) {
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
                .setDescription("Le channel à été supprimé !")
                .setFooter({
                    text: footer
                })
                .setTimestamp()
            interaction.channel.delete()
            try {
                interaction.user.send({embeds: [valide]})
            } catch (error) {
                console.log('je n\'ai pas réussi à envoyer le message à l\'utilisateur')
            }
        }else{
            interaction.reply({embeds: [denyembed]})
        }
    }

}