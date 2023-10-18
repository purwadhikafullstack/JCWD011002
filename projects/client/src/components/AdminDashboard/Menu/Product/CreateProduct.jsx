import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Box,
  Input,
  Button,
  Textarea,
  Select,
  Switch,
  Text,
  Image,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const CreateProduct = ({ isOpen, onClose, fetchProducts }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    price: '',
    description: '',
    id_category: '',
    is_active: true,
  });
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Validate file type and size
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 1024 * 1024; // 1MB

      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        // Set the image file and preview it
        setFormData({
          ...formData,
          image: file,
        });

        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFormData({
          ...formData,
          image: null,
        });
        toast({
          title: "Invalid file type",
          description: "Please select a JPG, JPEG, or PNG file (max 1MB).",
          status: "error",
          duration: 3000,
          isClosable: true,
        })

      }
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('id_category', formData.id_category);
      formDataToSend.append('is_active', formData.is_active);
      formDataToSend.append('image', formData.image); // Append the image file      

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      });
      toast({
        title: "Product Created",
        description: "Product data has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      fetchProducts();
      onClose();
      setFormData({
        name: '',
        image: null,
        price: '',
        description: '',
        id_category: '',
        is_active: true,
      })
      setImagePreview(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={"darkBlue"} color={"white"}>
        <DrawerCloseButton />
        <DrawerHeader>Create Product</DrawerHeader>
        <DrawerBody>
          <Box>
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              mb={4}
              required
            />
            <Input
              type="file" // Use type="file" for image upload
              name="image"
              onChange={handleImageChange}
              mb={4}
              required
            />
            {imagePreview && (
              <Image src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
            )}
            <Input
              name="price"
              type='number'
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              mb={4}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              mb={4}
              required
            />
            <Select
              name="id_category"
              placeholder="Select Category"
              value={formData.id_category}
              onChange={handleChange}
              mb={4}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category?.name}</option>
              ))}
              {/* Add options for categories */}
            </Select>
            <Box display="flex" alignItems="center" mb={4}>
              <Switch
                name="is_active"
                colorScheme="blue"
                isChecked={formData.is_active}
                onChange={() =>
                  setFormData({ ...formData, is_active: !formData.is_active })
                }
                mr={2}
              />
              <Text>Is Active</Text>
            </Box>
            <Box pos={"fixed"} w={"85%"} py={5} bg={"darkBlue"} bottom={0}>
              <Button
                colorScheme="blue" w={"full"}
                onClick={handleSubmit}
                isDisabled={!formData.name || !formData.price || !formData.id_category || !formData.image}
              >
                Create
              </Button>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateProduct;
