import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { addAddress, getCityByProvince, getProvince } from "../../api/address";
import Loading from "../Utility/Loading";
const AddAddress = ({ isOpen, onClose, onAddAddress, fetchAddressUser }) => {
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const fetchProvince = async () => {
    await getProvince(setProvince, toast)
  }

  const fetchCity = async () => {
    if (selectedProvinceId) {
      await getCityByProvince(selectedProvinceId, setCity, toast)
    }
  }
  useEffect(() => {
    fetchProvince();
    fetchCity();
  }, [selectedProvinceId])

  const handleSelectProvince = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(selectedId);
    setSelectedProvinceName(selectedName);
    setCity([]);
  }

  const initialFormData = {
    name: "",
    province: "",
    city_name: "",
    postal_code: "",
    full_address: "",
    is_default: false,
  };

  const [formData, setFormData] = React.useState(initialFormData);
  const sendDataToApi = async () => {
    try {
      setIsLoading(true);
      await addAddress(formData, selectedProvinceName, toast, onAddAddress, setFormData, initialFormData, onClose)
      fetchAddressUser()
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "city_name") {
      setFormData({
        ...formData,
        city_name: value,
      });
    } else if (name === "is_default") {
      setFormData({
        ...formData,
        is_default: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading && <Loading />}
      <ModalOverlay />
      <ModalContent color={"white"} bgColor={"#233947"}>
        <ModalHeader>Add New Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody color={"white"}>
          <FormControl mb={2}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Home/Office/.."
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Province</FormLabel>
            <Select placeholder='Select Province' name="province" value={selectedProvinceId} onChange={handleSelectProvince}>
              {province.map((province) => (
                <option key={province.province_id} value={province.province_id}>{province.province}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>City Name</FormLabel>
            <Select isDisabled={city.length === 0} placeholder='Select City' name="city_name" value={formData.city_name} onChange={handleChange} >
              {city.map((city) => (
                <option style={{ color: "white" }} key={city.city_id} value={city.city_name}>{city.city_name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="number"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="your postal code"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Full Address</FormLabel>
            <Input
              type="text"
              name="full_address"
              value={formData.full_address}
              onChange={handleChange}
              placeholder="your full address"
            />
          </FormControl>
          {/* <Checkbox mt={4} name="is_default" defaultChecked isChecked={formData.is_default} onChange={handleChange}>Default Address</Checkbox> */}
        </ModalBody>
        <ModalFooter>
          <Button
            mb={2}
            bgColor={"#34638A"}
            color={"white"}
            _hover={{ bgColor: "gray.200", color: "#34638A" }}
            onClick={sendDataToApi}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAddress;
