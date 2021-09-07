const things = ({msg, thingsSaid, client}) => {
  const channel = client.channels.cache.get(msg.channelId);
  const theirThings = thingsSaid[msg.author.id];
  if(!theirThings || !theirThings.length){
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