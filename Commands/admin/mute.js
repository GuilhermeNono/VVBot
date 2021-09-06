const ms = require('ms')
const checkPermission = require('../../modules/checkPermission')
module.exports = {
    name: "mute",
    aliases: ['mt'],
    description: "Comando para deixar o usuario mutado por tempo ilimitado.",
    async execute(client, message, args, Discord) {
        //t!mute @Discord Por que sim
        if (message.deletable) message.delete();

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
            .setDescription(" Foi encontrado, no comando de mutar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ")
            .addField('**:orange_book:  Comando de Mute |** ', '\u200b')
            .addFields(
                { name: ':small_orange_diamond: Mutar por Menção | ', value: '`t!tempmute @Discord Regra[1]`' },
                { name: ':small_orange_diamond: Mutar por ID | ', value: '`t!tempmute 261945904829956097 Regra[1]`' }
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
            .setDescription("Você está tentando mutar a si mesmo, e isso não faz o menor sentido.")
            .setTitle("**Você não pode se mutar**")
        if (person.user.id === message.author.id) return message.channel.send({ embeds: [autoMute] }).then(m => setTimeout(() => m.delete(), 7000))
        let personRoles = person.roles.cache.map(role => role.id)
        let denyTargetUserRole = checkPermission.CheckPerm(personRoles, highRole)
        let userCannotBeMuted = new Discord.MessageEmbed()
            .setColor('#fa4848')
            .setDescription("Você não pode mutar esse usuario. Aparentemente, ele possui um alto cargo, e por conta disso, ele não poderá ser mutado.")
            .setTitle("**Usuario de alto cargo**")
        if (!denyTargetUserRole) return message.channel.send({ embeds: [userCannotBeMuted] }).then(m => setTimeout(() => m.delete(), 7000))
        //Criando uma variavel que armazene o motivo
        let reason = message.content.split(" ").splice(2).join(" ")
        if(reason === '') reason = "Indefinido"

        //Criando, definindo a posição do cargo na hierarquia e setando para cada canal do servidor a devida permissão do cargo.
        let muteRole = await message.guild.roles.cache.find(role => role.name === "Muted");
        let cargos = await message.guild.roles.fetch().then(f => {
            return f.size
        })
        let cargosSize = cargos - 2

        if (!muteRole) {
            let guildRole = await message.guild.roles.create({
                name: 'Muted',
                permissions: ['VIEW_CHANNEL'],
                position: cargosSize,
                mentionable: false
            }).then(f => {
                message.guild.channels.cache.each(channel => {
                    channel.permissionOverwrites.edit(f.id, { SEND_MESSAGES: false, ADD_REACTIONS: false })
                });
                muteRole = f
            })
        } else {
            message.guild.channels.cache.each(channel => {
                channel.permissionOverwrites.edit(muteRole, { SEND_MESSAGES: false, ADD_REACTIONS: false })
            })
        }

        //Adicionando o cargo de "Muted" no usuario mutado e criando os templates para as punições

        let alreadyHasRole = checkPermission.CheckPerm(personRoles, [muteRole.id])
        let alreadyHasRoleEmbed = new Discord.MessageEmbed()
            .setColor("#fc7703")
            .setTitle("**Esse usuario já esta mutado**")
        if (alreadyHasRole === false) return message.channel.send({ embeds: [alreadyHasRoleEmbed] })

        person.roles.add(muteRole.id);

        let idDesc = new Discord.MessageEmbed()
            .setTitle(`${person.user.tag}`)
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setThumbnail("https://media.discordapp.net/attachments/801240324696702996/884460358511783976/3422250.png")
            .setColor("#ffae3d")
            .setDescription("**:clipboard: Informações do usuario:**")
            .addField(":mega: Username | ", `${person.user.tag}`, true)
            .addField(":mute: Tipo de punição | ", "__Mute__", true)
            .addField(":stopwatch: Tempo de punição |", "**:lock: Indeterminado**", true)
            .addField(":id: | ", `${person.user.id}`)
            .addField(":bookmark_tabs: Motivo da punição | ", reason, true)
            .addField(":monkey: Punido por | ", `${message.author}`)

        let muteDesc = new Discord.MessageEmbed()
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setColor("#b8ff3d")
            .setDescription(`**:bookmark: Motivo da punição ➟ **${reason}`)
            .setThumbnail("https://media.discordapp.net/attachments/784542362813988904/883016645545721946/tohru-tohru-talk.gif")
            .addField(":speak_no_evil: Usuario Mutado | ", `${person.user} 🡳 ${person.user.tag}`, true)
            .addField(":timer: Tempo de Mute | ", "➟ " + "**:lock: Indeterminado**", true)
            .setImage("https://media.discordapp.net/attachments/784542362813988904/883019655600554074/dragon-maid-tohru-eye.gif")
            .setFooter("Você não tá falando muito agora, não é?", "https://media.discordapp.net/attachments/784542362813988904/883003585854603334/Screenshot_20210902-120206.png?width=673&height=701")

        //Setando os canais publicos e privados, e por ultimo, adicionando um teporizador para retirar o cargo de "Muted" depois de um certo tempo.
        let pubChannel = message.guild.channels.cache.find(Channell => Channell.id === "884447339480232006")
        let privChannel = message.guild.channels.cache.find(Channell => Channell.id === "884448787286863902")

        let muteSuccess = new Discord.MessageEmbed()
            .setColor('#0aff70')
            .setTitle("**Usuario mutado com sucesso.**")
        pubChannel.send({ embeds: [muteDesc] }).then(() => privChannel.send({ embeds: [idDesc] }))
        message.channel.send({ embeds: [muteSuccess] }).then(m => setTimeout(() => m.delete(), 5000))
    }
}