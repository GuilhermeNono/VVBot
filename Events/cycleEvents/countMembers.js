module.exports = async (client) => {
    const guild = client.guilds.cache.get('466405222877495299')
    setInterval(() => {
        const memberCount = guild.memberCount
        const channel = guild.channels.cache.get('882734568204021801')
        channel.setName(`👥┃Membros ━ᐅ ${memberCount}`)
    }, 10000);
}