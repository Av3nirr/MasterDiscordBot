const { Interaction, Client, MessageEmbed } = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
const handleButton = async (client, interaction) => {
    const bouton = require(`../buttons/${interaction.customId}`)
    try {
        await bouton.execute(client, interaction)
    } catch (error) {
        console.error(error)
        const embed = new MessageEmbed()
            .setTitle("Erreur !")
            .setColor("#ff0000")
            .setDescription("Une erreur s'est produite lors de l'intéraction avec les boutons !")
            .setFooter({
                text: 'L\'erreur s\'est affichée dans votre console, pour toute aide veuillez nous recontacter !'})
        await interaction.reply({embeds: [embed], ephemeral:true})
    }

}

module.exports = handleButton;