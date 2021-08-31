const config = require("../../../config.json")

module.exports = {
    name: "designer",
    aliases: ["tasarımcı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!"))
        if (!member) return channel.send(embed.setDescription("Öncelikle bir kullanıcıyı etiketle."))
        member.roles.add(config.roles.designerrole)
        channel.send(embed.setDescription(`${member} kullancısına başarıyla \`Designer\` rolü verildi!`))
    }
}