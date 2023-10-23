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
  DrawerFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import LoadingBar from '../../../Utility/LoadingBar';

const CreateProduct = ({ isOpen, onClose, fetchProducts }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    price: '',
    description: '',
    id_category: '',
    is_active: true,
  });
  const [formattedPrice, setFormattedPrice] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const price = value.replace(/[,.]/g, '');
      setFormData({
        ...formData,
        [name]: price,
      });
      setFormattedPrice(formatPrice(price));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 1024 * 1024;
      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
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
          title: 'Invalid file type',
          description: 'Please select a JPG, JPEG, or PNG file (max 1MB).',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
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
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('id_category', formData.id_category);
      formDataToSend.append('is_active', formData.is_active);
      formDataToSend.append('image', formData.image);

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Product Created',
        description: 'Product data has been created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
      onClose();
      setFormData({
        name: '',
        image: null,
        price: '',
        description: '',
        id_category: '',
        is_active: true,
      });
      setFormattedPrice('');
      setImagePreview(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const optionAttr = {
    style: {
      backgroundColor: '#233947',
      color: 'white',
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={'secondary'} color={'white'}>
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
              type="file"
              name="image"
              onChange={handleImageChange}
              mb={4}
              required
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Image Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  marginBottom: '10px',
                }}
              />
            )}
            <Input
              name="price"
              type="text"
              placeholder="Price"
              value={formattedPrice}
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
              value={formData.id_category}
              onChange={handleChange}
              mb={4}
              required
            >
              <option {...optionAttr} value="">Select Category</option>
              {categories.map((category) => (
                <option {...optionAttr} key={category.id} value={category.id}>
                  {category?.name}
                </option>
              ))}
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
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme="blue"
            w={'full'}
            isLoading={isLoading}
            loadingText="Creating..."
            onClick={handleSubmit}
            isDisabled={!formData.name || !formData.price || !formData.id_category || !formData.image}
          >
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
      {isLoading && <LoadingBar />}
    </Drawer>
  );
};

export default CreateProduct;
