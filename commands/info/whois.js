const discord = require('discord.js');
const Canvas = require('canvas')
const moment = require('moment')

module.exports = {
    name: "whois",
    aliases: ["userinfo", "ui", "whos"],
    category: "Info",
    description: "Get info on someone.",
    usage: "$whois <mention>",
    run: async (bot, message, args) => {

        if(message.channel.type === 'dm') return;

        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);
        if(!target) return message.channel.send('You must mention someone!')

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 50;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `bold ${fontSize -= 10}px sans`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 330);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };

        //Create the canvas
        const canvas = Canvas.createCanvas(700, 260);
        const ctx = canvas.getContext('2d');

        //Draw The Background Color
        ctx.fillStyle = "#36393e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);



        //Draw the user's name
        if(target.user.bot === true){
            const botTag = await Canvas.loadImage('https://emoji.gg/assets/emoji/bottag.png')
            ctx.drawImage(botTag, 250, 14, 75, 75);

            ctx.fillStyle = target.displayHexColor;
            ctx.font = applyText(canvas, target.user.tag);
            ctx.fillText(`${target.user.tag}`, 332, 65)

        } else{
            ctx.fillStyle = target.displayHexColor;
            ctx.font = applyText(canvas, target.user.tag);
            ctx.fillText(`${target.user.tag}`, 250, 65)
        }

        //Draw the user's join date
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `30px sans`;
        ctx.fillText(`Joined: ${moment(target.joinedAt).utc().format('MM/DD/YYYY | h:mm A')}`, 250, 105)

        //Draw the user's creation date
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `30px sans`;
        ctx.fillText(`Created: ${moment(target.user.createdAt).utc().format('MM/DD/YYYY | h:mm A')}`, 250, 140)

        //Draw the user's highest role
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `30px sans`;
        ctx.fillText(`Role: ${target.roles.highest.name}`, 250, 175)

        //Draw the user's ID
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `30px sans`;
        ctx.fillText(`ID: ${target.user.id}`, 250, 210)




        //Draw the user's avatar and make it round.
	    ctx.beginPath();
	    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	    ctx.closePath();
        ctx.clip();
	    const avatar = await Canvas.loadImage(target.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        let attachment = new discord.MessageAttachment(canvas.toBuffer(), target.user.username+'_profile.png')
        message.channel.send(attachment);
        
    }

};

