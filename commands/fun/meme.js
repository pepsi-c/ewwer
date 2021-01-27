const discord = require('discord.js');
const trev = require('trev');

module.exports = {
        name: "meme",
        category: "Fun",
        description: "Sends a random reddit meme",
        usage: "$meme",
    run: async (bot, message, args) => {

        let meme = await trev.getCustomSubreddit(`/r/meme`)

          try {
            let embed = new discord.MessageEmbed()
            .setTitle('Have a funny meme!')
            .setAuthor('Atlantis | Meme', bot.user.avatarURL())
            .setDescription(meme.title)
            .setImage(meme.media)
            .setColor('#000000')
            .setFooter(`From: ${meme.subreddit} | Powered By: Trev`)
            message.channel.send(embed);
          } catch (error) {
            message.channel.send('Error! This is probably caused by shitty Trev lol.');
          }
    
    }

};

