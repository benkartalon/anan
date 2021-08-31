const config = require("../../../config.json")

module.exports = {
    name: "vip",
    aliases: ["valuable", "very-important-person", "veryimportantperson"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"))
        if (!member) return channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."))
        member.roles.add(config.roles.viprole)
        channel.send(embed.setDescription(`${member} kullanıcısına başarıyla \`Vip\` rolü verildi!`))
    }
}