require("dotenv").config();
const {Client, Intents}  = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => 
  console.log(`Logged in as ${client.user.tag}`)
);

const commands = [
  "ping",
  "blarg"
];

const ping = (msg, args) => {
  if(!args.length) msg.reply("Pong!");
}

const blarg = args => msg.reply("Yes that is my name");

const actions = {
  ping,
  blarg,
};

client.on("messageCreate", msg => {
  if(msg.content[0] === "!"){
    const [cmd, ...args] = msg.content.substring(1).split(" ");
    console.log(commands.includes(cmd));
    if(commands.includes(cmd)){
      actions[cmd](msg, args);
    }
  }
});

client.login(process.env.LOGIN_TOKEN);