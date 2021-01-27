const discord = require('discord.js');
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: 'dc6183f5038c4f09bc6a3d9d8ba247cc',
    secret: 'c3ef6a3e58d247c6a9f795c74c75ce37'
  });


module.exports = {
        name: "spotify",
        aliases: ["spotsearch", "spot"],
        category: "Music",
        description: "Get information about your favorite song!",
        usage: "$spotsearch <song name>",
    run: async (bot, message, args) => {

        if(!args[0]) return message.channel.send('Please enter a song name!')

        let song = spotify.search({ type: 'track', query: args.join(' '), limit: 1 }, function(err, data) {
            try {
                let track = data.tracks.items[0];
                console.log(song)
                let embed = new discord.MessageEmbed()
                .setColor('#000000')
                .setTitle(track.artists[0].name + ' - ' + track.name)
                .setThumbnail(track.album.images[0].url)
                .setURL(track.external_urls.spotify)
                .setAuthor('Atlantis | Spotify', bot.user.avatarURL())
                .addField('Song Information',
           `**Album: ** ${track.album.name}
           **Album Release Date: ** ${track.album.release_date}
           **Album Total Tracks: ** ${track.album.total_tracks}
           **Explicit: **${track.explicit ? 'Yes':'No'}
           **Popularity: **${track.popularity}% (Higher = More Popular)`
           )
            
                message.channel.send(embed)
    
            } catch (error) {
                return message.channel.send('Could not find results for that song!');
            }
            // Do something with 'data'
        });

        
    } 

};

