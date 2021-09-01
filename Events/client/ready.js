const MembersCount = require('../cycleEvents/countMembers')

module.exports = (Discord, client) => {
    console.log('Bot iniciado com sucesso!')
    MembersCount(client);
}