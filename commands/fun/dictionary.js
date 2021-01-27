const discord = require('discord.js');
const urban = require('urban');
const { stripIndents }  = require('common-tags')

module.exports = {
        name: "dictionary",
        aliases: ["urban", "ud", "dic"],
        category: "Fun",
        description: "Find a word in the Urban Dictionary",
        usage: "$dictionary <word>",
    run: async (bot, message, args) => {

        if(!args[0]) return message.channel.send('Please specify a word!')
        let icon = "https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/7e/49/85/7e498571-a905-d7dc-26c5-33dcc0dc04a8/source/512x512bb.jpg";
        let search = args[0] ? urban(args.join(" ")) : urban.random();
            try {
                search.first(res => {
                    if(!res) return message.channel.send("No results found for that word!");
                    let { word, definition, example, thumbs_up, thumbs_down, permalink} = res;

                        let embed = new discord.MessageEmbed()
                            .setColor('#000000')
                            .setFooter(`👍: ${thumbs_up || 0} | 👎: ${thumbs_down || 0}`)
                            .setURL(permalink)
                            .setTitle('"'+word + '" - Urban Dictionary')
                            .setThumbnail(icon)
                            .setAuthor('Atlantis | Urban Dictionary', 'https://media.giphy.com/media/j3J8QlFC5avvVd1JAj/giphy.gif')
                            .setDescription(stripIndents`**Defintion:** ${definition || "No definition."}
                            **Example:** ${example || "No example."}`)

                            message.channel.send(embed)
                })
            } catch(e) {
                return message.channel.send("An error has occurred!")
            }
        

    }

};

