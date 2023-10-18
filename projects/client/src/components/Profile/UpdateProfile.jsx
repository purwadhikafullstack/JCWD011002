import React, { useEffect, useState } from 'react';
import { useToast, Flex, Card } from '@chakra-ui/react';
import { getUser, updateUser } from '../../api/profile';
import ModalChangePassword from './ModalChangePassword';
import RenderFieldInput from './RenderFieldInput';
import ChangeAvatar from './ChangeAvatar';
import RenderDataUser from './RenderDataUser';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    is_verified: false,
    current_password: '',
    new_password: '',
    confirm_password: '',
    avatar: '',
  });
  const fetchUserData = async () => {
    if (token) {
      const { data } = await getUser(token, setUserData, toast);
      setUserData(data)
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const [isEditing, setIsEditing] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
    role: false,
    password: false,
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem('token');

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };

  const handleCancelPasswordClick = () => {
    setIsEditingPassword(false);
  };
  const handleEditClick = (fieldName) => {
    setIsEditing({ ...isEditing, [fieldName]: true });
  };

  const handleCancelClick = (fieldName) => {
    setIsEditing({ ...isEditing, [fieldName]: false });
  };

  const handleSaveClick = async (fieldName) => {
    await updateUser(token, toast, userData);
    setIsEditing({ ...isEditing, [fieldName]: false });
    setIsEditingPassword(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const renderField = (fieldName, label, type) => {
    const fieldValue = fieldName === 'password' ? '*'.repeat(12) : userData[fieldName];

    return (
      <RenderFieldInput
        fieldName={fieldName}
        label={label}
        type={type}
        fieldValue={fieldValue}
        isEditing={isEditing}
        onEditClick={() => handleEditClick(fieldName)}
        onSaveClick={() => handleSaveClick(fieldName)}
        onCancelClick={() => handleCancelClick(fieldName)}
        onChange={handleInputChange}
        handleEditPasswordClick={handleEditPasswordClick}
      />
    );
  };


  return (
    <Flex justifyContent={"center"}>
      <Card w={['100%', '100%', '90%']} bg={"blueCold"}>
        <Flex justifyContent="center" alignItems="center" minH="65vh" direction={{ base: 'column', md: 'column', xl: 'row' }}>
          <ChangeAvatar
            userData={userData}
          />
          <RenderDataUser userData={userData} renderField={renderField} />
          <ModalChangePassword
            userData={userData}
            isOpen={isEditingPassword}
            onClose={handleCancelPasswordClick}
            handleInputChange={handleInputChange}
          />
        </Flex>
      </Card>
    </Flex>
  );
}

export default UserProfile;
