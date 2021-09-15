require("dotenv").config();
const {MongoClient} = require("mongodb");
const dbName = process.env.DB_NAME;
const connectionString = process.env.DB_CONNECTION;

const mystores = async ({msg, state}) => {
  const userId = msg.author.id;

  const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true };
  const mongoClient = new MongoClient(connectionString, connectionOptions);

  let reaction;
  const setReaction = emoj => reaction = emoj;

  try{
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const coll = db.collection("testy");
    const list = await coll.find({userId}).toArray()
      .catch(() => setReaction("❌"));

    if(!list.length){
      msg.reply(`You do not have any stores in the database.  Use \`${state.prefix}store\` to add items.`);
      return;
    }
    const storedItems = list[0].storedItems;

    let output = "Here are your stored items:\n```\n";
    let maxLength = 0;
    for(let key in storedItems){
      maxLength = Math.max(maxLength, key.length);
    }
    for(let key in storedItems){
      let lineIntro = key + ":";
      while(lineIntro.length < maxLength + 3){
        lineIntro += " ";
      }
      output += lineIntro + `${storedItems[key]}\n`;
    }
    output += "```";
    msg.reply(output);
    reaction = "✅";
  }
  catch(e) {
    reaction = "❌";
    console.error(e);
  }
  msg.react(reaction);
};

const description = "Lets a user view items they have saved into the database";

module.exports = {
  func: mystores,
  description
};