const Discord = require('discord.js');
const client = new Discord.Client({intents:["GUILDS", "GUILD_MESSAGES"]})
const fs = require('fs')
require('dotenv').config();

client.commands = new Discord.Collection();

['commands_handler', 'events_handler'].forEach( handler =>{
    require(`./Handler/${handler}`)(client, Discord)
})

client.login(process.env.DISCORD_TOKEN);