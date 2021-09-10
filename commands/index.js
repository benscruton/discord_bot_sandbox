const fs = require("fs");
const files = fs.readdirSync(__dirname)
  .filter(file => file.substring(file.length - 3) === ".js")
  .map(file => file.substring(0, file.length - 3))
  .filter(file => file !== "index");

const commands = {}, commandNames = [];
for(let file of files){
  commands[file] = require(`./${file}`);
  commandNames.push(file);
}

// const commands = {
//   ping: require("./ping"),
//   help: require("./help"),
//   prefix: require("./prefix"),
//   log: require("./log"),
//   blarg: require("./blarg"),
//   things: require("./things"),
//   say: require("./say"),
//   shout: require("./shout"),
//   clear: require("./clear"),
//   quiet: require("./quiet"),
//   lizard: require("./lizard"),
//   fstest: require("./fstest"),
// };

// const commandNames = [];
// for(let name in commands){
//   commandNames.push(name);
// }

module.exports = {
  commands,
  commandNames
};