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

const description = "Changes the prefix used to introduce bot commands\n" + 
  "&&&&&" + "|   (does not recognize trailing spaces)\n" + 
  "&&&&&" + "|   Reacts with a cactus if successful.\n" +
  "&&&&&" + "|   Note: setting your prefix to '&&&&&' is not recommended."

module.exports = {
  func: prefix,
  description
};