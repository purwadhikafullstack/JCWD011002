import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Button } from '@chakra-ui/react'
import React from 'react'

const PopoverUpdateStatus = ({ approve, reject }) => {
  const btnStatusAttr = {
    bg: 'primary',
    color: 'white',
    _hover: {
      bg: 'editSecondary',
    }
  }
  return (
    <Popover ml={4} placement='bottom-start'>
      <PopoverTrigger>
        <Button {...btnStatusAttr}>Change Status</Button>
      </PopoverTrigger>
      <PopoverContent bg={"secondary"} color={"white"}>
        <PopoverHeader fontWeight='semibold'>Change Status Mutation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody textAlign={"center"}>
          <Button color={"white"} onClick={reject} type='submit' mr={4} colorScheme='red'>Reject</Button>
          <Button color={"white"} onClick={approve} type='submit' ml={4} colorScheme='green'>Approve</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverUpdateStatus