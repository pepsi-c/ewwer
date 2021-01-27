const discord = require('discord.js');

module.exports = {
        name: "howgay",
        aliases: ["gaymeter"],
        category: "Fun",
        description: "Shows how gay someone is.",
        usage: "$howgay <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first());
        function between(min, max) {  
            return Math.floor(
              Math.random() * (max - min) + min
            )
          }
    
        if(!target) message.channel.send(`this cmd is disabled ')
        else { message.channel.send('e' }
    }

};

