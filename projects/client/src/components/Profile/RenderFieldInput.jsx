import React from 'react';
import { FormControl, FormLabel, Input, Text, Flex, Button } from '@chakra-ui/react';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';
import { MdOutlineCancelPresentation } from 'react-icons/md';

function RenderFieldInput({ handleEditPasswordClick, fieldName, label, type, fieldValue, isEditing, onEditClick, onSaveClick, onCancelClick, onChange }) {

  return (
    <Flex align="center" justify="space-between" direction={{ base: 'column', md: 'row' }}>
      <FormControl color={"white"} m={4} w={isEditing[fieldName] ? '100%' : 'auto'}>
        <Flex alignItems={isEditing[fieldName] ? 'center' : ''} >
          <FormLabel>{label}: </FormLabel>
          {isEditing[fieldName] ? (
            <Input
              type={type}
              name={fieldName}
              value={fieldValue}
              onChange={onChange}
            />
          ) : (
            <Text>{fieldValue}</Text>
          )}
        </Flex>
      </FormControl>

      {fieldName === 'password' ? (
        <Button colorScheme="teal" onClick={handleEditPasswordClick}>
          <FaRegEdit />
        </Button>
      )
        : isEditing[fieldName] ? (
          <Flex>
            <Button colorScheme="blue" onClick={onSaveClick} mr={2}>
              <FaRegSave />
            </Button>
            <Button colorScheme='red' onClick={onCancelClick}><MdOutlineCancelPresentation /></Button>
          </Flex>
        ) : (
          <Button colorScheme="teal" onClick={onEditClick}>
            <FaRegEdit />
          </Button>
        )}
    </Flex>
  );
}

export default RenderFieldInput;
