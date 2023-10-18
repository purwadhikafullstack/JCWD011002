const db = require("../../database");
const messages = require("../../helpers/messages");
const cronJob = require("../../helpers/cronJob");

const transactions = db["transaction"];

async function updateOrderStatus(id, status) {
  return await db.sequelize.transaction(async function (t) {
    const attr = { id_status: status };
    if (status === 5) attr["is_confirm"] = true;
    await transactions.update(attr, { where: { id }, transaction: t });
    if (status === 4) cronJob.startCronJob();
    return messages.success("Status successfully updated");
  });
}

module.exports = updateOrderStatus;
