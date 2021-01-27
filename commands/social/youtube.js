const discord = require('discord.js');
const { YouTube } = require('popyt')
const youtube = new YouTube('AIzaSyBkvKcai7TSLlqts2mWjfXmPkslYwJDlac')

module.exports = {
        name: "youtube",
        aliases: ["yt", "ytsearch"],
        category: "Social",
        description: "Get info on a YouTube video.",
        usage: "$youtube <video name>",
    run: async (bot, message, args) => {

        if(!args[0]) return message.channel.send('Please enter a song name/URL!')

        const url = args[0] ? args[0].replace(/<(._)>/g, '$1') : ''
        const searchString = args.slice(0).join(' ')

        var video;
        try {
            if(args[0].includes('https://youtube.com/watch', 'https://www.youtube.com/watch', 'https://youtu.be')){
                var video = await youtube.getVideo(url)
            } else{
                try {
                    var video = await youtube.getVideo(searchString, 1)
                } catch (error) {
                    console.log(error)
                    return message.channel.send('I could not find any search results!')
                }
            }
            
        } catch (error) {
            message.channel.send('An error has occurred!')
        }

        try {

          let embed = new discord.MessageEmbed()
          .setColor('#000000')
          .setThumbnail(video.thumbnails.default.url)
          .setTitle(video.title)
          .setURL(video.shortUrl)
          .setAuthor('Altantis | YouTube', 'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/youtube-512.png')
          .addField('Video Information',
           `**Length: ** ${video.minutes} Minutes, ${video.seconds} Seconds
           **Comments: **${video.commentCount}
           **Video ID: **${video.id}
           **Made For Kids? **${video.kids.madeForKids ? "Yes":"No"}`
           )
           .setFooter(`👍: ${video.likes} | 👎: ${video.dislikes} | 👁️: ${video.views}`)

          message.channel.send(embed)

        } catch (error) {
            message.channel.send('I has trouble finding a video matching your search.')
        }

    }

};

