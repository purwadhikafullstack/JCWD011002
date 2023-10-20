import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Text,
  Button,
  Stack,
  Flex,
  Input,
  useToast,
} from '@chakra-ui/react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAvatar, fetchUserData } from '../../storage/userReducer';

const ChangeAvatar = () => {
  const toast = useToast();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.isLoading);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditingAvatar(true);
  };

  const handleCancelAvatarClick = () => {
    setIsEditingAvatar(false);
    setPreviewUrl(`${process.env.REACT_APP_API_BASE_URL}/${userData?.avatar}`);
  };

  const handleSaveAvatarClick = async () => {
    try {
      if (file) {
        await dispatch(updateUserAvatar({ token, file, userData }));
        dispatch(fetchUserData(toast));
        toast({
          title: 'Success',
          description: 'Avatar updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsEditingAvatar(false);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'File size exceeds 1MB limit',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (
        !['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'].includes(
          selectedFile.type
        )
      ) {
        toast({
          title: 'Error',
          description:
            'Invalid file type. Please select a JPEG, PNG, or SVG image.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFile(selectedFile);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <Box isLoading={loading} w={['100%', '30%']} align={'center'} mt={{ base: 4, md: 4, lg: 0 }}>
        <Avatar borderRadius='full' boxSize='150px' src={previewUrl === null ? `${process.env.REACT_APP_API_BASE_URL}/${userData?.avatar}` : previewUrl} />
        <Box my={2}>
          {isEditingAvatar ? (
            <Stack spacing={4} w={'50%'}>
              <Input type='file' accept='image/*' onChange={handleFileChange} />
              <Flex justifyContent={'space-evenly'}>
                <Button colorScheme='blue' onClick={handleSaveAvatarClick}>
                  <FaRegSave />
                </Button>
                <Button colorScheme='red' onClick={handleCancelAvatarClick}>
                  <MdOutlineCancelPresentation />
                </Button>
              </Flex>
            </Stack>
          ) : (
            <Button colorScheme='teal' onClick={handleEditAvatarClick}>
              <Text mr={2}>
                Change
              </Text>{' '}
              <FaRegEdit />
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChangeAvatar;
