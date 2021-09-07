const clear = ({msg, state, setState}) => {
  newState = JSON.parse(JSON.stringify(state));
  newState.thingsSaid[msg.author.id] = [];
  setState(newState);
  msg.react("🆗");
};

module.exports = clear;