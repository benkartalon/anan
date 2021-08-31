const Discord = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "rolsüz",
    aliases: ["r"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if(!message.member.hasPermission("ADMINISTRATOR"))
        return 


        let user = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)

        if (args[0] == "ver") {
            user.forEach(r => {
                r.roles.add(config.registration.unregistered)
            })
            const khold = new Discord.MessageEmbed()
                .setAuthor(" " + author.username + " ", author.avatarURL())
                .setColor("2F3136")
                .setDescription(`**❯** Sunucuda rolü olmayan " **` + user.size + `** " kişiye sunucu üyesi rolü verildi!`)
            return channel.send(khold)
        } else if (!args[0]) {
            const khold1 = new Discord.MessageEmbed()
                .setAuthor("" + author.username + " ", author.avatarURL())
                .setColor("2F3136")
                .setDescription("**❯** Sunucumuzda rolü olmayan \`" + user.size + "\` kişi var. Bu kişilere üye rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
            return channel.send(khold1)
        }
    }
}