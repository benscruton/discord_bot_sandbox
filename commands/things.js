const things = ({msg, client, state, setState}) => {
  const channel = client.channels.cache.get(msg.channelId);
  const newState = JSON.parse(JSON.stringify(state));
  if(!newState.thingsSaid){
    newState.thingsSaid = {};
    setState(newState);
  }
  const theirThings = newState.thingsSaid[msg.author.id] || [];
  if(!theirThings.length){
    channel.send(`${msg.author.username} hasn't said any things.`);
    return;
  }
  let things = "";
  for(let i=0; i<theirThings.length; i++){
    things += theirThings[i];
    things += i+1 !== theirThings.length ? "\n" : "";
  }
  channel.send(`Here are the things ${msg.author.username} has said:`);
  channel.send(things);
};

const description = "Lists the things that a user has said or shouted";

module.exports = {
  func: things,
  description
};