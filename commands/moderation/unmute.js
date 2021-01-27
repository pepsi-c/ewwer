const discord = require('discord.js');

module.exports = {
        name: "unmute",
        category: "Moderation",
        description: "Unmutes a user (Muted Role)",
        usage: "$unmute <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('You cannot unmute members.')
        }
        if(!target) return message.reply('You did not mention anybody!');

        let roleName = 'muted'
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());

        if(!target.roles.cache.some(role => role.name.toLowerCase() === roleName.toLowerCase())) return message.channel.send('That user is not muted.')

        try {
            target.roles.remove(role);
            message.channel.send(`<@${target.id}> has been unmuted.`);
        } catch (error) {
            return message.channel.send('Error!')
        }

    }

};

