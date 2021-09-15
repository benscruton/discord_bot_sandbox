require("dotenv").config();
const {MongoClient} = require("mongodb");
const dbName = process.env.DB_NAME;
const connectionString = process.env.DB_CONNECTION;

const unstore = async ({msg, args}) => {
  if(args.length > 1){
    return msg.react("🚫");
  }

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

    if(list.length){
      let updatedItems;
      if(args.length){
        let key = args[0];
        updatedItems = list[0].storedItems;
        if(updatedItems.hasOwnProperty(key)){
          delete updatedItems[key];
        }
        else{
          msg.reply("You do not have anything stored with this key name.");
        }
      }
      else{ // no arguments given: delete all
        updatedItems = {};
      }
      await coll.updateOne({userId}, {$set: {storedItems: updatedItems}});
    }
    else{ // !list.length
      msg.reply("You do not have anything saved in the database.");
    }

    reaction = "✅";
  }
  catch{
    reaction = "❌";
    console.error(e);
  }
  finally{
    await mongoClient.close();
    await msg.react(reaction);
  }
};

const description = "Removes an item from the user's stores.\n" +
"&&&&&| With one argument, that specific key is deleted.\n" +
"&&&&&| With no arguments, the user's full stores are deleted.";

module.exports = {
  func: unstore,
  description
};