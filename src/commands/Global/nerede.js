module.exports = {
    name: "nerede",
    aliases: ["ss", "n"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!user) return channel.send("Öncelikle bir kullanıcı etiketle!")

        let sonuc; if (!user.voice.channelID) sonuc = `**${user.displayName}** kullanıcısı herhangi bir ses kanalında değil.`; if (user.voice.channelID) sonuc = `${user.displayName} kullanıcısı \`${user.voice.channel.name}\` isimli sesli odaya bağlı! Ses kanalı: ${user.voice.channel}`

        channel.send(sonuc)
    }
}