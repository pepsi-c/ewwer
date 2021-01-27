const discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { YouTube } = require('popyt');
const { dirname } = require('path');
const youtube = new YouTube('AIzaSyBkvKcai7TSLlqts2mWjfXmPkslYwJDlac')

const queue = new Map()

module.exports = {
        name: "ytdl",
        aliases: ["youtubedl", "youtubedownload"],
        category: "Music",
        description: "Download a song from YouTube",
        usage: "$ytdl <link/name>",
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send('Please specify a song name/link')


        try {
                    const url = args[0] ? args[0].replace(/<(._)>/g, '$1') : ''
                    const searchString = args.join(' ')

                    var video;

                    try {
                        if(args[0].includes('https://youtube.com/watch', 'https://www.youtube.com/watch', 'https://youtu.be')){
                            var video = await youtube.getVideo(url)
                        } else{
                            try {
                                var video = await youtube.getVideo(searchString, 1)
                            } catch (error) {
                                return message.channel.send('I could not find any search results!')
                            }
                        }
                        
                    } catch (error) {
                        message.channel.send('An error has occurred!')
                    }
                    
                    if(message.author.id != "615719863335518237" && video.minutes > 7) return message.channel.send('Sorry! Downloads are limited to 5 minutes to save bandwith.')
    
                    const song = {
                        title: video.title,
                        url: video.shortUrl,
                        thumbnail: video.thumbnails.default.url,
                        duration: `${video.minutes} Minutes, ${video.seconds} Seconds`
                    }



                    try {
                        const songDir = `${__dirname}/${song.title.replace("|", "_")}.mp3`
                        ytdl(song.url, { filter: "audioonly", format: "mp3"}).pipe(fs.createWriteStream(songDir)).on("finish", async function(){
                           var songAttachment = new discord.MessageAttachment(songDir)

   
                           await message.channel.send(`**YouTube Download** - ${song.title}\n**Note: This command is semi broken, you may have issues playing audio elsewhere.**`, songAttachment)
   
                           fs.unlinkSync(songDir)
                        })
                    } catch (error) {
                        message.channel.send('Error downloading/sending song.')
                    }



        } catch {

        }
    }
            
};

