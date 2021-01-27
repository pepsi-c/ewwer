const discord = require('discord.js');

module.exports = {
        name: "unwarn",
        category: "Moderation",
        description: "Unwarns a user (Warned Role)",
        usage: "$unwarn <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('You cannot unwarn members.')
        }
        if(!target) return message.reply('You did not mention anybody!');

        let roleName = 'warned'
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());

        if(!target.roles.cache.some(role => role.name.toLowerCase() === roleName.toLowerCase())) return message.channel.send('That user is not warned.')

        try {
            target.roles.remove(role);
            message.channel.send(`<@${target.id}> has been unwarned.`);
        } catch (error) {
            return message.channel.send('Error!')
        }

    }

};

