const fstest = ({msg}) => {
  const fs = require("fs");

  const files = fs.readdirSync(__dirname);
  console.log(files);

  if(msg){
    msg.react("🥏");
  }
};

const description = "Set up for testing purposes - will react with a frisbee.";

module.exports = {
  func: fstest,
  description
};