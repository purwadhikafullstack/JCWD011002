import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const LineBreak = ({ data, mt = "8px", mb = "8px" }) => {
  return (
    <>
      <Flex mt={mt} mb={mb} justifyContent={'center'} alignContent={'center'} alignItems="center">
        <Box borderBottom="2px solid" borderColor="textSecondary" flexGrow={1} mr={4} my={2}></Box>
        <Text align={'center'} fontSize="xl" fontWeight="bold">
          {data}
        </Text>
        <Box borderBottom="2px solid" borderColor="textSecondary" flexGrow={1} ml={4} my={2}></Box>
      </Flex>
    </>
  )
}

export default LineBreak