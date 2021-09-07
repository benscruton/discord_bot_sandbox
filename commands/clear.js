const clear = ({msg, state, setState}) => {
  newState = JSON.parse(JSON.stringify(state));
  if(!newState.thingsSaid){
    newState.thingsSaid = {};
  }
  newState.thingsSaid[msg.author.id] = [];
  setState(newState);
  msg.react("🆗");
};

module.exports = clear;