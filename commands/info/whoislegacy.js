const discord = require('discord.js');

module.exports = {
        name: "whoislegacy",
        aliases: ["userinfolegacy", "uilegacy", "whoslegacy"],
        category: "Info",
        description: "Get info on someone.",
        usage: "$whois <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);
        if(!target) return message.channel.send('You must mention someone!')
        let embed = new discord.MessageEmbed()
        .setColor('#000000')
        .setTitle(target.user.username)
        .setThumbnail(target.user.avatarURL())
        .setAuthor('Atlantis | WhoIs/User Lookup', bot.user.avatarURL())
        .addField('User Info',
         `**Display Name: **${target.displayName}
         **ID: **${target.user.id}
         **Creation Date: **${target.user.createdAt}
         **Join Date: **${target.joinedAt}`)

        message.reply(embed);
        
    }

};

