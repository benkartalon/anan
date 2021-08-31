const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "ban",
  aliases: ["yargı"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("BAN_MEMBERS")) return channel.send("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!");
    

    let member = message.member
    let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if (!user) return channel.send('Öncelikle banlanacak kullanıcıyı belirtmelisin.');
    if (reason.length < 1) return channel.send('Öncelikle geçerli bir sebep belirtmelisin.');

    if (!guild.member(user).bannable) return channel.send('Yetkili kişiler banlanamaz.');
    if (config.penals.ban.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.ban.limit) return channel.send("Saatlik ban sınırına ulaştın!");
    if (!message.member.hasPermission(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!");
    guild.members.ban(user);
    channel.send(embed.setDescription(`**${user.username}** kullanıcısı ${author} tarafından ${reason} sebebiyle sunucudan banlanmıştır!`))
    db.add(`ceza_${guild.id}`, 1)

    const embed2 = new Discord.MessageEmbed()
      .setColor("0x00AE86")
      .setTimestamp()
      .addField("Ceza ID", `#${db.fetch(`ceza_${guild.id}`)}`)
      .addField('Banlanan:', `${user.username}#${user.discriminator} (${user} - ${user.id})`)
      .addField('Banlayan:', `${author.username}#${author.discriminator} (${author} - ${author.id})`)
      .addField('Ban Sebebi', reason)
      .addField("Ban Tarihi", `${moment(Date.now()).format("LLL")}`)
    client.channels.cache.get(config.penals.ban.log).send(embed2);
    db.push(`sicil_${user.id}`, `${author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle **[ BAN ]** cezası almış.`)
    db.add(`points_${member}`, config.penals.points.banpoints);
    if (config.penals.ban.limit > 0) {
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)
    };
  }
};