const ping = ({msg, args}) => {
  if(!args.length) msg.reply("Pong!");
};

module.exports = ping;