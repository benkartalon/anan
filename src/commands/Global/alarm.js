const Discord = require('discord.js');
const ms = require('ms');
const config = require("../../../config.json")
const prefix = config.bot.prefix
module.exports = {
    name: "alarm",
    aliases: ["hatırlatıcı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let süre = args[0]

        if (!süre) return channel.send(`${prefix}alarm <1h,1m,1s> <hatırlatacağım şey>`)

        let alarm = args.slice(1).join(' ')

        if (!alarm) return channel.send(`${prefix}alarm <1h,1m,1s> <hatırlatacağım şey>`)

        channel.send(`Alarm kuruldu **${süre}** sonra size bildireceğim.`)

        setTimeout(() => {

            channel.send(`${author}, Hatırlatmamı istediğin şeyin zamanı geldi!\n**${alarm}**`);
            author.send(`${author}, Hatırlatmamı istediğin şeyin zamanı geldi!\n**${alarm}**`)

        }, ms(süre));
    }
}