const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "kanal-bilgi",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    const ok = message.client.emojis.cache.get("");
  
var embed = new Discord.MessageEmbed()

.setAuthor('#' + message.channel.name, message.guild.iconURL())
.addField(" ID", message.channel.id)

if (message.channel.nsfw) {
  
embed.addField(" Uygunsuz İçerik", "Evet", true) 
} 
  
else {
  
embed.addField(" Uygunsuz İçerik", "Hayır", true)
}
  
embed.addField('Oluşturulduğu Tarih:', moment(message.channel.createdAt).format('DD/MM/YYYY'), true)
  
.setColor('BLACK')
.setThumbnail(message.guild.iconURL())
.setFooter("Jahky - Matthe")
  
message.channel.send(embed)
  }
}