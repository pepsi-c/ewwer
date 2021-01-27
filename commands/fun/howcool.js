const discord = require('discord.js');

module.exports = {
        name: "howcool",
        aliases: ["coolnes", "cool"],
        category: "Fun",
        description: "Shows how cool someone is.",
        usage: "$howcool <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first());
        function between(min, max) {  
            return Math.floor(
              Math.random() * (max - min) + min
            )
          }
          if(!target) return message.channel.send(`You are ` + between(1, 100) + '% cool :sunglasses:')
          else { message.channel.send(`<@${target.id}>` + ' is ' + between(1, 100) + '% cool :sunglasses:'); }
    
    }

};

