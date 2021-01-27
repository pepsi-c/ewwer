const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const blacklistUsers = "./blacklist.json"
const badLinks = require("./badLinks.json") 
//const token = process.env.BOT_TOKEN;

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 10, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 15, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '{@user} has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '{@user} has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 15, // Amount of duplicate messages that trigger a warning.
    //exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: false, // Extended Logs from module.
    ignoredUsers: ['299263276028788737'], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});



bot.on("ready", async () => {
    console.log(`${bot.user.username} is up and running in ${bot.guilds.cache.size} servers.`)
    bot.user.setActivity(`${bot.guilds.cache.size} servers | ${bot.prefix}help`, {type: "STREAMING",url:"https://www.twitch.tv/lobanjicaa"  }), 59});





//////////////////////////////////////////////////////////////////////////////////////////////

// Load Commands
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");

['command'].forEach(handler => {
    require(`./handler/${handler}`)(bot);
})

//////////////////////////////////////////////////////////////////////////////////////////////





// Message Event
    
bot.on('message', async (message) =>{
	antiSpam.message(message);

	if(badLinks.some(link => message.content.toLowerCase().includes(link))){

		message.delete()
		message.channel.send('Possible IP Logger/Shortner Detected!')
		try {
			//Find the logs channel
		var logChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "logs")
	
	//Create it if it doesn't exist
		if(!logChannel){
		logChannel = await message.guild.channels.create("logs", {
			type: "text",
			nsfw: true,
			reason: "Altantis attempted to log something, but the logs channel did not exist."
		})
	}
	//Exit if the bot could not find or create the logs channel(E.g lacks permission)
		if(!logChannel) return;
	
		let embed = new Discord.MessageEmbed()
		.setColor('#000000')
		.setAuthor('Altantis | Mod', bot.user.avatarURL())
		.setThumbnail(message.author.avatarURL())
		.setTitle(`Possible IP Logger/Shortner Deleted: ${message.author.tag}`)
		.addField('Message', message.content.substr(0,500) + (message.content.length > 500 ? "..." : ""))
		.addField('Channel', `<#${message.channel.id}>`)
		logChannel.send(embed)
	
	
		
	} catch (error) {
		var logChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "logs")
		logChannel.send('Error!')
	}
		return;

	}



    if(message.author.bot) return;
    if(!message.guild && !message.channel.type === 'dm') return;
    if(!message.content.startsWith(botconfig.prefix)) return;

    const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
	if(!command) command = bot.commands.get(bot.aliases.get(cmd));

	fs.readFile(blacklistUsers, function(err, data){
		var jsonBLData = JSON.parse(data)

		if(command && jsonBLData.blacklistedUsers.includes(message.author.id)){
			return message.reply('You are blacklisted from using Altantis!')
		}

		if(command){
			command.run(bot, message, args, blacklistUsers, botconfig)
		}
	})


});









bot.on("messageDelete", async msg => {

	if(badLinks.some(link => msg.content.toLowerCase().includes(link))) return;

    try {
        	//Find the logs channel
	var logChannel = msg.guild.channels.cache.find(channel => channel.name.toLowerCase() === "logs")

	//Create it if it doesn't exist
	if(!logChannel){
		logChannel = await msg.guild.channels.create("logs", {
			type: "text",
			nsfw: true,
			reason: "Altantis attempted to log something, but the logs channel did not exist."
		})
	}
	//Exit if the bot could not find or create the logs channel(E.g lacks permission)
	if(!logChannel) return;

	if(msg.attachments.size > 0){

			let embed = new Discord.MessageEmbed()
			.setColor('#000000')
			.setAuthor('Altantis | Moderation', bot.user.avatarURL())
			.setThumbnail(msg.author.avatarURL())
			.setTitle(`Attachment Deleted: ${msg.author.tag}`)
			.addField('Channel', `<#${msg.channel.id}>`)
			logChannel.send(embed)

	}
	else {
		let embed = new Discord.MessageEmbed()
		.setColor('#000000')
		.setAuthor('Altantis | Moderation', bot.user.avatarURL())
		.setThumbnail(msg.author.avatarURL())
		.setTitle(`Message Deleted: ${msg.author.tag}`)
		.addField('Message', msg.content.substr(0,500) + (msg.content.length > 500 ? "..." : ""))
		.addField('Channel', `<#${msg.channel.id}>`)
		logChannel.send(embed)
	}


        
    } catch (error) {
		logChannel.send('Error!')
    }
})










bot.on("messageUpdate", async (oldMsg, newMsg) => {

		if(badLinks.some(link => newMsg.content.toLowerCase().includes(link))){

		oldMsg.delete()
		oldMsg.channel.send('Possible IP Logger/Shortner Detected!')
		try {
			//Find the logs channel
		var logChannel = oldMsg.guild.channels.cache.find(channel => channel.name.toLowerCase() === "logs")
	
	//Create it if it doesn't exist
		if(!logChannel){
		logChannel = await oldMsg.guild.channels.create("logs", {
			type: "text",
			nsfw: true,
			reason: "Altantis attempted to log something, but the logs channel did not exist."
		})
	}
	//Exit if the bot could not find or create the logs channel(E.g lacks permission)
		if(!logChannel) return;
	
		let embed = new Discord.MessageEmbed()
		.setColor('#000000')
		.setAuthor('Altantis | Moderation', bot.user.avatarURL())
		.setThumbnail(newMsg.author.avatarURL())
		.setTitle(`Possible IP Logger/Shortner Deleted: ${newMsg.author.tag}`)
		.addField('Message', newMsg.content.substr(0,500) + (newMsg.content.length > 500 ? "..." : ""))
		.addField('Channel', `<#${newMsg.channel.id}>`)
		logChannel.send(embed)

		return;

	} catch (error) {
		var logChannel = oldMsg.guild.channels.cache.find(channel => channel.name.toLowerCase() === "logs")
		logChannel.send('Error!')
	}}


    try {
        	//Don't handle messages from bots
	if (oldMsg.author.bot) return
	//Only handle messages in text channels
	if(oldMsg.channel.type !== "text") return

	//Don't log if the edited message is the same (Idk how it happens, but it does)
	if(oldMsg.content === newMsg.content) return

	//Find the logs channel
	var logChannel = oldMsg.guild.channels.cache.find(channel => channel.name.toLowerCase() === "logs")
	//Create it if it doesn't exist
	if(!logChannel){
		logChannel = await oldMsg.guild.channels.create("logs", {
			type: "text",
			nsfw: true,
			reason: "Altantis attempted to log something, but the logs channel did not exist."
		})
	}
	//Exit if the bot could not find or create the logs channel(E.g lacks permission)
	if(!logChannel) return

	let embed = new Discord.MessageEmbed()
	.setColor('#000000')
	.setThumbnail(oldMsg.author.avatarURL())
	.setAuthor('Altantis | Moderation', bot.user.avatarURL())
	.setTitle(`Message Edited: ${oldMsg.author.tag}`)
	.addField('Old Message', oldMsg.content)
	.addField('New Message', newMsg.content)
	.addField('Channel', `<#${oldMsg.channel.id}>`)
	logChannel.send(embed)

        
    } catch (error) {
		console.log(error)
		logChannel.send('Error, Message probably contains an attachment/image.')
	}
})




bot.on("disconnect", function(event) {
	console.log(
	  `The WebSocket has closed and will no longer attempt to reconnect`
	);
  });

//////////////////////////////////////////////////////////////////////////////////////////////

bot.login(process.env.BOT_TOKEN);
//botconfig.token
