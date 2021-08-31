const config = require("../../../config.json")

module.exports = {
  name: "zengin",
  aliases: ["booster"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    let booster = message.guild.roles.cache.get(config.roles.boosterrole)
    if (!message.member.roles.cache.has(booster.id)) return message.reply("Bu komutu kullanabilmek için öncelikle booster olman gerek!")

    let isim = args.slice(0).join(' ');
    if (!isim) return message.reply(`Öncelikle bir kullanıcı adı giriniz!`)
    if (isim.length > 32) return message.reply(`Lütfen **32** karakteri geçmeyen bir isim belirtiniz!`)

    message.guild.members.cache.get(message.author.id).setNickname(isim)
    message.channel.send(`Kullanıcı adın başarıyla \`${isim}\` olarak değiştirildi!`)
  }
}