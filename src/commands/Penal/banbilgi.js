const config = require("../../../config.json")
module.exports = {
    name: "ban-bilgi",
    aliases: ["bansor"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("BAN_MEMBERS") && message.member.roles.cache.has(config.penals.ban.staff)) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!"));

        let kullanici = args[0];

        if (!kullanici) return channel.send(embed.setDescription("Öncelikle bir kullanıcı ID girmen gerek!"))

        guild.fetchBans()

            .then(bans => {

                if (!bans.has(kullanici)) {

                    return channel.send(embed.setDescription(`Bu kullanıcı banlanmamış.`))

                }

            })

        guild.fetchBan(kullanici).then(({ user, reason }) => {

            channel.send(embed.setDescription(`${user.tag} adlı kullanıcının ban sebebi: **${reason}**`))



        })

    }
}