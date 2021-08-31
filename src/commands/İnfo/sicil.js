const Discord = require("discord.js");
const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
  name: "sicil",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("BAN_MEMBERS")) return message.channel.send()
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const points = db.fetch(`points_${member}`) || 0
    if (!member) return message.channel.send("Öncelikle siciline bakacağın kullanıcıyı belirtmelisin.")
    let penals = db.get(`sicil_${member.user.id}`);
    if (!penals) return message.channel.send(`${member} kullanıcısının sicil verisi bulunmamaktadır!`)
    message.channel.send(embed
      .setColor("RED")
      .setTitle(`Kullanıcı sicili`)
      .setDescription(penals.map((data) => `${data}`).join("\n"))
      .addField("Toplam ceza puanı:", points))
  }
}