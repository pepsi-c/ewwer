const discord = require('discord.js');
const ytdl = require('ytdl-core');
const opus = require('opusscript');
const { YouTube } = require('popyt')
const youtube = new YouTube('AIzaSyBkvKcai7TSLlqts2mWjfXmPkslYwJDlac')

const queue = new Map()

module.exports = {
        name: "music",
        aliases: ["tunes"],
        category: "Music",
        description: "Play some music in a voice channel!",
        usage: "$music <function(play, pause, resume, skip, stop, np, volume, queue)> (song name/link)",
    run: async (bot, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send('You must be in a voice channel to use this command!')

        let DJ = message.member.roles.cache.some(role => role.name === "DJ");

        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send('I do not have voice permissions!')
        if(!permissions.has('SPEAK')) return message.channel.send('I do not have voice permissions!')

        if(!args[0]) return message.channel.send('Please specify what you want to do (play, pause, skip, etc.)')

        const serverQueue = queue.get(message.guild.id)

        try {

            switch(args[0]){

                case 'play':

                    const url = args[1] ? args[1].replace(/<(._)>/g, '$1') : ''
                    const searchString = args.slice(1).join(' ')

                    var video;

                    try {
                        if(args[1].includes('https://youtube.com/watch', 'https://www.youtube.com/watch', 'https://youtu.be')){
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
                    
                    if(video.minutes > 120) return message.channel.send('You cannot play a song longer than 1 Hour, 30 Minutes')
    
                    const song = {
                        title: video.title,
                        url: video.shortUrl,
                        thumbnail: video.thumbnails.default.url,
                        duration: `${video.minutes} Minutes, ${video.seconds} Seconds`
                    }
    
                    if(!serverQueue){
                        const queueConstruct = {
                            textChannel: message.channel,
                            voiceChannel: voiceChannel,
                            connection: null,
                            songs: [],
                            volume: 5,
                            playing: true
                        }
                        queue.set(message.guild.id, queueConstruct)
            
                        queueConstruct.songs.push(song)
            
                        try {
                            var connection = await voiceChannel.join()
                            queueConstruct.connection = connection
                            play(message.guild, queueConstruct.songs[0])
    
                            let embed = new discord.MessageEmbed()
                            .setColor('#000000')
                            .setTitle(song.title)
                            .setDescription('Now Playing!')
                            .setThumbnail(song.thumbnail)
                            .addField('Duration', song.duration)
                            .setURL(song.url)
                            .setAuthor('Atlantis | Music', bot.user.avatarURL())
                            
                            message.channel.send(embed)
                        } catch (error) {
                            queue.delete(message.guild.id)
                            return message.channel.send('There was an error connecting to the voice channel!');
                        }
                    } else{
                        serverQueue.songs.push(song)
                        let embed = new discord.MessageEmbed()
                        .setColor('#000000')
                        .setTitle(song.title)
                        .setDescription('Song added to queue!')
                        .addField('Duration', song.duration)
                        .setThumbnail(song.thumbnail)
                        .setURL(song.url)
                        .setAuthor('Atlantis | Music', bot.user.avatarURL())
                        
                        message.channel.send(embed)
                    }
    
    
    
                break;
    
    
    
                case 'stop':
                    if (!DJ&& message.author.id != '299263276028788737') {
                        return message.channel.send('You must have DJ to stop the queue.')
                    }
                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    serverQueue.songs = []
                    serverQueue.connection.dispatcher.end()
                    message.channel.send('Stopped playing music and cleared the queue!')
                break;
    
    
    
                case 'fs':
                    if (!DJ&& message.author.id != '299263276028788737') {
                        return message.channel.send('You must have DJ to forceskip.')
                    }
                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    serverQueue.connection.dispatcher.end()
                    message.channel.send('Force skipped the current song!')
                break;
    
    
    
                case 'vol':
                    if (!DJ && args[1]&& message.author.id != '299263276028788737') {
                        return message.channel.send('You must have DJ to adjust volume.')
                    }
                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    if(!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}/5**. \nSpecify a number if you want to change the volume.`)
                    if(isNaN(args[1])) return message.channel.send(`That is not a valid volume amount!`)
                    if(args[1] > 100) return message.channel.send(`The maximum volume is 100/5 to protect user's speakers and/or ears. Default (100%) is **ONLY 5/5!**`)
                    serverQueue.volume = args[1]
                    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
                    message.channel.send(`The volume is now set to: **${args[1]}**`)
                break;

                case 'np':

                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    let embed = new discord.MessageEmbed()
                    .setColor('#000000')
                    .setTitle(serverQueue.songs[0].title)
                    .setDescription('Currently Playing Song')
                    .setThumbnail(serverQueue.songs[0].thumbnail)
                    .setURL(serverQueue.songs[0].url)
                    .setAuthor('Dove | Music', bot.user.avatarURL())

                    message.channel.send(embed)

                break;
    
                case 'q':

                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    let songMap = serverQueue.songs.map(song => `**--> ** ${song.title}`).join('\n')

                    if(songMap.length > 2000){
                        let embed1 = new discord.MessageEmbed()
                        .setColor('#000000')
                        .setTitle('Server Queue')
                        .setDescription(songMap.substring(0, 2000) + '\r**List too long for embed...**')
                        .setThumbnail(bot.user.avatarURL())
                        .setAuthor('Dove | Music', bot.user.avatarURL())
    
                        message.channel.send(embed1)
                    } else {
                        let embed1 = new discord.MessageEmbed()
                        .setColor('#000000')
                        .setTitle('Server Queue')
                        .setDescription(songMap)
                        .setThumbnail(bot.user.avatarURL())
                        .setAuthor('Dove | Music', bot.user.avatarURL())
    
                        message.channel.send(embed1)
                    }
                break;

                case 'pause':
                    if (!DJ && args[1] && message.author.id != '299263276028788737') {
                        return message.channel.send('You must have DJ to pause a song.')
                    }
                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    if(!serverQueue.playing) return message.channel.send('The music is already paused!')
                    serverQueue.playing = false
                    serverQueue.connection.dispatcher.pause()
                    message.channel.send('The music has been paused!')

                break;

                case 'resume':
                    if (!DJ && args[1]&& message.author.id != '299263276028788737') {
                        return message.channel.send('You must have DJ to pause a song.')
                    }
                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    if(serverQueue.playing) return message.channel.send('The music is already playing!')
                    serverQueue.playing = true
                    serverQueue.connection.dispatcher.resume()
                    message.channel.send('The music has resumed!')
$
                break;


                case 'loop':

                    if(!serverQueue) return message.channel.send('There is nothing playing!')
                    serverQueue.loop = !serverQueue.loop

                    message.channel.send(`Loop ${serverQueue.loop ? '**Enabled 🔁**' : '**Disabled**!'}`)

                break;
            }
        
    
            function play(guild, song){
                const serverQueue = queue.get(guild.id)
    
                if(!song){
                    serverQueue.voiceChannel.leave()
                    queue.delete(guild.id)
                    return
                }
    
                const dispatcher = serverQueue.connection.play(ytdl(song.url))
                .on('finish', () => {
                    if(!serverQueue.loop) serverQueue.songs.shift()
                    play(guild, serverQueue.songs[0])
                })
                .on('error', error => {
                    
                })
                dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
    
            }
            
        } catch (error) {
            console.log(error)
            return message.channel.send('An error has occurred!')
        }


        
    } 

};

