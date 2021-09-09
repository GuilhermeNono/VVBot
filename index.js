const Discord = require('discord.js');
let Client = Discord.Client
let Intents = Discord.Intents
const client = new Client(
    {
        intents: [Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
        partials: ['USER', 'REACTION', 'MESSAGE']
    })
const fs = require('fs')
require('dotenv').config();

client.commands = new Discord.Collection();

['commands_handler', 'events_handler'].forEach(handler => {
    require(`./Handler/${handler}`)(client, Discord)
})

client.login(process.env.DISCORD_TOKEN);
//https://Discord.com/oauth2/authorize?client_id={idbot}&scope=bot&permissions=8
