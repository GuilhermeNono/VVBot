const MembersCount = require('../cycleEvents/countMembers')

module.exports = (client, Discord) => {
    console.log('Bot iniciado com sucesso!')
    client.user.setActivity('t!help', { type: 'COMPETING' });
    MembersCount(client);
}