import { Box, Center, Flex, Image, Img } from '@chakra-ui/react'
import React from 'react'
const NotFound = () => {
  return (
    <Flex justifyContent="center" alignItems="center" align={"center"}>
      <Image position={"absolute"} top={"40%"} left={"50%"} transform={"translate(-50%, -50%)"} align={"center"} src="/images/Not-found_404.png" alt="Not Found 404" />
    </Flex>
  )
}

export default NotFound