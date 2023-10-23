const db = require("../../database");
const messages = require("../../helpers/messages");
const cronJob = require("../../helpers/cronJob");

const transactions = db["transaction"];
const stock_histories = db["stock_history"];
const transaction_payments = db["transaction_payment"];

async function updateStatusMutation(id_transaction, t) {
  await stock_histories.update(
    { id_status: 8 },
    { where: { id_transaction }, t }
  );
}

async function updateOrderStatus(id, status) {
  return await db.sequelize.transaction(async function (t) {
    const attr = { id_status: status };
    if (status === 5) attr["is_confirm"] = true;
    await transactions.update(attr, { where: { id }, transaction: t });
    if (status === 3)
      await transaction_payments.update(
        { id_status: 8 },
        { where: { id_transaction: id }, t }
      );
    if (status === 4) {
      await updateStatusMutation(id, t);
      cronJob.startCronJob();
    }
    return messages.success("Status successfully updated");
  });
}

module.exports = updateOrderStatus;
