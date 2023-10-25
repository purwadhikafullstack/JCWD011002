const db = require("../../database");
const messages = require("../../helpers/messages");
const cronJob = require("../../helpers/cronJob");
const mailer = require("../../helpers/mailer");

const transactions = db["transaction"];
const stock_histories = db["stock_history"];
const transaction_payments = db["transaction_payment"];
const users = db["user"];

async function sendNotification(id) {
  const subject = "Payment Rejected";
  const transaction = await transactions.findOne({
    include: [{ model: users }],
    where: { id },
  });
  const email = transaction?.user?.email;
  const invoice = `MWEGC2/ID/TXN${id}`;
  await mailer.send("reject", email, subject, { invoice });
}

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
    if (status === 3) {
      await transaction_payments.update(
        { id_status: 8 },
        { where: { id_transaction: id }, t }
      );
      await updateStatusMutation(id, t);
    }
    if (status === 4) {
      cronJob.startCronJob();
    }
    if (status === 1) {
      await sendNotification(id);
    }
    return messages.success("Status successfully updated");
  });
}

module.exports = updateOrderStatus;
