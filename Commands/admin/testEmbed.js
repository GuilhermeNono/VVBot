module.exports = {
    name:"testEmbed",
    aliases: ['te'],
    description: "Comando para testar mensagens Embed.",
    async execute(client, message, args, Discord) {
        if(message.author.id !== "261945904829956097") return
        let userDontHave = new Discord.MessageEmbed()
            .setColor("#ffc74f") 
            .setDescription(`Gosta de alguma dessas cores?`)
            .addFields(
                {name:"🟣 🡻 ", value: "│Roxo│", inline:true},
                {name:"🟠 🡻 ", value: "│Laranja│ ", inline:true},
                {name:"🟡 🡻 ", value: "│Amarelo│ ", inline:true},
                {name:"🔵 🡻 ", value: "│Azul│ ", inline:true},
                {name:"🔴 🡻 ", value: "│Vermelho│ ", inline:true},
                {name:"🟢 🡻 ", value: "│Verde│ ", inline:true},
            )

        message.channel.send({embeds: [userDontHave]})
    }
}