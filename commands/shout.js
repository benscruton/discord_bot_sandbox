const shout = ({msg, args, state, setState}) => {
  let newState = JSON.parse(JSON.stringify(state));
  if(!newState.thingsSaid){
    newState.thingsSaid = {};
  }
  const theirThings = (
    newState.thingsSaid.hasOwnProperty(msg.author.id) ?
      [...newState.thingsSaid[msg.author.id]]
      :
      []
  );
  let thingShouted = args.join(" ").toUpperCase();
  theirThings.push(thingShouted);
  newState.thingsSaid[msg.author.id] = theirThings;
  setState(newState);
  msg.react("📣");
};

const description = "Works like 'say' but puts it in all caps";

module.exports = {
  func: shout,
  description
};