require('dotenv').config();
module.exports = (client, Discord, message) => {
    const prefix = process.env.BOT_PREFIX
    if (message.content === prefix) return
    if (!message.content.startsWith(prefix) || message.author.bot) return
    if (message.guild.id !== "877595233829916713") return message.channel.send("Esse bot é exclusivo do servidor Okami's Coffee")
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.execute(client, message, args, Discord);
}