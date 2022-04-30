const { SlashCommandBuilder} = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');
const { footer } = require('../config.json');

module.exports = {
    data: 
    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Commande /ping !'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        var ping = interaction.client.ws.ping
        if (ping > 100){
            color = "#e9aa16"
        }
        if (ping < 100){
            color = "#00ff39"
        }
        if (ping > 150){
            color = "#ff0000"
        }
        const embed = new MessageEmbed()
            .setTitle("Pong !")
            .setColor(color)
            .setDescription("Mon ping est de: **" + ping + "ms**")
            .setFooter({
                text: footer
            })
            .setTimestamp()
        await interaction.reply({embeds: [embed]})
    }

}