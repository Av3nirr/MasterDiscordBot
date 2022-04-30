//import all settings
const { token, logs_channel, footer, guildId, clientId } = require('./config.json')
const bdd = require('./bdd.json')
//import libraries
const { Client, Intents, Collection, MessageEmbed } = require('discord.js')
const fs = require('fs')
const { Captcha } = require("discord.js-captcha");

//import files and commands
const handleCommand = require('./handlers/command.js')
const handleButton = require('./handlers/buttons.js')

//create Instaces
const client = new Client({ intents: new Intents(32767)})


//registering commands
client.commands = new Collection();
const commandFIles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFIles){
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}


//handling interractions
client.on('interactionCreate', interaction => {
	if (interaction.isCommand()) handleCommand(client, interaction);
	if (interaction.isButton()) handleButton(client, interaction)
    
})

client.once('ready', async () => {
    console.info(`Bot connécté en tant que ${client.user.tag} !`)
})

//logs
client.on("guildMemberAdd", async member => {
    const role = bdd["captcharole"]
    const channel = bdd["captchachannel"]
    const captcha = new Captcha(client, {
        guildID: guildId,
        roleID: role, //optional
        channelID: channel, //optional
        sendToTextChannel: true, //optional, defaults to false
        addRoleOnSuccess: true, //optional, defaults to true. whether you want the bot to add the role to the user if the captcha is solved
        kickOnFailure: true, //optional, defaults to true. whether you want the bot to kick the user if the captcha is failed
        caseSensitive: true, //optional, defaults to true. whether you want the captcha responses to be case-sensitive
        attempts: 3, //optional, defaults to 1. number of attempts before captcha is considered to be failed
        timeout: 30000, //optional, defaults to 60000. time the user has to solve the captcha on each attempt in milliseconds
        showAttemptCount: true, //optional, defaults to true. whether to show the number of attempts left in embed footer
        customPromptEmbed: new MessageEmbed()
                            .setTitle("Captcha")
                            .setColor("GREY")
                            .setDescription("Recopier les caractères ci-dessous pour passer le test !")
                            .setFooter({
                                text: footer
                            })
                            .setTimestamp(), //customise the embed that will be sent to the user when the captcha is requested
        customSuccessEmbed: new MessageEmbed()
                            .setTitle("Captcha")
                            .setColor("GREEN")
                            .setDescription("Tu as réussi le captcha !")
                            .setFooter({
                                text: footer
                            })
                            .setTimestamp(), //customise the embed that will be sent to the user when the captcha is solved
        customFailureEmbed: new MessageEmbed()
                            .setTitle("Captcha")
                            .setColor("RED")
                            .setDescription("Tu n'as pas réussi le captcha !")
                            .setFooter({
                                text: footer
                            })
                            .setTimestamp(),
    //customise the embed that will be sent to the user when they fail to solve the captcha
    });
    try {
        captcha.present(member);
    } catch (error) {
        member.guild.channels.cache.get(logs_channel).send("Attention, le captacha n'a pas été initialisé, il est temporairement désactivé !\nPour modifier ceci faites la commande **/captcha** !")
    }
});

client.on('messageCreate', message => {
    if(message.author.bot)return;
    if(message.content.startsWith('!save')){
        if(message.type === 'REPLY'){
            var savedMessage = message.channel.messages.cache.get(message.reference.messageId)
            message.guild.channels.cache.get(logs_channel).send('Nouveau Message Sauvegardé')
            message.guild.channels.cache.get(logs_channel).send(`Message envoyé par ${savedMessage.author.username}, dans le channel <#${savedMessage.channelId}>, il contient: ${savedMessage.content}`)


        }
    }
})




client.login(token)