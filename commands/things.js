const things = ({msg, state, client}) => {
  const channel = client.channels.cache.get(msg.channelId);
  const theirThings = (
    state.thingsSaid.hasOwnProperty(msg.author.id) ?
      state.thingsSaid[msg.author.id]
      :
      []
  );
  if(!theirThings.length){
    channel.send(`${msg.author.username} hasn't said any things.`);
    return;
  }
  channel.send(`Here are the things ${msg.author.username} has said:`);
  let things = "";
  for(let i=0; i<theirThings.length; i++){
    things += theirThings[i];
    if(i+1 !== theirThings.length){
      things += "\n";
    }
  }
  channel.send(things);
};

module.exports = things;