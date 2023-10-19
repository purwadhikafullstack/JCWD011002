import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const RAJA_ONGKIR_URL = `${BASE_URL}/rajaongkir`;
const ADDRESS_URL = `${BASE_URL}/address`;

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

const getProvince = async (setProvince, toast) => {
  try {
    const response = await axios.get(`${RAJA_ONGKIR_URL}/province`);
    setProvince(response.data.rajaongkir.results);
  } catch (error) {
    console.log(error);
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const getCityByProvince = async (province, setCity, toast) => {
  try {
    const response = await axios.get(`${RAJA_ONGKIR_URL}/citybyprovince?province=${province}`);
    setCity(response.data.rajaongkir.results);
  } catch (error) {
    console.log(error);
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const addAddress = async (formData, selectedProvinceName, toast, onAddAddress, setFormData, initialFormData, onClose) => {
  try {
    const response = await axios.post(`${ADDRESS_URL}`, {
      ...formData,
      province: selectedProvinceName,
      city_name: formData.city_name,
    }, setHeaders());
    onAddAddress(formData);
    setFormData(initialFormData);
    notification(toast, setToastParams(response));
    onClose();
  } catch (error) {
    console.log(error);
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const getAddressUser = async (toast, setDataAddress) => {
  try {
    const response = await axios.get(`${ADDRESS_URL}`, setHeaders());
    setDataAddress(response.data.data);
  } catch (error) {
    console.log(error);
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const updateAddressUser = async (addressData, formData, toast, onEditAddress, onClose, selectedProvinceName) => {
  try {
    const response = await axios.patch(`${ADDRESS_URL}/${addressData.id}`, {
      ...formData,
      province: selectedProvinceName,
    }, setHeaders());
    onEditAddress(formData);
    notification(toast, setToastParams(response));
    onClose();
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getProvince, getCityByProvince, addAddress, getAddressUser, updateAddressUser };