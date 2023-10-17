import React from 'react'
import {Box, Avatar, Text, Button, Stack, Flex, Input} from '@chakra-ui/react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'

const ChangeAvatar = ({userData, isEditingAvatar, handleCancelAvatarClick, handleEditAvatarClick, handleSaveAvatarClick, handleFileChange}) => {
  return (
    <>
      <Box w={['100%', '30%']} align={'center'}>
            <Avatar borderRadius='full' boxSize='150px' src={`${process.env.REACT_APP_API_BASE_URL}/${userData?.avatar}`} />
            <Box my={2}>
              {isEditingAvatar ? (
                <Stack spacing={4} w={'50%'}>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                  <Flex justifyContent={'space-evenly'}>
                    <Button colorScheme="blue" onClick={handleSaveAvatarClick}>
                      <FaRegSave />
                    </Button>
                    <Button colorScheme='red' onClick={handleCancelAvatarClick}><MdOutlineCancelPresentation /></Button>
                  </Flex>
                </Stack>
              ) : (
                <Button colorScheme="teal" onClick={handleEditAvatarClick}>
                  <Text mr={2}>Change</Text> <FaRegEdit />
                </Button>
              )}
            </Box>
          </Box>
    </>
  )
}

export default ChangeAvatar