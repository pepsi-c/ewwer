const discord = require('discord.js');

module.exports = {
        name: "Download",
        aliases: ["D", "d", "Download", "download"],
        category: "Info",
        description: "Download the stuff",
        usage: "$Download",
    run: async (bot, message, args) => {
        try {
             let embed = new discord.MessageEmbed()
                    .setColor('#000000')
                    .setDescription('Here is the download link = https://direct-link.net/166283/Download ')
                    .setAuthor('Atlantis | Download', bot.user.avatarURL())
                    .setTitle('Download')
        
                    message.channel.send(embed)

        } catch (error) {
            return message.channel.send('Error!');
        }
        
    } 

};

