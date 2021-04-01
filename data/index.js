const fs = require("fs");

const newID = () =>
  [...Array(4)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");

const getAll = () => JSON.parse(fs.readFileSync("hackathons.json"));

const save = data => {
  data.forEach(entry);
  fs.writeFileSync("hackathons.json", data);
};

const addItem = item => {
  item.id = newID();
  let hackathons = getAll();
  hackathons.push(item);
  save(hackathons);
};

const removeItem = id => {
  let hackathons = getAll();
  hackathons = hackathons.filter(hackathon => hackathon.id !== id);
  save(hackathons);
};

const getOne = id => {
  let hackathons = getAll();
  return hackathons.find(hackathon => hackathon.id === id);
};

const updateOne = (id, data) => {
  let hackathons = getAll();
  hackathons = hackathons.find(hackathon => hackathon.id === id);
};

module.exports = {
  addItem,
  removeItem,
  getAll,
  getOne,
  updateOne
};
