const { getOne, getAll, getStatus, getCurrentAndUpcoming } = require("../data");
const { format } = require("date-fns");

module.exports = {
  name: "list",
  description: "List hackathons",
  aliases: ["view"],
  usage: "(<id> | all | -a)",
  cooldown: 1,
  execute(message, args) {
    if (!args[0]) {
      const hackathons = getCurrentAndUpcoming();
      if (hackathons.length) {
        const embed = {
          color: "#C656B0",
          title: "Hackathons",
          fields: hackathons.map(hackathon => {
            return {
              name: `[${hackathon.id}] ${hackathon.name}`,
              value: `Link: ${hackathon.url}\nDeadline: ${format(
                hackathon.deadline,
                "PPp"
              )}\nStatus: ${getStatus(hackathon.status)}${
                hackathon.status === 0
                  ? `\nSubmission Link: ${hackathon.submission}`
                  : ""
              }`
            };
          })
        };
        message.channel.send({ embed: embed });
      } else {
        message.channel.send(
          "No current or upcoming hackathons! Use the `add` command to add a new hackathon or the argument `all` or `-a` to see submitted hackathons"
        );
      }
    } else if (args[0] === "all" || args[0] === "-a") {
      const hackathons = getAll();
      if (hackathons.length) {
        const embed = {
          color: "#C656B0",
          title: "Hackathons",
          fields: hackathons.map(hackathon => {
            return {
              name: `[${hackathon.id}] ${hackathon.name}`,
              value: `Link: ${hackathon.url}\nDeadline: ${format(
                hackathon.deadline,
                "PPp"
              )}\nStatus: ${getStatus(hackathon.status)}${
                hackathon.status === 0
                  ? `\nSubmission Link: ${hackathon.submission}`
                  : ""
              }`
            };
          })
        };
        message.channel.send({ embed: embed });
      } else {
        message.channel.send(
          "No hackathons to see here! Use the `add` command to add a new hackathon"
        );
      }
    } else {
      const hackathon = getOne(Number(args[0]));
      if (hackathon) {
        const embed = {
          color: "#C656B0",
          title: hackathon.name,
          url: hackathon.url,
          description: hackathon.description,
          thumbnail: {
            url: hackathon.image
          },
          fields: hackathon.submission
            ? [{ name: "Submission Link", value: hackathon.submission }]
            : null,
          timestamp: hackathon.deadline,
          footer: {
            text: getStatus(hackathon.status)
          }
        };
        message.channel.send({ embed: embed });
      } else {
        message.channel.send("No hackathon with that ID was found!");
      }
    }
  }
};
