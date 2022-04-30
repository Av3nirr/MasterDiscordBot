const { SlashCommandBuilder} = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { footer } = require('../config.json');

module.exports = {
    data: 
    new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche le message d\'aide du bot !'),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle("Message d'aide")
            .setColor("RANDOM")
            .addFields(
                {name: "/help", value: "Affiche le message d'aide.", inline: false},
                {name: "/ticket_init", value: "Initialise le système de ticket.", inline: false},
                {name: "/ping", value: "Affiche la latence du bot (en ms).", inline: false},
                {name: "/captcha", value: "Configure le système de captcha.", inline: false},
                {name: "/membercount [role]", value: "Affiche le nombre de membres présents sur le serveur (Affiche le nombre de membres possédant un role si précisé).", inline: false}
            )
            .setDescription("Voici la liste des commandes disponibles:")
            .setFooter({
                text: footer
            })
            .setTimestamp()
        await interaction.reply({embeds: [embed]})
    }

}