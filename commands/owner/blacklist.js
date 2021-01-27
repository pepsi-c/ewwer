const discord = require('discord.js');
const fs = require('fs');
const blacklistFile = "./blacklist.json"

module.exports = {
        name: "blacklist",
        aliases: ["bl"],
        category: "Owner",
        description: "Blacklists a user",
        usage: "$bl <mention>",
    run: async (bot, message, args) => {

        if(message.author.id !== '706516757132738601'){
            return message.channel.send('Only Clouds can run this command.')
        }

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        if(!target) return message.channel.send('You need to mention someone!')

        try {
            fs.readFile(blacklistFile, function(err, data){
                var json = JSON.parse(data)
                
                if(!json.blacklistedUsers.includes(target.id)){
                    json.blacklistedUsers.push(target.id)

                    var data1 = JSON.stringify(json)
    
                    fs.writeFileSync(blacklistFile, data1)

                    return message.channel.send('Successfully blacklisted!')
                } else{
                    return message.channel.send('That user is already blacklisted')
                }
            })
        } catch (error) {
            console.log(error)
            return message.channel.send('Error while blacklisting!')
        }
        

    }

};

