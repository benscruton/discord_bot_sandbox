const commands = {
  ping: require("./ping"),
  log: require("./log"),
  blarg: require("./blarg"),
  things: require("./things"),
  say: require("./say"),
  shout: require("./shout"),
  clear: require("./clear"),
  quiet: require("./quiet"),
};

const commandNames = [];
for(let name in commands){
  commandNames.push(name);
}

module.exports = {
  commands,
  commandNames
};