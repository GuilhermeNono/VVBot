module.exports = {
    name: "teste",
    aliases: ["b"],
    description: "Comando para teste(admin).",
    async execute(client,message, Discord ) {
        message.channel.send("testando")
    }
}