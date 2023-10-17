import React from 'react'
import { Box } from '@chakra-ui/react'
const RenderDataUser = ({ userData, renderField }) => {
  return (
    <>
      <Box p={4} w={['100%', '50%']}>
        {renderField('name', 'Name', 'text')}
        <Box border={'2px'} borderColor={'primary'}></Box>
        {renderField('username', 'Username', 'text')}
        <Box border={'2px'} borderColor={'primary'}></Box>
        {renderField('email', 'Email', 'email')}
        <Box border={'2px'} borderColor={'primary'}></Box>
        {renderField('phone', 'Phone', 'text')}
        <Box border={'2px'} borderColor={'primary'}></Box>
        {userData.role.name === 'admin' ? renderField('role', 'Role', 'text') : null}
        {renderField('password', 'Password', 'password')}
        <Box border={'2px'} borderColor={'primary'}></Box>
      </Box>
    </>
  )
}

export default RenderDataUser