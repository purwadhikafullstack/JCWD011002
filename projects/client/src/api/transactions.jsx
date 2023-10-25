import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";
import { getQueries } from "../helpers/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TRANSACTION_URL = `${BASE_URL}/transaction`;

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

async function getTransactions(toast, attributes) {
  try {
    const queries = getQueries(attributes);
    const response = await axios.get(
      `${TRANSACTION_URL}?${queries}`,
      setHeaders()
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

async function getTransaction(toast, id_transaction) {
  try {
    const response = await axios.get(
      `${TRANSACTION_URL}/detail/${id_transaction}`,
      setHeaders()
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

async function cancelOrder(toast, attributes) {
  try {
    const response = await axios.post(
      `${TRANSACTION_URL}/cancel`,
      attributes,
      setHeaders()
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

async function updateOrderStatus(toast, id_transaction, status) {
  try {
    const attributes = { status };
    const response = await axios.patch(
      `${TRANSACTION_URL}/status/${id_transaction}`,
      attributes,
      setHeaders()
    );
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

export { getTransactions, getTransaction, cancelOrder, updateOrderStatus };
