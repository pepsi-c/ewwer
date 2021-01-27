const discord = require('discord.js');

module.exports = {
        name: "greet",
        aliases: ["hello"],
        category: "Social",
        description: "Greet a new user.",
        usage: "$greet <mention>",
    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!args[0]) return message.channel.send('Please mention somebody');

        if(!target) return message.channel.send('You need to mention somebody!');

        let replies = [
            `Hello, ${target}. Welcome to **${message.guild.name}**!`,
            `Hi, ${target}. Welcome to **${message.guild.name}**! Enjoy your stay!`,
            `Hows it goin' ${target}? Welcome to our server!`, 
            `Yoooo whats up ${target}?? Welcome to **${message.guild.name}**! Have a look around!`];

        let result = Math.floor((Math.random() * replies.length));

        message.channel.send(replies[result]);

    }

};

