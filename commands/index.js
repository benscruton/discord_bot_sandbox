const commands = {
  ping: require("./ping"),
  log: require("./log"),
  blarg: require("./blarg"),
  say: require("./say"),
  things: require("./things"),
  clear: require("./clear"),
};

const commandNames = [];
for(let name in commands){
  commandNames.push(name);
}

module.exports = {
  commands,
  commandNames
};