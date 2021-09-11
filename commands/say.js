const say = ({msg, args, state, setState}) => {
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
  let thingSaid = args.join(" ");
  theirThings.push(thingSaid);
  newState.thingsSaid[msg.author.id] = theirThings;
  setState(newState);
  msg.react(thingSaid === thingSaid.toUpperCase() ? "📣" : "👍");
};

const description = "Adds whatever comes after \"say \" to the user's things said";

module.exports = {
  func: say,
  description
};