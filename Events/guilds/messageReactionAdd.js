module.exports = async (client, Discord, reaction, user) => {
  try {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    /**Cargo interesses*/ if (reaction.message.id === "885321736676057138") {
      const msg = await reaction.message.channel.messages.fetch(
        "885321736676057138"
      );
      switch (reaction.emoji.name) {
        /*Artista*/ case "🎨":
          GiveRole(user, "885300976611885057", "🎨", reaction, msg);
          break;

        /*Programador*/ case "💾":
          GiveRole(user, "885300941908221982", "💾", reaction, msg);
          break;

        /*Escritor*/ case "📝":
          GiveRole(user, "883414460444852225", "📝", reaction, msg);
          break;

        /*Youtuber*/ case "🎬":
          GiveRole(user, "885301239343108118", "🎬", reaction, msg);
          break;

        /*Streamer*/ case "🎥":
          GiveRole(user, "885301275544141826", "🎥", reaction, msg);
          break;
      }
    } /**Cargo Cores "885331111595634768"*/ else if (
      reaction.message.id === "885331111595634768"
    ) {
      const msg = await reaction.message.channel.messages.fetch(
        "885331111595634768"
      );
      switch (reaction.emoji.name) {
        /* Roxo*/ case "🟣":
          GiveRole(user, "885328007164751922", "🟣", reaction, msg);
          break;

        /* Laranja*/ case "🟠":
          GiveRole(user, "885327469182324807", "🟠", reaction, msg);
          break;

        /* Amarelo*/ case "🟡":
          GiveRole(user, "885327510198448179", "🟡", reaction, msg);
          break;

        /* Azul*/ case "🔵":
          GiveRole(user, "880613659729080322", "🔵", reaction, msg);
          break;

        /* Vermelho*/ case "🔴":
          GiveRole(user, "885326446497759293", "🔴", reaction, msg);
          break;
        /* Verde*/ case "🟢":
          GiveRole(user, "885326512461582336", "🟢", reaction, msg);
          break;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

async function GiveRole(user, roleId, roleEmoji, reaction, msg) {
  const userRoles = await reaction.message.guild.members.cache.get(user.id);
  if (!userRoles) return;
  if (userRoles.roles.cache.get(roleId)) {
    await userRoles.roles.remove(roleId);
    msg.reactions.resolve(roleEmoji).users.remove(user.id);
  } else {
    await userRoles.roles.add(roleId);
    msg.reactions.resolve(roleEmoji).users.remove(user.id);
  }
}
