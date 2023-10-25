import DataUser from "./DataUser";

function UserList({ users, limit, page }) {
  function setNum(n) {
    return (page - 1) * limit + n + 1;
  }
  return users.map((user, index) => (
    <DataUser user={user} num={setNum(index)} key={index} />
  ));
}

export default UserList;
