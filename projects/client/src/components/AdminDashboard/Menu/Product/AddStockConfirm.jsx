import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react'
const AddStockConfirm = ({ isAddModalOpen, setIsAddModalOpen, products, quantityToAdd, selectedWarehouse, setQuantityToAdd, updateStock }) => {
  return (
    <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
      <ModalOverlay />
      <ModalContent bg={"darkBlue"} color={"white"}>
        <ModalHeader>Update Stock</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>You will increase stock {products?.name} by {quantityToAdd} in warehouse {selectedWarehouse?.name}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' mr={3} onClick={() => {
            setIsAddModalOpen(false)
            setQuantityToAdd(null || "")
          }}>
            Cancel
          </Button>
          <Button colorScheme='green'
            onClick={() => {
              updateStock();
              setIsAddModalOpen(false);
            }}>Yes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddStockConfirm