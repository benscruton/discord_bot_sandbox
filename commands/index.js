const fs = require("fs");
const files = fs.readdirSync(__dirname)
  .filter(file => file.substring(file.length - 3) === ".js")
  .map(file => file.substring(0, file.length - 3))
  .filter(file => file !== "index");

const commands = {};
for(let file of files){
  commands[file] = require(`./${file}`);
}

module.exports = commands;