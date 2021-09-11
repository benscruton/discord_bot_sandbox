const help = ({msg, client, state}) => {
  msg.react("🤦‍♀️");

  let output = "```";
  output += "Welcome to BlargBot, a sandbox bot to test Discord bot functionality!\n\n";
  output += "The prefix for all BlargBot commands is !\n\n";
  output += "Available commands are:\n"
  
  const commands = require("./index")
  for(let commandName in commands){
    let next = `  ${state.prefix}${commandName}`;
    while(next.length < 11 + state.prefix.length){
      next += " ";
    }
    next += `| ${commands[commandName].description}\n`;
    next = next.split("&&&&&").join(" ".repeat(11 + state.prefix.length));
    output += next;
  }
  output += "```";
  
  const channel = client.channels.cache.get(msg.channelId);
  channel.send(output);
};

const description = "Shows this message"

module.exports = {
  func: help,
  description
};