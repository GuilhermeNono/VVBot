const MembersCount = require('../cycleEvents/countMembers')

module.exports = (client, Discord) => {
    console.log('Bot iniciado com sucesso!')
    MembersCount(client);
}