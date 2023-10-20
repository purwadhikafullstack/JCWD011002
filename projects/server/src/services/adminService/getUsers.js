const { Op, col } = require("sequelize");
const db = require("../../database");
const { messages, pagination } = require("../../helpers");

const admins = db["admin"];
const users = db["user"];
const roles = db["role"];
const warehouses = db["warehouse"];

const exclude = [
  "password",
  "is_verified",
  "id_role",
  "updated_at",
];

const include = [
  {
    model: admins,
    include: {
      model: warehouses,
      attributes: ["name"],
    },
  },
  {
    model: roles,
    attributes: ["name"],
  },
];

function setWhere(id, search = "", role, warehouse) {
  const conditions = {
    name: { [Op.not]: null, [Op.like]: `%${search}%` },
    id: { [Op.not]: id },
  };
  if (role) conditions["id_role"] = role;
  if (warehouse) conditions["$admin.id_warehouse$"] = warehouse;
  return conditions;
}

async function getUsers(access, id, query) {
  const { search, role, warehouse, sort, page = 1, limit = 10 } = query;
  // Check if access only for admin
  if (access !== "admin") return messages.error(401, "Unauthorized access");
  //Pagination
  const pages = pagination.setPagination(page, limit);

  const { count, rows: result } = await users.findAndCountAll({
    attributes: { exclude },
    include,
    order: [
      ["name", sort || "ASC"],
      [roles, "name", "ASC"],
      [admins, warehouses, "name", "ASC"]
    ],
    where: setWhere(id, search, role, warehouse),
    subQuery: false,
    ...pages,
  });

  const payload = {
    pages: Math.ceil(count / limit),
    users: result,
  };
  return messages.success("", payload);
}

module.exports = getUsers;
