
const { SlashCommandBuilder} = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, Permissions } = require('discord.js');
const { footer, clientId, guildId } = require('../config.json');
const bdd = require("../bdd.json")
const fs = require('fs')

module.exports = {
    data: 
    new SlashCommandBuilder()
    .setName('captcha')
    .setDescription('Initialiser le captcha')
    .addRoleOption(option => {
        return option
            .setName('role')
            .setDescription('Role ajouté une fois que le captcha est validé !')
            .setRequired(true)
    })  
    .addChannelOption(option => {
        return option
            .setName('channel')
            .setDescription('Channel de vérification pour le captcha !')
            .setRequired(true)
    }),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        function Savebdd() {
            fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
                if (err) channel.send("Une erreur est survenue.");
            });
        }
        const denyembed = new MessageEmbed()
                .setTitle("Erreur !")
                .setColor("RED")
                .setDescription("Tu n'as pas la permission !")
                .setFooter({
                    text: footer
                })
                .setTimestamp()
        if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
            const role = interaction.options.getRole('role');
            const channel = interaction.options.getChannel('channel');
            const valide = new MessageEmbed()
                .setTitle("Bien joué")
                .setColor("GREEN")
                .setDescription(`Le captcha à été initialisé dans le channel ${channel}, avec le role ${role} !`)
                .setFooter({
                    text: footer
                })
                .setTimestamp()
            bdd["captcharole"] = role.id
            Savebdd()
            bdd["captchachannel"] = channel.id
            Savebdd()
            interaction.reply({embeds: [valide]})
        
        }else{
            interaction.reply({embeds: [denyembed]})
        }
    }

}
