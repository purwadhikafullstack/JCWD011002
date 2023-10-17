import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  Flex,
  Badge,
  Divider,
  useToast,
  Card,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import AddAddress from "../components/Order/AddAddress";
import EditAddress from "../components/Order/EditAddress";
import DeleteAddress from "../components/Profile/DeleteAddress";
import { getAddressUser } from "../api/address";
import axios from "axios";

const UserAddress = () => {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const [address, setAddress] = useState([])
  const toast = useToast();
  const openAddAddressModal = () => {
    setIsAddAddressModalOpen(true);
  };

  const closeAddAddressModal = () => {
    setIsAddAddressModalOpen(false);
  };

  const handleAddAddress = (formData) => {
    console.log("Adding address:", formData);
    closeAddAddressModal();
  };

  const openEditAddressModal = (address) => {
    console.log('address from openEditAddressModal', address)
    setEditAddressData(address);
    setIsEditAddressModalOpen(true);
  };

  const closeEditAddressModal = () => {
    setIsEditAddressModalOpen(false);
  };

  const handleEditAddress = (formData) => {
    console.log("Editing address:", formData);
    closeEditAddressModal();
  };


  const handleDefaultAddress = async (id) => {
    const reqData = {
      is_default: true,
      city_name: address[id].city_name,
      province: address[id].province,
    }
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/address/${id}`, reqData, headers);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Address set as default successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error setting address as default:", error);
      toast({
        title: "Error",
        description: "An error occurred while setting address as default.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const fetchAddressUser = async () => {
    await getAddressUser(toast, setAddress)
  }
  useEffect(() => {
    fetchAddressUser()
  }, [])
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Card w={["100%", "80%"]} bg={"blueCold"} py={10}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box w={["100%", "80%", "50%"]}>
            <AddAddress
              isOpen={isAddAddressModalOpen}
              onClose={closeAddAddressModal}
              onAddAddress={handleAddAddress}
            />
            {editAddressData && (
              <EditAddress
                isOpen={isEditAddressModalOpen}
                onClose={closeEditAddressModal}
                onEditAddress={handleEditAddress}
                addressData={editAddressData}
              />
            )}
            <Button
              color={"white"}
              bg={"darkBlue"}
              onClick={openAddAddressModal}
              w={"100%"}
              _hover={{ bgColor: "white", color: "#34638A" }}
              variant={"outline"}
            >
              Add New Address
            </Button>
            <Box>
              {address.length === 0 ? (
                <Text align={"center"} color={"white"}>
                  No Address Found!
                </Text>
              ) : (
                address.map((address) => (
                  <Box bgColor={"white"} color={"#34638A"} boxShadow={"xl"} borderRadius={"5px"} mt={3} border={"4px"}
                    borderColor={address.is_default ? "#C6F7D4" : "white"} key={address.id}>
                    <Flex flexDirection={"column"}>
                      <Flex alignItems={"center"} justifyContent={"space-between"} mr={5}>
                        <Text px={3} py={2} fontSize={"md"} fontWeight={"bold"}>
                          {address.name}&nbsp;
                          {address.is_default && (
                            <Badge colorScheme="green">Default</Badge>
                          )}
                        </Text>
                        <DeleteAddress addressData={address} />
                      </Flex>
                      <Divider />
                      <Text color={"#34638A"} px={3} mt={1} fontSize={"lg"} fontWeight={"bold"}>
                        {address.user.name}
                      </Text>
                      <Text px={3} fontSize={"sm"}>{address.user.phone}</Text>
                      <Text px={3} fontSize={"sm"}>
                        {address.full_address}, {address.city_name},{" "}
                        {address.province}, {address.postal_code}
                      </Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} align={"center"} mr={4}>
                      <Button
                        ml={3}
                        mt={3}
                        mb={3}
                        size="sm"
                        bgColor={"#34638A"}
                        color={"white"}
                        _hover={{ bgColor: "gray.200", color: "#34638A" }}
                        onClick={() => handleDefaultAddress(address.id)}
                      >
                        Set as default
                      </Button>
                      <FiEdit
                        onClick={() => openEditAddressModal(address)}
                        cursor={"pointer"}
                        color="#34638A"
                        size={25}
                      />
                    </Flex>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
};

export default UserAddress;
