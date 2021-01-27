const discord = require('discord.js');

module.exports = {
        name: "kick",
        category: "Moderation",
        description: "Kicks a user",
        usage: "$kick <mention> <reason>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        let reason = args.slice(1).join(' ');
        let findLogs = message.guild.channels.cache.find(channel => channel.name === 'logs');
    
        if(!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply('You cannot kick members.')
        }
    
        if(!target) return message.reply('You did not mention anybody!');
        if(target.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot mute another moderator!');
        if(!reason) return message.reply('Please specify a reason to kick this member!');
        if(!findLogs){
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
            .addField('Kicked Member', `<@${target.id}> (${target.user.id})`)
            .addField('Kicked By', `<@${message.author.id}> (${message.author.id})`)
            .addField('Kicked Time', message.createdAt)
            .addField('Kicked In', message.channel)
            .addField('Reason', reason)
            .setAuthor('Atlantis | Moderation', bot.user.avatarURL())
    
        message.channel.send(`<@${target.id}> has been kicked for: **${reason}**`);
        target.kick();
        logs.send(embed);
    }

};

