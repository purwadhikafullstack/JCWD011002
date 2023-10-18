import React, { useState, useEffect } from "react";
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
  Image,
  DrawerCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const UpdateCategory = ({ isOpen, onClose, categoryId, fetchCategory }) => {
  const toast = useToast();
  const [categoryData, setCategoryData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const fetchCategoryData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/category/${categoryId}`,
        { headers }
      );

      setCategoryData(data.data);
      if (data.data.image) {
        setPreviewImage(`${process.env.REACT_APP_API_BASE_URL}/${data.data.image}`);
      } else {
        setPreviewImage(null);
      }

    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategoryData();
    }
  }, [isOpen]);

  const handleUpdateCategory = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const formData = new FormData();
      formData.append("name", categoryData.name);
      if (categoryData.image) {
        formData.append("image", categoryData.image);
      }

      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/category/${categoryId}`,
        formData,
        { headers }
      );
      toast({
        title: "Edit category success",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchCategory();
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to edit category",
        description: error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleNameChange = (e) => {
    setCategoryData({ ...categoryData, name: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSizeMB = 1;
      const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

      if (selectedFile.size / (1024 * 1024) > maxSizeMB) {
        toast({
          title: "Error",
          description: "File size exceeds the maximum allowed size (1 MB).",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Error",
          description: "File type is not allowed (jpg, png, svg).",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      setCategoryData({ ...categoryData, image: selectedFile });
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={"secondary"} color={"white"}>
      <DrawerCloseButton />
        <DrawerHeader>Edit Category</DrawerHeader>
        <DrawerBody>
          <Input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleNameChange}
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
            {previewImage && (
              <Image
                src={previewImage}
                alt="Category Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button w={"100%"} colorScheme="blue" mr={3} onClick={handleUpdateCategory}>
            Save
          </Button>
          <Button w={"100%"} onClick={onClose}>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateCategory;
