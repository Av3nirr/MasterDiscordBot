const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */

const handleCommand = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return;

    try {
        await command.execute(interaction, client)
    } catch (error) {
        console.error(error)
        const embed = new MessageEmbed()
            .setTitle("Erreur !")
            .setColor("#ff0000")
            .setDescription("Une erreur s'est produite !")
        await interaction.reply({embeds: [embed]})
    }

}

module.exports = handleCommand;