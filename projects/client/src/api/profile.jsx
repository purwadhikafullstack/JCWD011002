import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USER_URL = `${BASE_URL}/user`;

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

const getUser = async (toast) => {
  try {
    const response = await axios.get(`${USER_URL}/id`, setHeaders());
    return (response.data);
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const updateUser = async (token, toast, userData) => {
  try {
    const response = await axios.patch(`${USER_URL}`, userData, setHeaders(token));
    notification(toast, setToastParams(response));
    return (response);
  } catch (error) {
    const { response } = error;
    notification(toast, { title: response.data?.data[0], status: response.status });
  }
}

const changePassword = async (token, toast, body, onClose) => {
  try {
    const response = await axios.patch(`${USER_URL}/password`, body, setHeaders(token));
    notification(toast, setToastParams(response));
    if (response.status === 200) {
      onClose()
      setTimeout(() => (document.location.href = "/"), 2000);
      localStorage.removeItem("token");
    }
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getUser, updateUser, changePassword };