const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const controllers = {};

fs.readdirSync(__dirname)
  .filter((file) => file != basename)
  .forEach((file) => {
    const key = file.slice(0, -3);
    controllers[key] = require(path.join(__dirname, file));
  });

module.exports = controllers;
