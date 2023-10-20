import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_URL = `${BASE_URL}/auth`;

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

async function register(toast, attributes) {
  try {
    const response = await axios.post(`${AUTH_URL}/user`, attributes);
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function registration(toast, token, attributes) {
  try {
    const response = await axios.put(
      `${AUTH_URL}/user`,
      attributes,
      setHeaders(token)
    );
    notification(toast, setToastParams(response));
    document.location.href = "/";
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function login(toast, attributes) {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, attributes);
    notification(toast, setToastParams(response));
    console.log(response);
    // Set token to localStorage
    const { token } = response.data.data;
    localStorage.setItem("token", token);
    // Reload to last page
    document.location.reload();
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function keepLogin() {
  try {
    const response = await axios.get(`${AUTH_URL}/login`, setHeaders());
    // Update token on localStorage
    const { token } = response.data.data;
    localStorage.setItem("token", token);
  } catch (error) {
    console.error(error.message);
    localStorage.removeItem("token");
  }
}

async function forgotPassword(toast, attributes) {
  try {
    const response = await axios.post(`${AUTH_URL}/reset`, attributes);
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function resetPassword(toast, token, attributes) {
  try {
    const response = await axios.patch(
      `${AUTH_URL}/reset`,
      attributes,
      setHeaders(token)
    );
    notification(toast, setToastParams(response));
    document.location.href = "/";
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export {
  register,
  registration,
  login,
  keepLogin,
  forgotPassword,
  resetPassword,
};
