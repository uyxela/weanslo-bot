const { removeItem } = require("../data");

module.exports = {
  name: "remove",
  description: "Remove a hackathon",
  args: true,
  aliases: ["delete"],
  usage: "<id>",
  execute(message, args) {
    message.channel.send(removeItem(Number(args[0])));
  }
};
