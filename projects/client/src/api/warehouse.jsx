import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const WAREHOUSE_URL = `${BASE_URL}/warehouse`;

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

async function getWarehouses(toast) {
  try {
    const response = await axios.get(`${WAREHOUSE_URL}`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const getWarehouseList = async (toast, page, sort, name, search, filterProvince) => {
  try {
    const response = await axios.get(`${WAREHOUSE_URL}/admin`, {
      params: {
        page,
        sort,
        name,
        search: search || '',
        province: filterProvince
      },
      ...setHeaders()
    });
    console.log("api warehouse:", response.data);
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getWarehouses, getWarehouseList };
