const discord = require('discord.js');

module.exports = {
        name: "ban",
        category: "Moderation",
        description: "Bans a user",
        usage: "$ban <mention> <reason>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        let reason = args.slice(1).join(' ');
        let findlogs = message.guild.channels.cache.find(channel => channel.name === 'logs');
    
        if(!message.member.hasPermission('BAN_MEMBERS')){
            return message.reply('You cannot ban members.')
        }
    
        if(!target) return message.reply('You did not mention anybody!');
        if(target.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot mute another moderator!');
        if(!reason) return message.reply('Please specify a reason to kick this member!');
        if(!findlogs){
            try {
                await message.channel.guild.channels.create('logs')
            } catch (error) {
                return message.channel.send('Logs channel does not exist and I have insufficient permissions to create one.')
            }
        }
    
        let logs = message.guild.channels.cache.find(channel => channel.name === 'logs');
    
    
        let embed = new discord.MessageEmbed()
            .setColor('#000000')
            .setThumbnail(target.user.avatarURL())
            .addField('Banned Member', `<@${target.id}> (${target.user.id})`)
            .addField('Banned By', `<@${message.author.id}> (${message.author.id})`)
            .addField('Banned Time', message.createdAt)
            .addField('Banned In', message.channel)
            .addField('Reason', reason)
            .setAuthor('Atlantis | Moderation', bot.user.avatarURL())
    
        message.channel.send(`<@${target.id}> has been banned for: **${reason}**`);
        message.guild.members.ban(target);
        logs.send(embed);
    }

};

