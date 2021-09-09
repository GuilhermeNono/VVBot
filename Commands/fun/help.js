const pagination = require('discordjs-button-pagination');
let versionApp = require('../../package-lock.json')
versionApp = versionApp.version;

module.exports = {
    name:"help",
    aliases: ['hp'],
    description: "Comando de ajuda com todos os comandos e parametros.",
    async execute(client, message, args, Discord) {
        //t!help
        const developerMessage = new Discord.MessageEmbed()
        .setTitle("**Ajuda ➔**")
        .setAuthor(message.client.user.username, `${message.client.user.avatarURL()}`)
        .setColor("#8e3deb")
        .setThumbnail("https://media.discordapp.net/attachments/776094611470942208/885266085979512902/exclamation-xxl.png")
        .setDescription(" Olá seres humanos, meu nome é Tohru e sou um bot focado na administração desse servidor. Eu ainda estou em desenvolvimento então erros ou bugs inesperados podem acontecer, no entanto, se caso acontecer, contate o desenvolvedor do bot. :dragon_face: :yellow_heart:")
        .addField("Desenvolvedor 🠗 ", `"Discord.#4953"`)
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.client.user.username} ➔ Lista de Afazeres ✍️🧎‍♀️`, `${message.client.user.avatarURL()}`)
        .setColor('#fcdb03')
        .setDescription(`Aqui está tudo oque devo e posso fazer, mestre ${message.author.username}. O que deseja?`)
        .addFields(
            {name: '**│ 🡻 Administração 🡻 │**', value:"\u200b"},
            {name: "Comando para banir usuarios por tempo indeterminado.", value: "`t!ban {user✅} {reason❌}`"},
            {name: "Comando para expulsar usuarios(usuarios expulsos podem voltar ao servidor).", value: "`t!kick {user✅} {reason❌}`"},
            {name: "Comando para deixar o usuario mutado por tempo **ilimitado**.", value: "`t!mute {user✅} {reason❌}`"},
            {name: "Comando para banir usuarios por tempo **determinado**.", value: "`t!tempban {user✅} {time✅} {reason❌}`"},
            {name: "Comando para deixar o usuario mutado por tempo **limitado**.", value: "`t!tempmute {user✅} {time✅} {reason❌}`"},
            {name: "Comando para retirar o Ban de um usuario.", value: "`t!unban {user✅} {reason❌}`"},
            {name: "Comando para retirar o Mute de um usuario.", value: "`t!unmute {user✅} {reason❌}`"},
            {name: "\u200b", value: "\u200b"},
            {name: "**│ 🡻 Parametros obrigatórios e opcionais 🡻 │**", value: "`✅` ➟ Preenchimento Obrigatório; `❌` ➟ Preenchimento Opcional;"},
            //➤
            {name: "**│ ➤ Como usar os parametros ➤ │**", value: `Version ${versionApp}`},
            )
            const parametersEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.client.user.username} ➔ Lista de Afazeres ✍️🧎‍♀️`, `${message.client.user.avatarURL()}`)
            .setColor('#fcdb03')
            .setDescription(`Você não sabe como preencher os parametros, mestre ${message.author.username}? Sem problemas, vou te ajudar com isso.`)
            .addFields(
                {name: '**│ 🡻 Parametros 🡻 │**', value:"\u200b"},
                {name: ':grey_exclamation: {user}', value:"`@Discord ou 261945904829956097(ID do usuario)` 🡻"},
                {name: ':grey_exclamation: {time}', value:"`(s ➟ seconds; m ➟ minutes; h ➟ hour; d ➟ days) Exemplo: 1h; 10m; 24d(1 hora, 10 minutos e 24 dias)` 🡻"},
                {name: ':grey_exclamation: {reason}', value:"`Banido por inflingir a Regra[1]`"},
                {name: "🡲 Qualquer dúvida, favor entrar em contato com Discord#4953 🡰", value: `Version ${versionApp}`},
            )

        const pages = [
            developerMessage,
            helpEmbed,
            parametersEmbed
        ]
        const button1 = new Discord.MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Previous")
            .setStyle("DANGER");
        const button2 = new Discord.MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Next")
            .setStyle("SUCCESS");

        const buttonList = [button1, button2]
        const timeout = '120000';

        pagination(message, pages, buttonList, timeout)


    }
}