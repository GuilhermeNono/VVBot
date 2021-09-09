const ms = require('ms')
module.exports = async (client) => {
    /*Puxando o servidor pelo id*/
    const guild = client.guilds.cache.get('877595233829916713')
    /*Setando o tempo em 10 minutos*/
    let time = ms('10m')
    /*Criando um temporizador para que a cada 10 minutos ele atualize o canal.*/
    setInterval(() => {
        /*Puxando a quantidade de membros no servidor*/
        const memberCount = guild.memberCount
        /*Setando o canal que será editado com o numero de pessoas presentes no servidor*/
        const channel = guild.channels.cache.get('885287942153732096')
        /*Editando o nome do canal*/
        channel.setName(`👥┃Membros ━ᐅ ${memberCount}`)
    }, time);
}