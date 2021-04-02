const fs = require("fs");

const getAll = () => {
  try {
    return JSON.parse(fs.readFileSync("data/hackathons.json"));
  } catch (error) {
    return [];
  }
};

const save = data => {
  try {
    data.sort((a, b) => {
      if (a.status > b.status) {
        return true;
      } else if (a.status < b.status) {
        return false;
      } else {
        return a.deadline - b.deadline;
      }
    });
    data.forEach((entry, i) => {
      entry.id = i;
    });
    fs.writeFileSync("data/hackathons.json", JSON.stringify(data));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addItem = item => {
  let hackathons = getAll();
  hackathons.forEach(hackathon => {
    if (hackathon.url === item.url) {
      throw "A hackathon with the same URL already exists!";
    }
  });
  hackathons.push(item);
  return save(hackathons)
    ? "The hackathon was successfully added!"
    : "Oh no, something went wrong!";
};

const removeItem = id => {
  let removed = false;
  let hackathons = getAll();
  hackathons = hackathons.filter(hackathon => {
    if (hackathon.id !== id) {
      return false;
    } else {
      removed = true;
      return true;
    }
  });
  if (removed) {
    return save(hackathons)
      ? "The hackathon was successfully removed!"
      : "Oh no, something went wrong!";
  } else {
    return "No hackathon with that ID was found!";
  }
};

const getOne = id => {
  let hackathons = getAll();
  return hackathons.find(hackathon => hackathon.id === id);
};

const updateOne = (id, data) => {
  let updated = false;
  let hackathons = getAll();
  hackathons.forEach((hackathon, i) => {
    if (hackathon.id === id) {
      hackathon[i] = data;
      updated = true;
    }
  });
  if (updated) {
    return save(hackathons)
      ? "The hackathon was successfully updated!"
      : "Oh no, something went wrong!";
  } else {
    return "No hackathon with that ID was found!";
  }
};

module.exports = {
  addItem,
  removeItem,
  getAll,
  getOne,
  updateOne
};
