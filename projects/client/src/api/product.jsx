import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";
import { getQueries } from "../helpers/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PRODUCT_URL = `${BASE_URL}/product`;
const CATEGORY_URL = `${PRODUCT_URL}/category`;

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

async function getProducts(toast, attributes) {
  try {
    const queries = getQueries(attributes);
    const response = await axios.get(`${PRODUCT_URL}?${queries}`);
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

async function getCategories(toast) {
  try {
    const response = await axios.get(`${CATEGORY_URL}`);
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

async function getProduct(toast, id) {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${id}`);
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

export { getProducts, getCategories, getProduct };
