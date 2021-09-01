module.exports = {
    name: 'ping',
    aliases: ["a"],
    description: 'Comando de ping pong para teste(fun).', 
    async execute(client, message, args) {
        message.channel.send('pong!')
    }
}