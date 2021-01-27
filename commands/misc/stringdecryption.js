const discord = require('discord.js');
const crypto = require('crypto')

module.exports = {
        name: "stringdecrption",
        aliases: ["sd", "sdecrypt","stringdecrption"],
        category: "Misc",
        description: "Decrypt some string",
        usage: "$sd <key> <string>",
    run: async (bot, message, args) => {

        const toDec = args.slice(1).join(" ")
        const userDKEY = args[0]

        try {

            let embed = new discord.MessageEmbed()
            .setColor('#000000')
            .setAuthor('Atlantis | Decrpytion ', bot.user.avatarURL())
            .addField('Encrypted Text', toDec)
            .addField('Decryption Key', userDKEY)
            .setDescription('**Decrypted Text **\r' + decrypt(toDec))

            message.channel.send(embed)


        } catch (error) {
            message.channel.send('Error! Incorrect arguments or string is too long.')
            console.log(error)
        }



        function decrypt(text){
            var decipher = crypto.createDecipher('aes-256-cbc',userDKEY)
            var dec = decipher.update(text,'hex','utf8')
            dec += decipher.final('utf8');
            return dec;
          }

    }

};

