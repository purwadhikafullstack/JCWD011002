import React, { useState, useEffect } from "react";
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
  Checkbox,
  useToast,
  Select,
} from "@chakra-ui/react";
import { getCityByProvince, getProvince, updateAddressUser } from "../../api/address";
import Loading from "../Utility/Loading";
import LoadingBar from "../Utility/LoadingBar";

const EditAddress = ({ isOpen, onClose, onEditAddress, addressData, fetchAddressUser }) => {
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  }, [])
  useEffect(() => {
    fetchCity();
  }, [selectedProvinceId])

  useEffect(() => {
    if (addressData.province) {
      const selectedProvince = province.find(
        (p) => p.province === addressData.province
      );

      if (selectedProvince) {
        setSelectedProvinceId(selectedProvince.province_id);
        setSelectedProvinceName(selectedProvince.province);
      }
    }
  }, [province, addressData]);


  const handleSelectProvince = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(selectedId);
    setSelectedProvinceName(selectedName);
    // setCity([]);
  }

  const initialFormData = {
    name: addressData.name || "",
    province: addressData.province || "",
    city_name: addressData.city_name || "",
    postal_code: addressData.postal_code || "",
    full_address: addressData.full_address || "",
    is_default: addressData.is_default || false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const toast = useToast();
  useEffect(() => {
    setFormData({
      name: addressData.name || "",
      province: addressData.province || "",
      city_name: addressData.city_name || "",
      postal_code: addressData.postal_code || "",
      full_address: addressData.full_address || "",
      is_default: addressData.is_default || false,
    });
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleEditAddress = async () => {
    try {
      setIsLoading(true);
      await updateAddressUser(addressData, formData, toast, onEditAddress, onClose, selectedProvinceName);
      fetchAddressUser()
      setIsLoading(false);
    } catch (error) {
      console.error("Error editing address:", error);
    }
  };

  const optionAttr = {
    style: {
      color: "white",
      backgroundColor: "#233947",
    },
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading && <LoadingBar />}
      <ModalOverlay />
      <ModalContent color={"white"} bgColor={"#233947"}>
        <ModalHeader>Edit Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={2}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Province</FormLabel>
            <Select placeholder={formData.province} name="province" value={selectedProvinceId} onChange={handleSelectProvince}>
              {province.map((province) => (
                <option {...optionAttr} key={province.province_id} value={province.province_id}>{province.province}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>City Name</FormLabel>
            <Select isDisabled={!selectedProvinceId} placeholder={selectedProvinceId ? "select city" : formData.city_name} name="city_name" value={formData.city_name} onChange={handleChange} >
              {city.map((city) => (
                <option {...optionAttr} key={city.city_id} value={city.city_name}>{city.city_name}</option>
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
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Full Address</FormLabel>
            <Input
              type="text"
              name="full_address"
              value={formData.full_address}
              onChange={handleChange}
            />
          </FormControl>
          <Checkbox colorScheme="blue" name="is_default" isChecked={formData.is_default} onChange={handleChange}>
            Set as default
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor={"#34638A"}
            color={"white"}
            _hover={{ bgColor: "gray.200", color: "#34638A" }}
            colorScheme="blue"
            onClick={handleEditAddress}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAddress;
