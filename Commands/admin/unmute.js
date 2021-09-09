const checkPermission = require('../../modules/checkPermission')
module.exports = {
    name:"unmute",
    aliases: ["um"],
    description: "Comando para retirar o Mute de um usuario.",
    async execute(client, message, args, Discord) {
        //t!unmute @Discord
        //Verificando se o usuario tem o cargo necessario para usar esse comando
        let memberAuthor = message.guild.members.cache.get(message.author.id).roles.cache.map(role => role.id)
        let highRole = ["878372476390875197", "735147189432483920"]

        let denyHighRole = checkPermission.CheckPerm(memberAuthor, highRole)
        let missingPermission = new Discord.MessageEmbed()
            .setColor("#fc3d03")
            .setTitle("**Você não tem permissão para usar esse comando.**")
            .setFooter("Permissão nivel administrador.")
        if (denyHighRole) return message.channel.send({ embeds: [missingPermission] }).then(m => setTimeout(() => m.delete(), 5000))

        //Criando uma variavel com as informações do membro, e logo abaixo, verificando se o usuario não digitou o membro errado e se o membro pode ser punido.
        let errorCode = new Discord.MessageEmbed()
            .setColor('#c5f542')
            .setTitle('**:warning: Erro de Sintaxe :warning:**')
            .setDescription(" Foi encontrado, no comando de desmutar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ")
            .addField('**:orange_book:  Comando de Unmute |** ', '\u200b')
            .addFields(
                { name: ':small_orange_diamond: Desmutar por Menção | ', value: '`t!unmute @Discord`' },
                { name: ':small_orange_diamond: Desmutar por ID | ', value: '`t!unmute 261945904829956097`' }
            )
            .setAuthor('Usuario Invalido.', 'https://media.discordapp.net/attachments/776094611470942208/884467223807283211/kisspng-facilities-details-5bf228950826c3.5532367115425967570334.png')
            .setFooter('Tohru', 'https://media.discordapp.net/attachments/776094611470942208/884467429588226098/Screenshot_20210902-120206.png?width=673&height=701')
        let personCheck = message.mentions.users.first() === undefined
        if (args[0] === undefined || '') return message.channel.send({ embeds: [errorCode] })
        if (/^[a-zA-Z]+$/.test(args[0])) {
            return message.channel.send({ embeds: [errorCode] })
        }
        let person = personCheck ? await message.guild.members.fetch(args[0]).catch(() => { return false })
            : await message.guild.members.fetch(message.mentions.users.first().id).catch(() => { return false })
        if (person === false) return message.channel.send({ embeds: [errorCode] })

        //Procurando pelo cargo Muted e retirando o cargo do usuario, caso ele ainda esteja mutado
        let muteRole = await message.guild.roles.cache.find(role => role.name === "Muted");
        let personRoles = person.roles.cache.map(role => role.id)
        let alreadyHasRole = checkPermission.CheckPerm(personRoles, [muteRole.id])
        let userIsNotMuted = new Discord.MessageEmbed()
            .setColor("#5dd408")
            .setTitle("**Esse usuario não está mutado**")
        if (alreadyHasRole) return message.channel.send({ embeds: [userIsNotMuted] })
        person.roles.remove(muteRole.id).then(() => message.react("✅").then(() => setTimeout(() => message.delete(), 5000)))
        
    }
}