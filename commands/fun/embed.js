const discord = require('discord.js');

module.exports = {
        name: "embed",
        aliases: ["sayembed"],
        category: "Fun",
        description: "Send an embed through the bot",
        usage: "$embed <text>",
    run: async (bot, message, args) => {

        if(message.guild.id === '707113280275087462') return;
        if(!args[0])return message.channel.send('Please specify some text!');

        if(message.content.includes('@everyone')) return message.channel.send('Nice try, you cannot ping everyone.')
        if(message.content.includes('@here')) return message.channel.send('Nice try, you cannot ping everyone.')
    
        const embed = new discord.MessageEmbed()
        .setColor('#000000')
        .setAuthor('Atlantis | User Embed', bot.user.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .setTitle(`Embed From: ${message.author.username}`)
        .setDescription(args.join(" "))
    
        message.reply(embed);
    }

};

