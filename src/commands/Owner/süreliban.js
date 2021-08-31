const Discord = require("discord.js");
const db = require("quick.db")
const ms = require("ms");
const config = require("../../../config.json");
const moment = require("moment")

module.exports = {
    name: "süreliban",
    aliases: [],
    guildowner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        let guild = message.guild
        let member = message.mentions.users.first();
        if (!member) return message.reply("Öncelikle banlanacak kullanıcıyı belirtmelisin.")
        let süre = args[1]
        if (!süre) return message.reply("Lütfen Bir Süre belirtin.")
        message.guild.members.ban(member, 2)
        message.channel.send(`${member} kullanıcısı başarıyla süreli olarak banlandı!`)
        db.add(`ceza_${message.guild.id}`, 1)
        const embed = new Discord.MessageEmbed()
      .setColor("0x00AE86")
      .setTimestamp()
      .addField("Ceza ID", `#${db.fetch(`ceza_${message.guild.id}`)}`)
      .addField('Banlanan:', `${member.username}#${member.discriminator} (${member} - ${member.id})`)
      .addField('Banlayan:', `${message.author.username}#${message.author.discriminator} (${message.author} - ${message.author.id})`)
      .addField('Ban Sebebi', reason)
      .addField("Ban Tarihi", `${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(config.penals.ban.log).send(embed)
    db.push(`sicil_${member.id}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle [ SURELI-BAN ] cezası almış.`)
          db.add(`points_${member}`, config.penals.points.banpoints);
        setTimeout(() => {
            message.guild.members.unban(member)
            message.guild.channels.cache.get(config.penals.ban.log).send(`${member} kullanıcısının banının süresi bittiği için banı açıldı!`)
        }, ms(süre))
    
    }
}