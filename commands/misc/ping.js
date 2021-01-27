const discord = require('discord.js');


module.exports = {
        name: "ping",
        aliases: ["pong", "lag", "latency"],
        category: "Misc",
        description: "Returns Pong.",
        usage: "$ping",
    run: async (bot, message, args) => {

        message.channel.send('Pinging...').then(msg => {
            let embed = new discord.MessageEmbed()
            .setColor('#000000')
            .setTitle('Pong!')
            
            .addFields(
                {name: 'API Latency', value: `${Math.round(bot.ws.ping)}ms`, inline: true},
                {name: 'Response Latency', value: Math.round(msg.createdTimestamp - message.createdTimestamp)+'ms', inline: true}
            )

            .setAuthor('Atlantis | Ping', bot.user.avatarURL())
    
            msg.edit(embed);
        })


    }

};

