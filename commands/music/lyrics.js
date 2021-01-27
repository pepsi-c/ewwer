const discord = require('discord.js');
const lyrics = require('solenolyrics');

module.exports = {
        name: "lyrics",
        aliases: ["songlyrics", "sl"],
        category: "Music",
        description: "Get the lyrics to your favorite song",
        usage: "$lyrics <song name>",
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('Please enter a song name!')
        let song = await lyrics.requestLyricsFor(`${args.join(' ')}`); 
        if(!song) return message.channel.send('Could not find results for that song!');
        let author = await lyrics.requestAuthorFor(`${args.join(' ')}`); 
        let title = await lyrics.requestTitleFor(`${args.join(' ')}`); 
        let icon = await lyrics.requestIconFor(`${args.join(' ')}`); 
        try {
                if(song.length > 1500){
                    let embed = new discord.MessageEmbed()
                    .setColor('#000000')
                    .setDescription(song.substring(0, 1500) + '-\r**...**')
                    .setThumbnail(icon)
                    .setAuthor('Atlantis | Lyrics', bot.user.avatarURL())
                    .setTitle(title + ' - ' + author)
        
                    message.channel.send(embed)
                } else{
                    let embed = new discord.MessageEmbed()
                    .setColor('#000000')
                    .setThumbnail(icon)
                    .setAuthor('Atlantis | Lyrics', bot.user.avatarURL())
                    .setTitle(title + ' - ' + author)
                    .setDescription(song)
        
                    message.channel.send(embed)
                }


            
 

        } catch (error) {
            return message.channel.send('Error!');
        }
        
    } 

};

