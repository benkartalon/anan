const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "afk",
    aliases: ["afk"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (message.member.displayName.startsWith("[AFK]")) return;
        let uye = message.guild.members.cache.get(author.id);
        let reason = args.join(' ') || "Sebep belirtilmedi!";
        let nick = uye.displayName;
        db.set(`sebep_${author.id}_${message.guild.id}`, reason);
        db.set(`user_${author.id}_${message.guild.id}`, author.id);
        db.set(`afktime_${message.guild.id}`, Date.now());
        db.set(`nick_${author.id}_${message.guild.id}`, nick);
        let sebep = db.fetch(`sebep_${author.id}_${message.guild.id}`);
        message.member.setNickname(`[AFK] ` + nick);
        channel.send(embed.setDescription(`${author} başarıyla **${sebep}** sebebiyle afk moduna giriş yaptınız.`).setColor('RANDOM'))
    }
}