require("dotenv").config();
const {Client, Intents}  = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => 
  console.log(`Logged in as ${client.user.tag}`)
);

const thingsSaid = [];

const commands = [
  "ping",
  "blarg",
  "say",
  "things",
  "clear",
];

const ping = (msg, args) => {
  if(!args.length) msg.reply("Pong!");
};

const blarg = msg => msg.reply("Yes that is my name");

const say = (msg, args) => {
  let thingSaid = args.join(" ");
  thingsSaid.push(thingSaid);
  msg.react("👍");
};

const things = (msg) => {
  const channel = client.channels.cache.get(msg.channelId);
  channel.send(
    thingsSaid.length ? "here are some things:" : "You haven't said any things."
  );
  for(let i=0; i<thingsSaid.length; i++){
    channel.send(thingsSaid[i]);
  }
};

const clear = (msg) => {
  while(thingsSaid.length){
    thingsSaid.pop();
  }
  msg.react("🆗");
};

const actions = {
  ping,
  blarg,
  say,
  things,
  clear
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