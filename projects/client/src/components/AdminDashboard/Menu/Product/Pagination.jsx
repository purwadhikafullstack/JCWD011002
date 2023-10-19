import React from 'react';
import { Button, Flex, } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const showPages = 5;
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 2) {
      for (let i = 1; i <= showPages; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    return pages;
  };
  const pagesToShow = getPageNumbers();

  return (
    <Flex justify="center" mt="4">
      <Button
        mr={1}
        onClick={() => handlePageChange(currentPage - 1)}
        bg={"white"}
        color={"black"}
        isDisabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </Button>
      {pagesToShow.map((page) => (
        <Button
          key={page}
          mx={1}
          onClick={() => handlePageChange(page)}
          color={"black"}
          bg={currentPage === page ? 'white' : 'gray'}
          style={{ borderRadius: '5px' }}
        >
          {page}
        </Button>
      ))}
      <Button
        ml={1}
        bg={"white"} color={"black"}
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </Button>
    </Flex>
  );
};


export default Pagination;
