const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const routers = {};

fs.readdirSync(__dirname)
  .filter((file) => file != basename)
  .forEach((file) => {
    const key = file.slice(0, -3);
    routers[key] = require(path.join(__dirname, file));
  });

module.exports = routers;
