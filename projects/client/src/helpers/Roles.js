import jwt_decode from "jwt-decode";

function getRole() {
  const token = localStorage.getItem("token");
  if (!token) return;
  return jwt_decode(token)["role"];
}

export { getRole };
