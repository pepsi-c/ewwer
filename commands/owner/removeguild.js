const discord = require('discord.js');

module.exports = {
        name: "removeguild",
        aliases: ["deleteguild"],
        category: "Owner",
        description: "Removes a guild.",
        usage: "$removeguild <guild name>",
    run: async (bot, message, args,) => {

        if(message.author.id !== '706516757132738601'){
            return message.channel.send('Only Clouds can run this command.')
        }

        if(!args) return message.channel.send('Please specify a name for the guild!')

        var guild = await bot.guilds.cache.find(guild => guild.name === args.join(" "))

        try {
            guild.delete()
            return message.channel.send('Successfully deleted the guild!')
        } catch (error) {
            return message.channel.send('Error while deleting the guild!')
        }

    }

};

