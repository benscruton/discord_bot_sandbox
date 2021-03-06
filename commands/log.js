const log = ({msg, args, client, state}) => {
  if(!args.length){
    msg.react("❌");
    return;
  }

  const [key, ...extras] = args;

  if(key === "message"){
    console.log(msg);
    msg.react("📝");
  }
  else if(key === "author"){
    console.log(msg.author);
    msg.react("💁‍♀️");
  }
  else if(key === "channel"){
    const channel = client.channels.cache.get(msg.channelId);
    console.log(channel);
    msg.react("📺");
  }
  else if(key === "prefix"){
    console.log(`prefix is: "${state.prefix}"`);
  }
  else if(key === "burrow"){
    let thing = msg;
    try{
      while(extras.length){
        thing = thing[extras.shift()];
      }
    } catch {
      console.log(`The message "${args.join(" ")}" caused an error.`)
      msg.react("❌");
      return;
    }
    console.log(thing);
    msg.react("🍍");
  }
  else if(key === "type"){
    let thing = msg;
    try{
      while(extras.length){
        thing = thing[extras.shift()];
      }
    } catch {
      console.log(`The message "${args.join(" ")}" caused an error.`)
      msg.react("❌");
      return;
    };
    console.log(typeof thing);
    msg.reply(`Its type is: ${typeof thing}`);
  }
  else{
    console.log(args[0]);
  }
};

const description = "Logs some things depending on arguments, mostly on the back end.\n" +
  "&&&&&| Options include:\n" + 
  "&&&&&|   'message'\n" + 
  "&&&&&|   'author'\n" +
  "&&&&&|   'channel'\n" +
  "&&&&&|   'prefix'\n" +
  "&&&&&|   'burrow' (chain attributes of msg)\n" + 
  "&&&&&|   'type' (like 'burrow' but types)"

module.exports = {
  func: log,
  description
};