require("dotenv").config();
const {MongoClient} = require("mongodb");
const dbName = process.env.DB_NAME;
const connectionString = process.env.DB_CONNECTION;

const store = async ({msg, args}) => {
  if(!args.length || args.length % 2){
    return msg.react("🚫");
  }

  const userId = msg.author.id;

  const storedItems = {};
  for(let i=0; i<args.length; i+=2){
    storedItems[args[i]] = args[i+1];
  }

  const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true };
  const mongoClient = new MongoClient(connectionString, connectionOptions);

  let reaction;
  const setReaction = emoj => reaction = emoj;

  try{
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const coll = db.collection("testy");
    const list = await coll.find({userId}).toArray();

    if(!list.length){
      await coll.insertOne({userId, storedItems})
        .catch(() => setReaction("❌"));
      reaction = "✅";
    }
    else {
      const updatedItems = list[0].storedItems;
      for(let key in storedItems){
        updatedItems[key] = storedItems[key];
      }
      await coll.updateOne({userId}, {$set: {storedItems: updatedItems}})
        .catch(() => setReaction("❌"));
      reaction = "✅";
    }
  }
  catch (e) {
    reaction = "❌";
    console.error(e);
  }
  finally{
    await mongoClient.close();
    await msg.react(reaction);
  }
}

const description = "Save things to a Mongo database"

module.exports = {
  func: store,
  description
};
