import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Box,
  Image,
  Text,
  Button,
  Divider,
  Input,
  Textarea,
  Select,
  useToast,
  DrawerFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const DetailProduct = ({ isOpen, onClose, product, fetchProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    id_category: '',
    is_active: '',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageValidationError, setImageValidationError] = useState(null);
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const [currentProductImage, setCurrentProductImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    setCurrentProductImage(`${process.env.REACT_APP_API_BASE_URL}/${product?.image}`);
  }, [product]);

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

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 1024 * 1024;
      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setEditedProduct({
          ...editedProduct,
          [name]: file,
        });

        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
          setImageValidationError(null);
          setCurrentProductImage(null);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
        setImageValidationError('Invalid file type or size (max 1MB).');
        toast({
          title: "Invalid file type",
          description: "Please select a JPG, JPEG, or PNG file (max 1MB).",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        setEditedProduct({
          ...editedProduct,
          [name]: null,
        });
      }
    } else {
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      });
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedProduct({
      name: product?.name,
      description: product?.description,
      id_category: product?.id_category,
      is_active: product?.is_active,
      price: product?.price,
      image: product?.image,
    });
    setImagePreview(null);
    setImageValidationError(null);
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', editedProduct.name);
      formData.append('description', editedProduct.description);
      formData.append('id_category', editedProduct.id_category);
      formData.append('is_active', editedProduct.is_active);
      formData.append('price', editedProduct.price);
      formData.append('image', editedProduct.image);

      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/${product?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      fetchProduct();
      toast({
        title: "Product Updated",
        description: "Product data has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const price = formatter.format(product?.price);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={'secondary'} color={'white'}>
        <DrawerCloseButton />
        <DrawerHeader>Product Details</DrawerHeader>
        <DrawerBody>
          <Box>
            {isEditing ? (
              <>
                {editedProduct.image && !imagePreview && (
                  <Image
                    src={`${process.env.REACT_APP_API_BASE_URL}/${editedProduct.image}`}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="5px"
                    mt={2}
                  />
                )}

                {imagePreview && (
                  <Image
                    src={imagePreview}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="5px"
                    mt={2}
                  />
                )}

                <Input
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleEditChange}
                />
                {imageValidationError && (
                  <Text color="red">{imageValidationError}</Text>
                )}
              </>
            ) : (
              <Image
                src={`${process.env.REACT_APP_API_BASE_URL}/${product?.image}`}
                boxSize="150px"
                objectFit="cover"
                borderRadius="5px"
              />
            )}
          </Box>
          <Box mt={4}>
            <Box mb={2}>
              <Text>Name :</Text>
              {isEditing ? (
                <Input
                  name="name"
                  value={editedProduct.name}
                  onChange={handleEditChange}
                />
              ) : (
                <Text>{product?.name}</Text>
              )}
              <Divider mt={2} />
            </Box>
            <Box mb={2}>
              <Text>Description :</Text>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleEditChange}
                />
              ) : (
                <Text>{product?.description}</Text>
              )}
              <Divider mt={2} />
            </Box>
            <Box mb={2}>
              <Text>Category :</Text>
              {isEditing ? (
                <Select
                  name="id_category"
                  placeholder='Select Category'
                  value={editedProduct.id_category}
                  onChange={handleEditChange}
                >
                  {categories.map((category) => (
                    <option style={{ color: "white", backgroundColor: "#233947" }} key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </Select>
              ) : (
                <Text>{product?._category?.name}</Text>
              )}
              <Divider mt={2} />
            </Box>
            <Box mb={2}>
              <Text>Status :</Text>
              {isEditing ? (
                <Select
                  name="is_active"
                  value={editedProduct.is_active}
                  onChange={handleEditChange}
                >
                  <option style={{ color: "white", backgroundColor: "#233947" }} value="true">Active</option>
                  <option style={{ color: "white", backgroundColor: "#233947" }} value="false">Inactive</option>
                </Select>
              ) : (
                <Text>{product?.is_active ? 'Active' : 'Inactive'}</Text>
              )}
              <Divider mt={2} />
            </Box>
            <Box mb={2}>
              <Text>Price :</Text>
              {isEditing ? (
                <Input
                  type="number"
                  name="price"
                  value={editedProduct?.price}
                  onChange={handleEditChange}
                />
              ) : (
                <Text>{price}</Text>
              )}
              <Divider mt={2} />
            </Box>
            <Box mb={2}>
              {isEditing ? (
                null
              ) : (
                <>
                  <Text>Total Stock : </Text>
                  <Text>
                    {product?.product_warehouses
                      ?.map((warehouse) => warehouse?.stock)
                      .reduce((a, b) => a + b, 0)}{' '}
                    Pcs
                  </Text>
                  <Divider mt={2} />
                </>
              )}
            </Box>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          {decodedToken.role === 'admin' && (
            <Box w={'full'}>
              {isEditing ? (
                <>
                  <Button
                    w={'full'}
                    mb={2}
                    isLoading={isLoading} loadingText="Saving..."
                    colorScheme="green"
                    onClick={saveChanges}
                  >
                    Save
                  </Button>
                  <Button w={'full'} mb={2} onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  w={'full'}
                  mb={2}
                  colorScheme="green"
                  onClick={startEditing}
                >
                  Edit
                </Button>
              )}
            </Box>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailProduct;
