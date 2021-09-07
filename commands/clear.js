const clear = ({msg, resetThings}) => {
  resetThings(msg.author.id);
  msg.react("🆗");
};

module.exports = clear;