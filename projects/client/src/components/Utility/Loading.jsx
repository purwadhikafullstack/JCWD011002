import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 0.3)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="9999"
      color={"darkBlue"}
    >
      <Spinner size="xl" color="blue.500" /> Loading...
    </Box>
  )
}

export default Loading