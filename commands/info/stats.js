const discord = require('discord.js');

module.exports = {
        name: "stats",
        aliases: ["about", "info"],
        category: "Info",
        description: "Bot Stats",
        usage: "$stats",
    run: async (bot, message, args) => {
        
        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

                let embed = new discord.MessageEmbed()
                .setColor('#000000')
                .setThumbnail(bot.user.avatarURL())
                .setAuthor('Atlantis | Bot Stats', bot.user.avatarURL())
                .addField('Stats',
                 `**Creator: **<@615719863335518237>
                 **Name: **${bot.user.username}
                 **Servers: **${bot.guilds.cache.size}
                 **Uptime: **${uptime}
                 **Ping: **${bot.ws.ping}ms`)
        
                message.reply(embed);

    }

};

