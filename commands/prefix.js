const prefix = ({msg, args, state, setState}) => {
  const newState = JSON.parse(JSON.stringify(state));
  const newPrefix = args.join(" ");
  newState.prefix = newPrefix;
  setState(newState);
  msg.reply(`Your new prefix is ${newPrefix}`);
};

module.exports = prefix;