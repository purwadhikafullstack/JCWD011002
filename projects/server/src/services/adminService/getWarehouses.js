const db = require("../../database");
const { messages } = require("../../helpers");

const warehouses = db["warehouse"];

async function getWarehouses() {
  const result = await warehouses.findAll();
  return messages.success("", result);
}

module.exports = getWarehouses;
