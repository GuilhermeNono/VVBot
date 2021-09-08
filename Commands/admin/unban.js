const checkPermission = require('../../modules/checkPermission')
module.exports = {
    name:"unban",
    aliases: ["ub"],
    description: "Comando para retirar o Ban de um usuario.",
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
            .setDescription(" Foi encontrado, no comando de desbanir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ")
            .addField('**:orange_book:  Comando de Unban |** ', '\u200b')
            .addFields(
                { name: ':small_orange_diamond: Desbanir por Menção | ', value: '`t!unban @Discord`' },
                { name: ':small_orange_diamond: Desbanir por ID | ', value: '`t!unban 261945904829956097`' }
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
    
            let userOutOfGuild = false;
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

        //Procurando pelo usuario banido, e se o usuario realmente estiver banido, o mesmo será desbanido logo em seguida.
        const banList = await message.guild.bans.fetch()
        const bannedUser = banList.get(userID);
        let userIsNotBan = new Discord.MessageEmbed()
            .setColor("#5dd408")
            .setTitle("**Esse usuario não está banido**")
        if (!bannedUser) return message.channel.send({ embeds: [userIsNotBan] })
        message.guild.members.unban(person).then(() => message.react("✅").then(() => setTimeout(() => message.delete(), 5000)))
        
    }
}