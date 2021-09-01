module.exports = async (client) => {
    const guild = client.guilds.cache.get('466405222877495299')
    setInterval(() => {
        const memberCount = guild.memberCount
        const channel = guild.channels.cache.get('842314262847815680')
        channel.setName(`| Membros ➟ ${memberCount}|`)
    }, 10000);
}