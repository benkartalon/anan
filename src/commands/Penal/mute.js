const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")

module.exports = {
  name: "mute",
  aliases: ["mute", "sustur"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.mute.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!");
    let member = message.mentions.members.first() || guild.members.cache.get(args[0])
    let user = guild.member(member)
    let reason = args.splice(2).join(" ")
    let sure = args[1]
    if (!user) return channel.send(embed.setDescription(`${author} Lütfen bir kullanıcı belirtiniz`));
    if (!sure) return channel.send(embed.setDescription(`${author} Lütfen bir süre belirtiniz`));
    if (!reason) return channel.send(embed.setDescription(`${author} Lütfen geçerli bir sebeb belirtiniz`));
    sure
      .replace("s", " Saniye")
      .replace("m", " Dakika")
      .replace("h", " Saat")
      .replace("d", " Gün")
      .replace("w", "Hafta")
    if (config.penals.mute.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.mute.limit) return channel.send("Saatlik mute sınırına ulaştın!");
    if (!message.member.hasPermission(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini muteleyemezsin!");

    channel.send(embed.setDescription(`**${member}** kullanıcısı ${author} tarafından başarıyla susturuldu!`))
    member.roles.add(config.penals.mute.roles)
    db.add(`ceza_${guild.id}`, 1)

    const embed2 = new Discord.MessageEmbed()
      .setColor("0x00AE86")
      .setTimestamp()
      .addField("Ceza ID", `#${db.fetch(`ceza_${guild.id}`)}`)
      .addField('Mutelenen:', `${member.username}#${member.user.discriminator} (${member} - ${member.id})`)
      .addField('Muteleyen:', `${author.username}#${author.discriminator} (${author} - ${author.id})`)
      .addField('Mute sebebi', reason)
      .addField("Mute Tarihi", `${moment(Date.now()).format("LLL")}`)
    client.channels.cache.get(config.penals.mute.log).send(embed2);
    db.push(`sicil_${member.id}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle **[ MUTE ]** cezası almış.`)
    db.add(`points_${member}`, config.penals.points.mutepoints);
    if (config.penals.mute.limit > 0) {
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)

      setTimeout(async () => {
        member.roles.remove(config.penals.mute.roles)
        client.channels.cache.get(config.penals.mute.log).send(`${member} kullanıcısının mute süresi bittiği için mutesi açıldı!`)
      }, ms(sure));
    }
  }
}