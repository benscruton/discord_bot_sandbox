const {ReactionCollector} = require("discord.js");

const confirm = ({msg, client}) => {
  const channel = client.channels.cache.get(msg.channelId);
  // let listen;
  channel.send("Here's a lizard:")
    .then( post => {
      post.react("🦎");
      return post;
    }).catch( e => console.error(`Something went wrong:\n${e}`));
};

module.exports = confirm;