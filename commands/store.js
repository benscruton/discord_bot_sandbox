require("dotenv").config();
const {MongoClient} = require("mongodb");
const dbName = process.env.DB_NAME;
const connectionString = process.env.DB_CONNECTION;


const store = async ({msg, args}) => {
  if(!args.length || args.length % 2){
    return msg.react("🚫");
  }

  const newObj = {};
  for(let i=0; i<args.length; i+=2){
    newObj[args[i]] = args[i+1];
  }

  const connectionOptions = {useNewUrlParser: true, useUnifiedTopology: true };
  const mongoClient = new MongoClient(connectionString, connectionOptions);

  let reaction;
  const setReaction = emoj => reaction = emoj;

  try{
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const coll = db.collection("testy");
    await coll.insertOne(newObj)
      .catch(setReaction("❌"));
    reaction = "✅";
  }
  catch (e) {
    reaction = "❌";
    console.error(e);
  }
  finally{
    console.log(reaction);
    await mongoClient.close();
    await msg.react(reaction);
  }
  // console.log(newObj);
}

const description = "Save things to a Mongo database"

module.exports = {
  func: store,
  description
};
