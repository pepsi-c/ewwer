const discord = require('discord.js');
var figlet = require('figlet');

module.exports = {
        name: "ascii",
        aliases: ["print"],
        category: "Fun",
        description: "Converts text into ASCII art. (Only works on wide displays (E.g. 1920x1080))",
        usage: "$ascii <text>",
    run: async (bot, message, args) => {

        
        if(!args[0]) return message.channel.send('Please specify some text to convert to ASCII.');

        figlet(args.join(' '), function(err, rendered){
            rendered = rendered.trimRight();

            if(rendered.length > 2000) return message.channel.send('Error! That message is too long.')

            message.channel.send(rendered, {
                code: ''
            })

            .catch(error =>{
                figlet('Error!', function(err, rendered){
                    rendered = rendered.trimRight();
        
                    if(rendered.length > 2000) return message.channel.send('Error! That message is too long.')
        
                    message.channel.send(rendered, {
                        code: ''
                    });
                })
            })
        });

    }

};

