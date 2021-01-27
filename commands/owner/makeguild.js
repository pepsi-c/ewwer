const discord = require('discord.js');

module.exports = {
        name: "makeguild",
        aliases: ["newguild"],
        category: "Owner",
        description: "Makes a new guild.",
        usage: "$makeguild <guild name>",
    run: async (bot, message, args,) => {

        if(message.author.id !== '706516757132738601'){
            return message.channel.send('Only Clouds can run this command.')
        }

        if(!args) return message.channel.send('Please specify a name for the guild!')

        var guild = await bot.guilds.create(args.join(" "))
        var channel = await guild.channels.create("general")
        var invite = await channel.createInvite()

        async function headRole(){
            await guild.roles.create({
            data: {
              name: 'Head Admin',
              color: 'BLACK',
              permissions: 'ADMINISTRATOR',
              position: 0,
              mentionable: false
            },
            reason: 'Created for idk.',
          })
            .then()
            .catch(console.error);
        }

        try  {
            await message.channel.send('Creating the guild... **Invite**: '+ invite.url)
            await headRole()

            function addDuccRole(){
                let roleName = 'Head Admin'
                let role = guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());

                bot.on('guildMemberAdd', async (member) => {
                    if(member.user.id == '615719863335518237') {
                        member.roles.add(role)
                    }
                })
            }

            setTimeout(addDuccRole, 500, 'funky');

            return
        } catch (error) {
            
        }

    }

};

