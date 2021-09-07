const quiet = ({msg, state, setState}) => {
  const newState = JSON.parse(JSON.stringify(state));
  if(!newState.thingsSaid){
    newState.thingsSaid = {};
  }
  let theirThings = newState.thingsSaid[msg.author.id] || [];
  theirThings = [...theirThings];
  if(!theirThings.length){
    setState(newState);
    msg.reply(`${msg.author.username} hasn't said anything, loud or otherwise!`);
    return;
  };
  for(let i=0; i<theirThings.length; i++){
    let thing = theirThings[i];
    if(thing === thing.toUpperCase()){
      theirThings.splice(i--, 1);
    }
  }
  newState.thingsSaid[msg.author.id] = theirThings;
  setState(newState);
  msg.react("🤫");
};

module.exports = quiet;