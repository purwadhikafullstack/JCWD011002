import React, { useState } from 'react';
import axios from 'axios';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Button,
  DrawerHeader,
  DrawerBody,
  Input,
  Table,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  HStack,
  useToast,
  Flex,
  DrawerFooter,
} from '@chakra-ui/react';
import AddStockConfirm from './AddStockConfirm';
import ReduceStockConfirm from './ReduceStockConfirm';
import jwtDecode from 'jwt-decode';
import RequestMutation from '../Mutation/RequestMutation';

const EditStockDrawer = ({ isOpen, onClose, products, fetchProducts, fetchDetailStock }) => {
  const [quantityToAdd, setQuantityToAdd] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReducing, setIsReducing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReduceModalOpen, setIsReduceModalOpen] = useState(false);
  const [isRequestMutation, setIsRequestMutation] = useState(false);
  const quantityToAddAsInt = parseInt(quantityToAdd, 10);
  const decode = jwtDecode(localStorage.getItem('token'));
  const role = decode.role
  const toast = useToast();

  const validateAndOpenModal = (warehouse, stock, isReducing) => {

    if (isReducing && quantityToAddAsInt > stock) {
      toast({
        title: 'stock not enough',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return;
    }

    setSelectedProduct(warehouse?.id_product);
    setSelectedWarehouse(warehouse?.warehouse);
    setIsReducing(isReducing);
    isReducing ? setIsReduceModalOpen(true) : setIsAddModalOpen(true);
  };


  const updateStock = async () => {
    try {

      const data = {
        productId: selectedProduct,
        warehouseId: selectedWarehouse?.id,
        addition: isReducing ? null : quantityToAddAsInt,
        subtraction: isReducing ? quantityToAddAsInt : null,
      };
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/stock`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 200) {
        setQuantityToAdd(null || "");
        fetchProducts();
        fetchDetailStock(products.id);
        toast({
          title: 'sucessfully updated stock',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'failed to update stock',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  };

  const handleRequestMutationClick = () => {
    setIsRequestMutation(true);
    onClose();
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={"secondary"} color={"white"}>
          <DrawerCloseButton />
          <DrawerHeader>{products?.name}</DrawerHeader>

          <DrawerBody>
            <Text></Text>
            <Accordion defaultIndex={[0]} allowToggle>
              {products?.product_warehouses.map((warehouse, index) => {
                return (
                  <AccordionItem key={warehouse.id || index}>
                    <h2>
                      <AccordionButton>
                        <Box flex='1' textAlign='left'>
                          <Flex justifyContent={"space-between"}>
                            <Box>{warehouse?.warehouse?.name}</Box>
                            <Box mr={4}>{warehouse?.stock} pcs</Box>
                          </Flex>
                        </Box>

                        <AccordionIcon />

                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <form>
                        <Box display='flex' alignItems='center'>
                          <Text mr={2}>Qty:</Text>
                          <Input
                            placeholder='0'
                            type='number'
                            value={quantityToAdd}
                            onChange={(e) => setQuantityToAdd(e.target.value)}
                          />

                        </Box>
                        <HStack mt={2}>
                          <Button w={"100%"}
                            isDisabled={!quantityToAdd || quantityToAdd === null}
                            colorScheme='red'
                            onClick={() => {
                              validateAndOpenModal(warehouse, warehouse?.stock, true)
                            }}
                          >
                            reduce
                          </Button>
                          <Button w={"100%"}
                            isDisabled={!quantityToAdd || quantityToAdd === null}
                            colorScheme='green'
                            onClick={() => {
                              validateAndOpenModal(warehouse, warehouse?.stock, false)
                            }}
                          >
                            add
                          </Button>
                        </HStack>
                      </form>
                      <AddStockConfirm isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} products={products} quantityToAdd={quantityToAdd} selectedWarehouse={selectedWarehouse} setQuantityToAdd={setQuantityToAdd} updateStock={updateStock} />
                      <ReduceStockConfirm isReduceModalOpen={isReduceModalOpen} setIsReduceModalOpen={setIsReduceModalOpen} products={products} quantityToAdd={quantityToAdd} selectedWarehouse={selectedWarehouse} setQuantityToAdd={setQuantityToAdd} updateStock={updateStock} />
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            {role === "admin warehouse" && <Button bg={"green.500"} color={"white"} w={"full"} onClick={handleRequestMutationClick}>Request Mutation</Button>
            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <RequestMutation isOpen={isRequestMutation} onClose={() => setIsRequestMutation(false)} products={products} fetchProducts={fetchProducts} fetchDetailStock={fetchDetailStock} detailStockClosed={onClose} />
    </>
  );
};

export default EditStockDrawer;
