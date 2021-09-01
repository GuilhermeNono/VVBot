const fs = require('fs')

module.exports = (client, Discord) => {
    let load_dir = (dir) => {
        const command_files = fs.readdirSync(`./Commands/${dir}`).filter(f => f.endsWith(".js"));

        for (const file of command_files) {
            const command = require(`../Commands/${dir}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
                command.aliases.forEach(aliass => {
                    client.commands.set(aliass, command);
                })
            } else  {
                continue;
            }
        }
    }

    ['admin', 'fun'].forEach(e => load_dir(e))

}