const discord = require('discord.js');

module.exports = {
        name: "8ball",
        aliases: ["magic8", "magic8ball", "8b"],
        category: "Fun",
        description: "The Magic 8 Ball, answers all your questions.",
        usage: "$8ball <question>",
    run: async (bot, message, args) => {

        let replies = ['Yessir!', 'Yes.', 'No.', 'Yeee', 'Nope.', 'Outlook not so bright.', 'I am busy! Ask again later.', 'Nah fam.', 'Are you actually asking me this??', 'Go away lol.', "I'm not too sure..."];

        let result = Math.floor((Math.random() * replies.length));
    
        message.channel.send(replies[result]);
    }

};

