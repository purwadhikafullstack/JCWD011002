import { useToast, FormControl, FormLabel, Input, InputGroup, InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormErrorMessage } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { changePassword } from '../../api/profile';
import { useFormik } from 'formik';
import { passwordValidationSchema } from './Validation';
import { IconContext } from 'react-icons/lib';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react';
const ModalChangePassword = ({ isOpen, onClose }) => {

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem('token');

  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = async (values) => {
    await changePassword(token, toast, values, onClose);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      handleChangePassword(values);
    },
  });

  const iconAttr = {
    color: "white",
    boxSize: "20px",
  }

  const btnIconAttr = {
    variant: "ghost",
    _hover: {
      bgColor: "transparent",
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"secondary"} color={"textPrimary"}>
          <ModalHeader>Edit Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.touched.current_password && formik.errors.current_password}>
                <FormLabel>Current Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="current_password"
                    value={formik.values.current_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement mr={1}>
                    <Button onClick={toggleShowPassword} {...btnIconAttr}>
                      {showPassword ? <Icon as={ViewOffIcon} {...iconAttr} /> : <Icon as={ViewIcon}  {...iconAttr} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.current_password}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.new_password && formik.errors.new_password}>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="new_password"
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement mr={1}>
                    <Button onClick={toggleShowPassword} {...btnIconAttr}>
                      {showPassword ? <Icon as={ViewOffIcon} {...iconAttr} /> : <Icon as={ViewIcon}  {...iconAttr} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.new_password}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.confirm_password && formik.errors.confirm_password}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement mr={1}>
                    <Button onClick={toggleShowPassword} {...btnIconAttr}>
                      {showPassword ? <Icon as={ViewOffIcon} {...iconAttr} /> : <Icon as={ViewIcon}  {...iconAttr} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.confirm_password}</FormErrorMessage>
              </FormControl>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalChangePassword;
