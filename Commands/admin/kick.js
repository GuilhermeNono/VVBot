const checkPermission = require('../../modules/checkPermission')
module.exports = {
    name: "kick",
    aliases: ['expulsar'],
    description: "Comando para expulsar usuarios(usuarios expulsos podem voltar ao servidor).",
    async execute(client, message, args, Discord) {
        //t!kick @discord

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
            .setDescription(" Foi encontrado, no comando de expulsar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ")
            .addField('**:orange_book:  Comando de Kick |** ', '\u200b')
            .addFields(
                { name: ':small_orange_diamond: Expulsar por Menção | ', value: '`t!kick @Discord Motivo(Opcional)`' },
                { name: ':small_orange_diamond: Expulsar por ID | ', value: '`t!kick 261945904829956097 Motivo(Opcional)`' }
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
        let autoMute = new Discord.MessageEmbed()
            .setColor('#69f542')
            .setDescription("Você está tentando expulsar a si mesmo, e isso não faz o menor sentido.")
            .setTitle("**Você não pode se auto expulsar**")
        if (person.user.id === message.author.id) return message.channel.send({ embeds: [autoMute] }).then(m => setTimeout(() => m.delete(), 7000))
        let personRoles = person.roles.cache.map(role => role.id)
        let denyTargetUserRole = checkPermission.CheckPerm(personRoles, highRole)
        let userCannotBeMuted = new Discord.MessageEmbed()
            .setColor('#fa4848')
            .setDescription("Você não pode punir esse usuario. Aparentemente, ele possui um alto cargo, e por conta disso, ele não poderá ser punir.")
            .setTitle("**Usuario de alto cargo**")
        if (!denyTargetUserRole) return message.channel.send({ embeds: [userCannotBeMuted] }).then(m => setTimeout(() => m.delete(), 7000))

        //Criando uma variavel para armazenar o motivo
        let reason = message.content.split(" ").splice(2).join(" ")
        if (reason === '') reason = "Indefinido"

        //Criando os MessagesEmbeds
        let idDesc = new Discord.MessageEmbed()
            .setTitle(`${person.user.tag}`)
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setThumbnail("https://media.discordapp.net/attachments/801240324696702996/884460358511783976/3422250.png")
            .setColor("#ffae3d")
            .setDescription("**:clipboard: Informações do usuario:**")
            .addField(":mega: Username | ", `${person.user.tag}`, true)
            .addField(":warning: Tipo de punição | ", "__Kick__", true)
            .addField(":stopwatch: Tempo de punição |", args[1], true)
            .addField(":id: | ", `${person.user.id}`)
            .addField(":bookmark_tabs: Motivo da punição | ", reason, true)
            .addField(":monkey: Punido por | ", `${message.author}`)

        let kickDesc = new Discord.MessageEmbed()
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setColor("#ffff3d")
            .setDescription(`**:bookmark: Motivo da punição ➟ **${reason}`)
            .setThumbnail("https://media.discordapp.net/attachments/784542362813988904/883016645545721946/tohru-tohru-talk.gif")
            .addField(":speak_no_evil: Usuario kickado | ", `${person.user} 🡳 ${person.user.tag}`, true)
            .addField(":timer: Tempo de kick | ", "➟ " + args[1], true)
            .setImage("https://media.discordapp.net/attachments/784542362813988904/883020440669397052/Tohru_Kick.gif")
            .setFooter("Peço educadamente que saia daqui.", "https://media.discordapp.net/attachments/784542362813988904/883003585854603334/Screenshot_20210902-120206.png?width=673&height=701")

        //Setando os canais publicos e privados.
        let pubChannel = message.guild.channels.cache.find(Channell => Channell.id === "884447339480232006")
        let privChannel = message.guild.channels.cache.find(Channell => Channell.id === "884448787286863902")

        //Expulsando o usuario.
        person.kick(reason).then(() => message.react("✅").then(() => setTimeout(() => message.delete(), 5000)))
        //Enviando os embeds para seus respectivos canais
        pubChannel.send({ embeds: [kickDesc] }).then(() => {
            privChannel.send({ embeds: [idDesc] })
            message.react("✅").then(() => setTimeout(() => message.delete(), 5000))
        })
    }
}