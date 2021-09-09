const checkPermission = require('../../modules/checkPermission')
module.exports = {
    name: "ban",
    aliases: ['bn', 'banir'],
    description: "Comando para banir usuarios por tempo indeterminado.",
    async execute(client, message, args, Discord) {
        //t!ban @Discord regra 1

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
                { name: ':small_orange_diamond: Banir por Menção | ', value: '`t!tempban @Discord 1h Regra[1]`' },
                { name: ':small_orange_diamond: Banir por ID | ', value: '`t!tempban 261945904829956097 1h Regra[1]`' }
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

        let userTag;
        let userID;
        let userMention;

        /*🢛 Varivel que servirá de verificador para saber se o usuario está ou não no servidor. Caso a variavel se mantenha como
        "false", isso significará que o usuario está dentro do servidor.*/
        let userOutOfGuild = false;
        /*🢛 Varivel que informará, se o retorno da variavel "person" é "Guildmember" se o usuario estiver no servidor, ou 
        "User" se o usuario estiver fora.*/
        let userGuildMember = true;

        //#region Caso o usuario esteja ou não no servidor ->
        switch (person) {
            case false:
                try {
                    person = await client.users.fetch(args[0])
                    userOutOfGuild = true
                    userTag = person.tag;
                    userID = person.id;
                    userMention = person;
                    userGuildMember = false;
                } catch {
                    return message.channel.send({ embeds: [errorCode] })
                }
                break;
        }

        if (userGuildMember) {
            userTag = person.user.tag;
            userID = person.user.id;
            userMention = person.user;
        }
        //#endregion


        if (!userOutOfGuild) {
            let autoBan = new Discord.MessageEmbed()
                .setColor('#69f542')
                .setDescription("Você está tentando banir a si mesmo, e isso não faz o menor sentido.")
                .setTitle("**Você não pode se banir**")
            if (person.user.id === message.author.id) return message.channel.send({ embeds: [autoBan] }).then(m => setTimeout(() => m.delete(), 7000))
            let personRoles = person.roles.cache.map(role => role.id)
            let denyTargetUserRole = checkPermission.CheckPerm(personRoles, highRole)
            let userCannotBeBan = new Discord.MessageEmbed()
                .setColor('#fa4848')
                .setDescription("Você não pode punir esse usuario. Aparentemente, ele possui um alto cargo, e por conta disso, ele não poderá ser punido.")
                .setTitle("**Usuario de alto cargo**")
            if (!denyTargetUserRole) return message.channel.send({ embeds: [userCannotBeBan] }).then(m => setTimeout(() => m.delete(), 7000))
        }

        //Criando uma variavel que armazene o motivo
        let reason = message.content.split(" ").splice(2).join(" ")
        if (reason === '') reason = "Indefinido"

        //Banindo o usuario e criando os MessagesEmbeds

        await message.guild.members.ban(person);

        let idDesc = new Discord.MessageEmbed()
            .setTitle(`${userTag}`)
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setThumbnail("https://media.discordapp.net/attachments/801240324696702996/884460358511783976/3422250.png")
            .setColor("#ffae3d")
            .setDescription("**:clipboard: Informações do usuario:**")
            .addField(":mega: Username | ", `${userTag}`, true)
            .addField(":pirate_flag: Tipo de punição | ", "__Ban__", true)
            .addField(":stopwatch: Tempo de punição |", "**:lock: Indeterminado**", true)
            .addField(":id: | ", `${userID}`)
            .addField(":bookmark_tabs: Motivo da punição | ", reason, true)
            .addField(":monkey: Punido por | ", `${message.author}`)

        let banDesc = new Discord.MessageEmbed()
            .setAuthor(message.author.username, `${message.author.avatarURL()}`)
            .setColor("#ff3d3d")
            .setDescription(`**:bookmark: Motivo da punição ➟ **${reason}`)
            .setThumbnail("https://media.discordapp.net/attachments/784542362813988904/883016645545721946/tohru-tohru-talk.gif")
            .addField(":speak_no_evil: Usuario Banido | ", `${userMention} 🡳 ${userTag}`, true)
            .addField(":timer: Tempo de Ban | ", "➟ " + "**:lock: Indeterminado**", true)
            .setImage("https://media.discordapp.net/attachments/784542362813988904/883025700578271275/tohru-kobayashi-kobayashisan-chi-no-maid-dragon.gif")
            .setFooter("Desapareça por toda eternidade!", "https://media.discordapp.net/attachments/784542362813988904/883003585854603334/Screenshot_20210902-120206.png?width=673&height=701")

        //Setando os canais publicos e privados.
        let pubChannel = message.guild.channels.cache.find(Channell => Channell.id === "884447339480232006")
        let privChannel = message.guild.channels.cache.find(Channell => Channell.id === "884448787286863902")
        //Enviando os embeds para seus respectivos canais
        pubChannel.send({ embeds: [banDesc] }).then(() => {
            privChannel.send({ embeds: [idDesc] })
            message.react("✅").then(() => setTimeout(() => message.delete(), 5000))
        })
    }
}