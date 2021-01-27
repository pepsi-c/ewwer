const discord = require('discord.js');

module.exports = {
        name: "purge",
        aliases: ['delete'],
        category: "Moderation",
        description: "Deletes bulk messages",
        usage: "$purge <number 1-100>",
    run: async (bot, message, args) => {
        
        try {
            if(!message.member.hasPermission('MANAGE_MESSAGES')){
                return message.reply('You cannot delete messages.')
            }
        
            if(isNaN(args[0]) || parseInt(args[0]) <= 0){
                return message.reply('Please enter a number 1-100');
            }
        
            let deleteAmount;
        
            if(parseInt(args[0]) > 100){
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0]);
            }
            
            message.channel.bulkDelete(deleteAmount, true)
                .then(deleted => message.channel.send(`Successfully deleted **${deleted.size}** messages.`))
                .catch(err => message.reply('An error has occurred.'));
        } catch (error) {
            message.reply('An error has occurred.')
        }

    }

};

