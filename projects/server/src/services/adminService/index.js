const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const services = {};

fs.readdirSync(__dirname)
  .filter((file) => file != basename)
  .forEach((file) => {
    const key = file.slice(0, -3);
    services[key] = require(path.join(__dirname, file));
  });

module.exports = services;
