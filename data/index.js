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
        return -1;
      } else if (a.status < b.status) {
        return 1;
      } else {
        return a.deadline - b.deadline;
      }
    });
    data.forEach((entry, i) => {
      entry.id = i;
    });
    fs.writeFileSync("data/hackathons.json", JSON.stringify(data, null, "\t"));
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
      return "A hackathon with the same URL already exists!";
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

const getCurrentAndUpcoming = () => {
  let hackathons = getAll();
  return hackathons.filter(hackathon => hackathon.status !== 0);
};

const setStatus = (id, status) => {
  let updated = false;
  let hackathons = getAll();
  hackathons.forEach(hackathon => {
    if (hackathon.id === id) {
      hackathon.status = status;
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

const setSubmitted = (id, url) => {
  console.log("id", id, "url", url);
  let updated = false;
  let hackathons = getAll();
  hackathons.forEach(hackathon => {
    if (hackathon.id === id) {
      hackathon.submission = url;
      hackathon.status = 0;
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

const getStatus = status => {
  switch (status) {
    case 0:
      return "Submitted";
    case 1:
      return "Upcoming";
    case 2:
      return "Current";
  }
};

module.exports = {
  addItem,
  removeItem,
  getAll,
  getOne,
  getCurrentAndUpcoming,
  setStatus,
  setSubmitted,
  getStatus
};
