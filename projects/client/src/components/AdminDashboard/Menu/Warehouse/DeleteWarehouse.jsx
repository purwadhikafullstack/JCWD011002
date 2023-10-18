import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import React from 'react'

const DeleteWarehouse = ({ isDeleteModalOpen, closeDeleteModal, handleDeleteWarehouse }) => {
  
  return (
    <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} >
      <ModalOverlay />
      <ModalContent bg={"secondary"} color={"white"}>
        <ModalHeader>Delete Warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this warehouse?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDeleteWarehouse}>
            Delete
          </Button>
          <Button onClick={closeDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteWarehouse