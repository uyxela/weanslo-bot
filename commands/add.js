const axios = require("axios");
const _ = require("lodash/string");
const { addItem } = require("../data");

module.exports = {
  name: "add",
  description: "Add a new hackathon",
  args: true,
  aliases: ["new"],
  usage: "<url>",
  cooldown: 1,
  execute(message, args) {
    const url = args[0];
    axios
      .get(url)
      .then(res => res.text())
      .then(body => {
        let data = body.match(
          /<script type="application\/ld\+json" id="challenge-json-ld">([^<]*)<\/script>/
        );

        if (!data || typeof data[1] !== "string")
          throw new Error("Unable to parse the document");

        data = JSON.parse(data[1]);

        const hackathon = {
          name: data.name,
          description: _.unescape(data.description).replace(/<[^>]*>?/gm, ""),
          deadline: Date.parse(data.endDate),
          url: data.url,
          status: "Upcoming"
        };

        addItem(hackathon);
      });
  }
};
