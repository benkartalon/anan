const config = require("../../../config.json");
module.exports = {
    name: "tarama",
    aliases: ["t"],
    owner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        const tag = config.registration.GuilDTag
        const memberss = guild.members.cache.filter(member => member.user.username.includes(tag));
        memberss.map(member => member.roles.add(config.roles.ekip))
        return channel.send(embed.setDescription(`${memberss.size} Kişiye ${client.roles.cache.get(config.roles.ekip).name} Rolü verildi`))
    }
}