const discord = require('discord.js');

module.exports = {
        name: "warn",
        category: "Moderation",
        description: "Warn a user (Warned Role)",
        usage: "$warn <mention> <reason>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        let reason = args.slice(1).join(' ');
        
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('You cannot warn members.')
        }
        
        if(!target) return message.reply('You did not mention anybody!');
        if(target.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot mute another moderator!');
        if(!reason) return message.reply('Please specify a reason to mute this member!');

        let roleName = 'warned'
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());

        if(!role){
            try {
                await message.guild.roles.create('warned')
            } catch (error) {
                return message.channel.send('Warned role does not exist and I have insufficient permissions to create it.')
            }
        } 

        try {
            target.roles.add(role);
            message.channel.send(`<@${target.id}> has been warned for: **${reason}**`);
        } catch (error) {
            return message.channel.send('Error!')
        }

    }

};

