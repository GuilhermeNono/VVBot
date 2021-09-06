module.exports = {
    name:"testEmbed",
    aliases: ['te'],
    description: "Comando para testar mensagens Embed.",
    async execute(client, message, args, Discord) {
        if(message.author.id !== "261945904829956097") return
        let errorTime = new Discord.MessageEmbed()
            .setTitle('**:warning: Erro de Sintaxe :warning:**')
            .setColor('#c5f542')
            .addField('Tempo Não definido.', `"${time}" não é um tempo valido.`)

        message.channel.send({embeds: [errorTime]})
    }
}