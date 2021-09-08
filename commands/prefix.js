const prefix = ({msg, state, setState}) => {
  const newPrefix = msg.content.substring(state.prefix.length + 7);
  if(!newPrefix.length){
    msg.react("❌");
    return;
  }
  const newState = JSON.parse(JSON.stringify(state));
  newState.prefix = newPrefix;
  setState(newState);
  msg.react("🌵");
};

module.exports = prefix;