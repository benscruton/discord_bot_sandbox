const lizard = ({msg, client}) => {
  const channel = client.channels.cache.get(msg.channelId);
  channel.send("Here's a lizard:")
    .then( post => {
      post.react("🦎");
      return post;
    }).catch( e => console.error(`Something went wrong:\n${e}`));
};

const description = "Mentions a lizard, then reacts with a lizard.";

module.exports = {
  func: lizard,
  description
};