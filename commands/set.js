const { setStatus, setSubmitted } = require("../data");

module.exports = {
  name: "set",
  description: "Sets the status of a hackathon",
  args: true,
  usage: "<id> current | submitted <url> | upcoming",
  execute(message, args) {
    if (args[1] === "current") {
      message.channel.send(setStatus(Number(args[0]), 2));
    } else if (args[1] === "upcoming") {
      message.channel.send(setStatus(Number(args[0]), 1));
    } else if (args[1] === "submitted") {
      const url = (args[2].startsWith("https://") ? "" : "https://") + args[2];
      message.channel.send(setSubmitted(Number(args[0]), url));
    } else {
      message.channel.send("Invalid arguments!");
    }
  }
};
