require("dotenv").config();
const {Client, Intents}  = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on("ready", () => 
  console.log(`Logged in as ${client.user.tag}`)
);

let state = {
  prefix: "!",
};
const setState = newState => {
  state = newState;
}

const commands = require("./commands");

client.on("messageCreate", msg => {
  if(msg.content.substring(0, state.prefix.length) === state.prefix){
    const [cmd, ...args] = msg.content.substring(state.prefix.length).split(" ");
    if(commands.hasOwnProperty(cmd)){
      commands[cmd].func({msg, args, state, setState, client});
    } else {
      msg.reply("This is not a BlargBot command.  To see a list of valid BlargBot commands, type `!help`.");
    }
  }
});

client.login(process.env.LOGIN_TOKEN);