import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Text,
  Select,
  Divider,
  Box,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
const RequestMutation = ({ isOpen, onClose, products, fetchProducts, fetchDetailStock }) => {
  const [warehouse, setWarehouse] = useState([])
  const [warehouseId, setWarehouseId] = useState()
  const [qty, setQty] = useState(null)
  const toast = useToast()
  const fetchWarehouse = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stock/warehouse?id_product=${products.id}&qty=${qty}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setWarehouse(data.data)
      if (data.data.length === 0) {
        toast({
          title: 'quantity is larger than any warehouse stock',
          status: 'warning',
          duration: 3000,
          isClosable: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWarehouse()
  }, [qty])

  const sendRequestMutation = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/stock`, {
        id_product: products.id,
        id_warehouse_from: warehouseId,
        qty: qty
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      toast({
        title: 'success send request mutation',
        description: 'check your mutation request',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      onClose()
      fetchProducts()
      fetchDetailStock(products.id)
    } catch (error) {
      console.log(error)
    }
  }

  const optionAttr = {
    style: {
      color: "white",
      backgroundColor: "#233947",
    }
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
          <DrawerHeader>Request Mutation</DrawerHeader>

          <DrawerBody>
            <Text>Prodcut :</Text>
            <Text fontSize={'xl'}>{products?.name}</Text>
            <Divider my={4} />
            <Text>Qty :</Text>
            <Input type='number' name='qty' placeholder='0' value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10))} />
            <Divider my={4} />
            <Text>Choose Warehouse :</Text>
            <Select value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)}>
              <option {...optionAttr} key={0} value={0}>Select Warehouse</option>
              {warehouse?.map((item) => (
                <option {...optionAttr} key={item.id} value={item?.warehouse?.id}>{item?.warehouse?.name} ({item?.stock} pcs)</option>
              ))}
              {warehouse.length === 0 && (
                <option {...optionAttr} key={0} value={0}>No warehouse</option>
              )}
            </Select>
          </DrawerBody>

          <DrawerFooter w={"full"} display={"flex"} flexDirection={"column"} >
            <Box w={"full"} >
              <Button w={"full"} type='submit' colorScheme='blue' onClick={sendRequestMutation}>Send Request</Button>
            </Box>
            <Box w={"full"}>
              <Button w={"full"} mt={4} colorScheme='gray' mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default RequestMutation