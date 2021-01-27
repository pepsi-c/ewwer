const discord = require('discord.js');

module.exports = {
        name: "coin",
        aliases: ["coinflip", "flip", "flipcoin"],
        category: "Fun",
        description: "Flips a coins to heads or tails.",
        usage: "$coin",
    run: async (bot, message, args) => {

        let replies = ['Tails.', 'Heads.'];

        let result = Math.floor((Math.random() * replies.length));
    
        message.channel.send(replies[result]);
    }

};

