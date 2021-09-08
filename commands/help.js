const help = ({msg, client}) => {
  msg.react("🤦‍♀️");

  const {commandNames} = require("./index");
  let output = "```";
  output += "Welcome to BlargBot, a sandbox bot to test Discord bot functionality!\n\n";
  output += "The prefix for all BlargBot commands is !\n\n";
  output += "Available commands are:\n"
  for(let i=0; i<commandNames.length; i++){
    output += `  - !${commandNames[i]}\n`;
  }
  output += "```";
  
  const channel = client.channels.cache.get(msg.channelId);
  channel.send(output);
};

module.exports = help;