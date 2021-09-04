const ms = require('ms')
const checkPermission = require('../../modules/checkPermission')
module.exports = {
    name: "tempmute",
    aliases: ["tm"],
    description: "Comando para deixar o usuario mutado por tempo limitado.",
    async execute(client, message, args, Discord) {
        //.tempmute @Discord 2m regra 1

        if (message.deletable) message.delete();

        //Verificando se o usuario tem o cargo necessario para usar esse comando
        let memberAuthor = message.guild.members.cache.get(message.author.id).roles.cache.map(role => role.id)
        let highRole = ["878372476390875197","735147189432483920"]

        let denyHighRole = checkPermission.CheckPerm(memberAuthor,highRole)
        if(denyHighRole) return message.channel.send("pinto pintinho pintao")

        //Criando uma variavel com as informações do membro, e logo abaixo, verificando se o usuario não digitou o membro errado e se o membro pode ser punido.
        let personCheck = message.mentions.users.first() === undefined
        let person = personCheck ? await message.guild.members.fetch(args[0]) : await message.guild.members.fetch(message.mentions.users.first().id)
        if (/^[a-zA-Z]+$/.test(person)) {
            let errorCode = new Discord.MessageEmbed()
                .setColor('#4293f5')
                .setTitle('**:regional_indicator_x: Erro de Sintaxe :regional_indicator_x:**')
                .setDescription(" Foi encontrado, no comando de mutar usuarios, um erro de Sintaxe. Lembrando que, não é preciso incluir o motivo do mute no mesmo comando, o bot pedirá logo apos o motivo do mesmo. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ")
                .addField('**:blue_book:  Comando de Mute |** ', '\u200b')
                .addFields(
                    { name: ':small_blue_diamond: Mutar por Menção | ', value: '`.tempmute @Discord`' },
                    { name: ':small_blue_diamond: Mutar por ID | ', value: '`.tempmute 261945904829956097`' }
                )
                .setAuthor('Usuario Invalido.', 'https://www.freeiconspng.com/uploads/blue-x-png-1.png')
                .setFooter('Peach', 'https://media.discordapp.net/attachments/776094611470942208/801219459909287987/peach_san.png?width=701&height=701')
            return message.channel.send({ embeds: [errorCode] })
        }
        let personRoles = person.roles.cache.map(role => role.id)
        let denyTargetUserRole = checkPermission.CheckPerm(personRoles,highRole)
        if(!denyTargetUserRole) return message.channel.send("pinto pintinho pintao")
        //Criando variavel para armazenar o tempo e verificando se o usuario digitou corretamente esse parametro.
        let time = args[1];
        let errorTime = new Discord.MessageEmbed()
            .setTitle('**:regional_indicator_x: Erro de Sintaxe :regional_indicator_x:**')
            .setColor('#4293f5')
            .addField('Tempo Não definido.', `"${time}" não é um tempo valido.`)
        if (time === undefined) return message.channel.send({ embeds: [errorTime] })
        var firstChar = time.charAt(0);
        if (!(firstChar <= '9' && firstChar >= '0')) {
            return message.channel.send({ embeds: [errorTime] })
        }

        //Criando uma variavel que armazene o motivo
        let reason = message.content.split(" ").splice(3).join(" ")

        //Criando, definindo a posição do cargo na hierarquia e setando para cada canal do servidor a devida permissão do cargo.
        let muteRole = await message.guild.roles.cache.find(role => role.name === "Muted");
        let cargos = await message.guild.roles.fetch().then(f => {
            return f.size
        })
        let cargosSize = cargos - 2
        time = ms(time)


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

            })
        } else {
            message.guild.channels.cache.each(channel => {
                channel.permissionOverwrites.edit(muteRole, { SEND_MESSAGES: false, ADD_REACTIONS: false })
            })
        }




    }
}