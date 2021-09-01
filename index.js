const Discord = require('discord.js');
Client = Discord.Client
Intents = Discord.Intents
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})
const fs = require('fs')
require('dotenv').config();

client.commands = new Discord.Collection();

['commands_handler', 'events_handler'].forEach( handler =>{
    require(`./Handler/${handler}`)(client, Discord)
})

client.login(process.env.DISCORD_TOKEN);