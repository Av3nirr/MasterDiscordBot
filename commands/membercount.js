const { SlashCommandBuilder} = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, Permissions } = require('discord.js');
const { footer } = require('../config.json');

module.exports = {
    data: 
    new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Compter le nombre de membres')
    .addRoleOption(option => {
        return(option)
            .setName('role')
            .setDescription('Précisez un role pour compter le nombre de membres le possédant.')
            .setRequired(false)
    }),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
            const members = interaction.guild.members.cache.filter(members => !members.user.bot).size
            const bots = interaction.guild.members.cache.filter(members => members.user.bot).size
            const role = interaction.options.getRole('role');
            if (!role){
                const embed = new MessageEmbed()
                        .setTitle("Comptage des Membres")
                        .setColor("GREEN")
                        .setDescription(`Il y a ${interaction.guild.memberCount} membres au total, dont ${bots} bots et ${members} membres !`)
                        .setFooter({
                            text: footer
                        })
                        .setTimestamp()
                interaction.reply({embeds: [embed]})
            
            }else{
                const embed = new MessageEmbed()
                        .setTitle("Comptage des Membres")
                        .setColor("GREEN")
                        .setDescription(`Il y a ${role.members.size} membres possédants le role ${role}!`)
                        .setFooter({
                            text: footer
                        })
                        .setTimestamp()
                interaction.reply({embeds: [embed]})
            }
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
