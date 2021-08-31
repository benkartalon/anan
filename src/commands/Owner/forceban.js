const db = require('quick.db');
const config = require("../../../config.json")

module.exports = {
    name: "forceban",
    aliases: ["kalıcıban"],
    guildowner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription(`Öncelikle kalıcı banlanacak kullanıcıyı belirtmelisin!`))
        let reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(embed.setDescription(`Öncelikle geçerli bir sebep belirtmelisin!`))
        message.guild.members.ban(member.id, { reason: "Force Ban" })
        db.add(`ceza_${guild.id}`, 1)
        channel.send(embed.setDescription(`${member} - \`${member.id}\` kullanıcısı ${author} tarafından **${reason}** sebebiyle sunucudan banlandı!`))
        client.channels.cache.get(config.penals.ban.log).send(embed.setImage("https://i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif").setDescription(`${member} - \`${member.id}\` adlı kullanıcı ${message.author} tarafından **${reason}** sebebiyle sunucudan banlandı!`).addField("Ceza ID", `#${db.fetch(`ceza_${message.guild.id}`)}`));
        db.set(`ban.${member.id}`, true)
    }
}