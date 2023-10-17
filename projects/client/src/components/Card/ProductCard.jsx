import React from 'react';
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Button,
  Grid,
} from '@chakra-ui/react';
import { BsHandbag, BsArrowUpRight } from 'react-icons/bs';

export default function ProductCard() {
  const boxShadowColor = useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan');

  const productDummy = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Category 1',
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Category 2',
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Category 3',
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Category 4',
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    }
  ];

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={4}
      px={[2, 4, 6]}
      justifyContent="center"
      mb={20}
    >
      {productDummy.map((product) => (
        <Box
          key={product.id}
          rounded={'sm'}
          overflow={'hidden'}
          bg={'white'}
          border={'1px'}
          borderColor={'black'}
          boxShadow={boxShadowColor}
        >
          <Box h={'200px'} borderBottom={'1px'} borderColor={'black'}>
            <Img
              src={product.image}
              roundedTop={'sm'}
              objectFit={'cover'}
              h={'full'}
              w={'full'}
              alt={'Blog Image'}
            />
          </Box>
          <Box p={4}>
            <Box
              bg={'black'}
              display={'inline-block'}
              px={2}
              py={1}
              color={'white'}
              mb={2}
            >
              <Text fontSize={'xs'} fontWeight={'medium'}>
                {product.category}
              </Text>
            </Box>
            <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
              {product.name}
            </Heading>
            <Text color={'gray.500'} noOfLines={2}>
              {product.description}
            </Text>
          </Box>
          <HStack borderTop={'1px'} color={'black'}>
            <Flex
              p={4}
              alignItems="center"
              justifyContent={'space-between'}
              roundedBottom={'sm'}
              cursor={'pointer'}
              w={'full'}
            >
              <Text fontSize={'md'} fontWeight={'semibold'}>
                Rp {product.price}
              </Text>
              <Button
                background={'transparent'}
                _hover={{
                  bg: 'transparent',
                }}
              >
                <BsArrowUpRight fontSize={'20px'} />
              </Button>
            </Flex>
            <Flex
              p={4}
              alignItems="center"
              justifyContent={'space-between'}
              roundedBottom={'sm'}
              borderLeft={'1px'}
              cursor="pointer"
            >
              <Button bg="transparent" _hover={{ bg: 'transparent' }}>
                <BsHandbag fontSize={'24px'} />
              </Button>
            </Flex>
          </HStack>
        </Box>
      ))}
    </Grid>
  );
}
