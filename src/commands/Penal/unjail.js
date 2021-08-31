const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../../config.json")

module.exports = {
  name: "unjail",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (message.member.roles.has(config.penals.jail.staff) && message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`))
    let member = message.mentions.members.first()
    if (!member) return message.channel.send(embed.setDescription(`Bir Üye Etiketle`))
    let rol = await db.get(`roles.${member.id}`);
    let nick = await db.get(`isim.${member.id}`)
    member.roles.set(rol).catch(e => { });
    member.setNickname(nick)
    channel.send(embed.setDescription(`${member} kullanıcısı başarıyla ${author} tarafından jailden çıkartıldı!`))
    const embed2 = new Discord.MessageEmbed()
    .setColor("0x00AE86")
    .setTimestamp()
    .addField('Jaili kalkan:', `${member.tag} (${member} - ${member.id})`)
    .addField('Yetkili:', `${author.tag} (${author} - ${author.id})`)
    .addField("Kalkma Tarihi", `${moment(Date.now()).format("LLL")}`)
    client.channels.cache.get(config.penals.jail.log).send(embed2)
    db.delete(`eskirolleri.${member.id}`);
    db.delete(`isim.${member.id}`);
  }
}