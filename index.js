require("dotenv").config();
const {Client, Intents}  = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => 
  console.log(`Logged in as ${client.user.tag}`)
);

const thingsSaid = {};

const commands = [
  "ping",
  "log",
  "blarg",
  "say",
  "things",
  "clear",
];

const ping = (msg, args) => {
  if(!args.length) msg.reply("Pong!");
};

const log = (msg, args) => {
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
    msg.reply(`Its type is: ${typeof thing}`);
  }
  else{
    console.log(args[0]);
  }
};

const blarg = msg => msg.reply("Yes that is my name");

const say = (msg, args) => {
  if(!thingsSaid.hasOwnProperty(msg.author.id)){
    thingsSaid[msg.author.id] = [];
  }
  let thingSaid = args.join(" ");
  thingsSaid[msg.author.id].push(thingSaid);
  msg.react("👍");
};

const things = (msg) => {
  const channel = client.channels.cache.get(msg.channelId);
  const theirThings = thingsSaid[msg.author.id];
  if(!theirThings || !theirThings.length){
    channel.send(`${msg.author.username} hasn't said any things.`);
    return;
  }
  channel.send(`Here are the things ${msg.author.username} has said:`);
  let things = "";
  for(let i=0; i<theirThings.length; i++){
    things += theirThings[i];
    if(i+1 !== theirThings.length){
      things += "\n";
    }
  }
  channel.send(things);
};

const clear = (msg) => {
  thingsSaid[msg.author.id] = [];
  msg.react("🆗");
};

const actions = {
  ping,
  log,
  blarg,
  say,
  things,
  clear,
};

client.on("messageCreate", msg => {
  if(msg.content[0] === "!"){
    const [cmd, ...args] = msg.content.substring(1).split(" ");
    if(commands.includes(cmd)){
      actions[cmd](msg, args);
    }
  }
});

client.login(process.env.LOGIN_TOKEN);