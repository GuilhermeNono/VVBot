module.exports = {
    name:"testEmbed",
    aliases: ['te'],
    description: "Comando para testar mensagens Embed.",
    async execute(client, message, args, Discord) {
        if(message.author.id !== "261945904829956097") return
        let userDontHave = new Discord.MessageEmbed()
            .setColor("#5dd408")
            .setTitle("**Esse usuario não está mutado**")

        message.channel.send({embeds: [userDontHave]})
    }
}