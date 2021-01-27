const discord = require('discord.js');
const crypto = require('crypto')

module.exports = {
        name: "stringencryption",
        aliases: ["se", "sencrypt"],
        category: "Misc",
        description: "Encrypt some string",
        usage: "$se <string>",
    run: async (bot, message, args) => {

        if(!args[0]) return message.channel.send('Please provide some text to encrypt!')

        const toEnc = args.join(" ");
        const userDKEY = makeKey(Math.random() * (30 - 20) + 20)

        try {
                let embed = new discord.MessageEmbed()
                .setColor('#000000')
                .setAuthor('Atlantis | Encryption ', bot.user.avatarURL())
                .addField('Input', toEnc)
                .addField('Decryption Key', userDKEY)
                .setDescription('**Encrypted Text **\r' + encrypt(toEnc))
    
                message.author.send(embed)

                return message.channel.send('Encryption successful! Please check your DMs.')
        } catch (error) {
            message.channel.send('Please enable Direct Messages so I can send the decryption key!')
            console.log(error)
        }



        function encrypt(text){
            var cipher = crypto.createCipher('aes-256-cbc', userDKEY)
            var crypted = cipher.update(text,'utf8','hex')
            crypted += cipher.final('hex');
            return crypted;
          }
        
          function makeKey(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }

    }

};

