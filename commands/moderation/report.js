const discord = require('discord.js');

module.exports = {
        name: "report",
        category: "Moderation",
        description: "Report a user",
        usage: "$report <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        let reason = args.slice(1).join(' ');
        let findreports = message.guild.channels.cache.find(channel => channel.name === 'reports');
    
        if(!target) return message.reply('You did not mention anybody!');
        if(!reason) return message.reply('Please specify a reason to report this member!');
        if(!findreports){
            try {
                await message.channel.guild.channels.create('reports')
            } catch (error) {
                return message.channel.send('Logs channel does not exist and I have insufficient permissions to create one.')
            }
        }
    
        let reports = message.guild.channels.cache.find(channel => channel.name === 'reports');
    
        let embed = new discord.MessageEmbed()
            .setTitle(`${message.author.tag} reported a user.`)
            .setColor('#000000')
            .setThumbnail(target.user.avatarURL())
            .addField('Reported Member', `<@${target.id}> (${target.user.id})`)
            .addField('Reported By', `<@${message.author.id}> (${message.author.id})`)
            .addField('Report Time', message.createdAt)
            .addField('Reported In', message.channel)
            .addField('Reason', reason)
            .setAuthor('Atlantis | Mod', bot.user.avatarURL())
    
        message.channel.send(`Your report for "**${target.user.username}**" has been submitted!`);
        reports.send(embed);

        
    }

};



