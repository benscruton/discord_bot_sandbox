const ping = ({msg, args}) => {
  if(!args.length) msg.reply("Pong!");
};

const description = "If no arguments are included, responds with \"Pong!\"";

module.exports = {
  func: ping,
  description
};