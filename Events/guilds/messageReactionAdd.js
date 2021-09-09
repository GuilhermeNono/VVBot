module.exports = async (client, Discord, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();


    if (user.bot) return;
    if (!reaction.message.guild) return;

    /**Cargo interesses*/if (reaction.message.id === '885321736676057138') {
        const msg = await reaction.message.channel.messages.fetch('885321736676057138');
        switch (reaction.emoji.name) {

            /*Artista*/case '🎨':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885300976611885057')
                msg.reactions.resolve("🎨").users.remove(user.id);
                break;

            /*Programador*/case '💾':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885300941908221982')
                msg.reactions.resolve("💾").users.remove(user.id);
                break;

            /*Escritor*/case '📝':
                await reaction.message.guild.members.cache.get(user.id).roles.add('883414460444852225')
                msg.reactions.resolve("📝").users.remove(user.id);
                break;

            /*Youtuber*/case '🎬':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885301239343108118')
                msg.reactions.resolve("🎬").users.remove(user.id);
                break;

            /*Streamer*/case '🎥':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885301275544141826')
                msg.reactions.resolve("🎥").users.remove(user.id);
                break;
        }

    } else /**Cargo Cores */if (reaction.message.id === '885331111595634768') {
        const msg = await reaction.message.channel.messages.fetch('885331111595634768');
        switch (reaction.emoji.name) {

            /* Roxo*/case '🟣':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885328007164751922')
                msg.reactions.resolve("🟣").users.remove(user.id);
                break;

            /* Laranja*/case '🟠':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885327469182324807')
                msg.reactions.resolve("🟠").users.remove(user.id);
                break;

            /* Amarelo*/case '🟡':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885327510198448179')
                msg.reactions.resolve("🟡").users.remove(user.id);
                break;

            /* Azul*/case '🔵':
                await reaction.message.guild.members.cache.get(user.id).roles.add('880613659729080322')
                msg.reactions.resolve("🔵").users.remove(user.id);
                break;

            /* Vermelho*/case '🔴':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885326446497759293')
                msg.reactions.resolve("🔴").users.remove(user.id);
                break;
            /* Verde*/case '🟢':
                await reaction.message.guild.members.cache.get(user.id).roles.add('885326512461582336')
                msg.reactions.resolve("🟢").users.remove(user.id);
                break;
        }
    }
}