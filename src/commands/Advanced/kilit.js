module.exports = {
    name: "kilit",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.`);
        const content = args[0];

        if (content === "aç") {
            let every = guild.roles.cache.find(r => r.name === '@everyone')
            channel.createOverwrite(every, {
                'SEND_MESSAGES': null,

            })
            return channel.send(embed.setDescription("Kanal kilidi açıldı!"));
        }

        if (content === "kapat") {
            let every = guild.roles.cache.find(r => r.name === "@everyone");
            channel.createOverwrite(every, {
                SEND_MESSAGES: false
            });
            return channel.send(embed.setDescription("Kanal kilitlendi!"));
        }
    }

}