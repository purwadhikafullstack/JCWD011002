import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react'
const ReduceStockConfirm = ({ isReduceModalOpen, setIsReduceModalOpen, products, quantityToAdd, selectedWarehouse, setQuantityToAdd, updateStock }) => {
  return (
    <Modal isOpen={isReduceModalOpen} onClose={() => setIsReduceModalOpen(false)}>
      <ModalOverlay />
      <ModalContent bg={"darkBlue"} color={"white"}>
        <ModalHeader>Update Stock</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>You will reduce stock {products?.name} by {quantityToAdd} in warehouse {selectedWarehouse?.name}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' mr={3} onClick={() => {
            setIsReduceModalOpen(false)
            setQuantityToAdd(null || "")
          }}>
            Cancel
          </Button>
          <Button colorScheme='green'
            onClick={() => {
              updateStock();
              setIsReduceModalOpen(false);
            }}>Yes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ReduceStockConfirm