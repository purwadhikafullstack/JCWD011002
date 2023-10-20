import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  Input,
  Button,
  Box,
  Text,
  useToast,
  DrawerCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const FormCreateCategory = ({ isOpen, onClose, fetchCategory, isLoading, setIsLoading }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const handleCreateCategory = async (categoryData) => {
    try {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("image", categoryData.image);

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        formData,
        { headers }
      );

      toast({
        title: "Create category success",
        status: "success",
        duration: "2000",
        isClosable: true,
      });
      fetchCategory();
    } catch (error) {
      console.log(error);
      toast({
        title: "Create category can't be completed",
        description:
          error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: "2000",
        isClosable: true,
      });
    } 
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      if (["image/jpeg", "image/png", "image/svg+xml"].includes(selectedImage.type) && selectedImage.size <= 1048576) {
        setFormData({
          ...formData,
          image: selectedImage
        });

        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = URL.createObjectURL(selectedImage);
      } else {
        toast({
          title: "Invalid image format or size",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      }
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.image) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleCreateCategory(formData);
      setFormData({
        name: "",
        image: null,
      });
      onClose();
    } else {
      toast({
        title: "Form validation failed",
        status: "error",
        duration: "2000",
        isClosable: true,
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent bg={"secondary"} color={"white"}>
          <DrawerCloseButton />
          <DrawerHeader>Create Category</DrawerHeader>
          <DrawerBody>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Category Name"
            />

            <Box mt={3}>
              <Text>Upload Image:</Text>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />

              {formData.image && (
                <img
                  id="imagePreview"
                  src={
                    formData.image ? URL.createObjectURL(formData.image) : ""
                  }
                  alt="Category Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              )}
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button w={"100%"} colorScheme="blue" mr={3} type="submit" isLoading={isLoading} loadingText="Creating...">
              Create
            </Button>
            <Button w={"100%"} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default FormCreateCategory;
