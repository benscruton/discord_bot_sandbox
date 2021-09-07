const say = ({msg, args, thingsSaid}) => {
  if(!thingsSaid.hasOwnProperty(msg.author.id)){
    thingsSaid[msg.author.id] = [];
  }
  let thingSaid = args.join(" ");
  thingsSaid[msg.author.id].push(thingSaid);
  msg.react("👍");
};

module.exports = say;