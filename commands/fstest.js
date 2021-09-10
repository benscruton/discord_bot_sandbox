const fstest = ({msg}) => {
  const fs = require("fs");

  const files = fs.readdirSync(__dirname);
  console.log(files);

  if(msg){
    msg.react("🥏");
  }
};

module.exports = fstest;