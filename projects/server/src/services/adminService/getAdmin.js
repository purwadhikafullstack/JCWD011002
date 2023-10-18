const db = require("../../database");
const { messages } = require("../../helpers");

const admins = db["admin"];
const users = db["user"];
const roles = db["role"];
const warehouses = db["warehouse"];

const exclude = [
  "password",
  "is_verified",
  "id_role",
  "created_at",
  "updated_at",
];

const include = [
  {
    model: users,
    attributes: { exclude },
    include: {
      model: roles,
      attributes: ["name"],
    },
  },
  { model: warehouses, attributes: ["id", "name"] },
];

async function getAdmin(id_user) {
  const result = await admins.findOne({
    where: { id_user },
    attributes: [],
    include,
  });
  console.log(result.user);
  console.log(result.warehouse);

  if (!result) {
    return messages.error(404, "Admin not found");
  }

  const data = {
    id_user: result.user.id,
    id_warehouse: result?.warehouse?.id,
    warehouse_name: result?.warehouse?.name,
  };

  console.log(data);

  return messages.success("", data);
}

module.exports = getAdmin;
