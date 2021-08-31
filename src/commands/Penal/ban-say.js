module.exports = {
  name: "bansay",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    guild.fetchBans()
      .then(bans => channel.send(embed.setDescription(` > 🔐 Sunucunuzda **${bans.size}** banlanmış üye bulunmaktadır!   `)))
      .catch(console.error);
  }
}