import React from 'react';
import {
  Box,
  Text,
  Center,
  useColorModeValue,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';

const CategoryCard = () => {
  const categoryDummy = [
    {
      id: 1,
      name: 'Category 1',
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      id: 2,
      name: 'Category 2',
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      id: 3,
      name: 'Category 3',
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      id: 4,
      name: 'Category 4',
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
  ];

  return (
    <>
      <Flex justifyContent={'center'} alignContent="center" flexWrap={"wrap"}>
        {categoryDummy.map((category) => (
          <Box
            key={category.id}
            bg={`url(${category.image}) no-repeat center center`}
            backgroundSize="cover"
            mx={4}
            my={2}
            borderRadius="md"
            boxShadow="md"
            width="200px"
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            textTransform="uppercase"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 'md',
            }}
          >
            <Center zIndex={1} h="100%">
              <Text fontSize="lg" fontWeight="bold">
                {category.name}
              </Text>
            </Center>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default CategoryCard;
