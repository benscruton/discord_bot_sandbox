require("dotenv").config();
const {Client, Intents}  = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => 
  console.log(`Logged in as ${client.user.tag}`)
);

let state = {};

const setState = newState => {
  state = newState;
}

const {commands, commandNames} = require("./commands");

client.on("messageCreate", msg => {
  if(msg.content[0] === "!"){
    const [cmd, ...args] = msg.content.substring(1).split(" ");
    if(commandNames.includes(cmd)){
      commands[cmd]({msg, args, state, setState, client});
    }
  }
});

client.login(process.env.LOGIN_TOKEN);