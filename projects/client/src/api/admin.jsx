import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";
import { getQueries } from "../helpers/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USER_URL = `${BASE_URL}/user`;
const AUTH_URL = `${BASE_URL}/auth`;
const ADMIN_URL = `${BASE_URL}/admin`;

function getToken() {
  return localStorage.getItem("token");
}

function setHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token || getToken()}`,
    },
  };
}

async function getUsers(toast, attributes) {
  try {
    const queries = getQueries(attributes);
    const response = await axios.get(`${USER_URL}?${queries}`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

async function getRoles(toast) {
  try {
    const response = await axios.get(`${ADMIN_URL}/roles`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function register(toast, attributes) {
  try {
    const response = await axios.post(
      `${ADMIN_URL}/user`,
      attributes,
      setHeaders()
    );
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function updateAdmin(toast, id, attributes) {
  try {
    const response = await axios.patch(
      `${ADMIN_URL}/user/${id}`,
      attributes,
      setHeaders()
    );
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function getAdminWarehouse(toast) {
  try {
    const response = await axios.get(`${ADMIN_URL}/roles/warehouse`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getUsers, getRoles, register, updateAdmin, getAdminWarehouse };
