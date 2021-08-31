module.exports = {
    name: "ping",
    aliases: [],
    owner: true,
    execute: async(client, message) => {
        message.channel.send(`Anlık pingim: " ${client.ws.ping} ms"`)
    } 
}