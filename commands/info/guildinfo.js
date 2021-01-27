const discord = require('discord.js');
const moment = require('moment')

module.exports = {
        name: "guildinfo",
        aliases: ["serverinfo", "si", "gi"],
        category: "Info",
        description: "Server information",
        usage: "$guildinfo",
    run: async (bot, message, args) => {

        try {

            let embed = new discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setAuthor('Atlantis | Guild Info', bot.user.avatarURL())
             .addFields(
                 {
                     name: 'Name',
                     value: message.guild.name,
                     inline: true
                 },
                 {
                    name: 'ID',
                    value: message.guild.id,
                    inline: true
                },
                {
                    name: 'Owner',
                    value: message.guild.owner.user.tag
                }
             )
             .addField(
                {
                    name: 'Members',
                    value: `**Total: **${message.guild.memberCount} | **Online: **${guild.members.filter(m => m.presence.status === 'online').size}`
                }
             )
            .addField(
                {
                    name: 'Owner',
                    value: message.guild.owner.user.tag
                }
  
            )
            .addField(
                {
                    name: 'Creation Date',
                    value: moment(message.guild.createdAt ).utc().format('MM/DD/YYYY | h:mm A')
                }
  
            )
    
            message.reply(embed);
            
        } catch (error) {

            let embed = new discord.MessageEmbed()
            .setColor('#000000')
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setAuthor('Atlantis | Guild Info', bot.user.avatarURL())
            .addFields(
                {
                    name: 'Name',
                    value: message.guild.name,
                    inline: true
                },
                {
                   name: 'ID',
                   value: message.guild.id,
                   inline: true
               }
            )
            
            .addField('Highest Role', message.guild.roles.highest.name)

            .addFields(
                {
                    name: 'Members',
                    value: `**Total: **${message.guild.memberCount} | **Online: ** ${message.guild.members.cache.filter(m => m.presence.status === 'online').size}`,
                    inline: true
                },
                {
                   name: 'Channels Count',
                   value: `**Text: **${message.guild.channels.cache.filter((c) => c.type === "text").size} | **Voice: **${message.guild.channels.cache.filter((c) => c.type === "voice").size}`,
                   inline: true
               }
            )
            .addField('Creation Date', moment(message.guild.createdAt ).utc().format('MM/DD/YYYY | h:mm A'))
    
            message.reply(embed);
            
        }
        
    }

};

