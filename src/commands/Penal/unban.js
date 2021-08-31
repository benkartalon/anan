const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../../config.json")
module.exports = {
  name: "unban",
  aliases: ["banremove"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    const permError = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
      .setDescription('Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!')
    const userError = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
      .setDescription('Öncelikle bir ID belirtmelisiniz!')
    const userError2 = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
      .setDescription("Herhangi bir ID'de harf kullanılamaz")
    const userError3 = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
      .setDescription('Belirttiğiniz kullanıcı yasaklanmamış!')
    const levelError = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
      .setDescription('Sizinle aynı veya daha yüksek bir role sahip bir üyenin yasağını kaldırmazsınız')
    if (!message.member.hasPermission("BAN_MEMBERS")) return channel.send
      (permError)
    let user = args[0];
    if (!user) return channel.send
      (userError).catch(console.error)
    if (isNaN(args[0])) return channel.send
      (userError2).catch(console.error)
    if (user.highestRole >= author.highestRole) return channel.send
      (levelError)
    const banList = await guild.fetchBans();
    if (!user.id === banList) return channel.send
      (userError3)

    guild.members.unban(user);
    channel.send(`<@!${user}> kullanıcısının yasağı ${author} tarafından başarıyla kaldırıldı!`)
    const embed = new Discord.MessageEmbed()
      .setColor("0x00AE86")
      .setTimestamp()
      .addField('Banı kaldırılan üye:', `${client.users.cache.get(user.tag)} (<@!${user}> - ${user})`)
      .addField('Yetkili:', `${author.tag} (${author} - ${author.id})`)
      .addField("Tarih", `${moment(Date.now()).format("LLL")}`)
    client.channels.cache.get(config.penals.ban.log).send(embed);
  }
}