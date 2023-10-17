const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const helpers = {};

fs.readdirSync(__dirname)
  .filter((file) => file != basename)
  .forEach((file) => {
    const key = file.slice(0, -3);
    helpers[key] = require(path.join(__dirname, file));
  });

module.exports = helpers;
