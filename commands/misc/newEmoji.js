const discord = require('discord.js');

module.exports = {
        name: "newemoji",
        aliases: ["addemoji"],
        category: "Misc",
        description: "Add emoji to the guild.",
        usage: "$newemoji <url> <name>",
    run: async (bot, message, args) => {
    
        if(!message.member.hasPermission('MANAGE_EMOJIS')) return message.reply('You do not have permission to do that!');

        if(!args[0]) return message.channel.send('Please specify an image URL!');
        if(!args[1]) return message.channel.send('Please specify a name for the emoji!');

        try {
            message.guild.emojis.create(args[0], args[1])
            return message.channel.send('Successfully added the emoji!');
        } catch (error) {
            return message.channel.send('Failed to add emoji! File size is probably too large.');
        }
    }

};

