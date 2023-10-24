import React, { useEffect, useState } from 'react';
import { Button, Flex, Text, Input, useToast } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  HiOutlineChevronDoubleLeft as IcFirst,
  HiOutlineChevronDoubleRight as IcLast,
} from "react-icons/hi";
import Notification from '../../../../helpers/Notification';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [newPage, setNewPage] = useState(currentPage);
  const toast = useToast();

  useEffect(() => {
    setNewPage(currentPage);
  }, [currentPage]);
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleOnChange = (e) => {
    const page = parseInt(e.target.value);
    setNewPage(page);
  }

  const onEnterKey = (e) => {
    if (e.key === 'Enter') {
      const newPageNumber = parseInt(newPage);
      if (!isNaN(newPageNumber) && newPageNumber >= 1 && newPageNumber <= totalPages) {
        handlePageChange(newPageNumber);
      } else {
        return Notification(toast, { title: "Invalid Page", status: 500 });
      }
    }
  }

  return (
    <Flex justify="center" align={"center"} mt="4">
      <Button
        mr={1}
        onClick={() => handlePageChange(1)}
        variant={"solid"}
        isDisabled={currentPage === 1}
      >
        <IcFirst />
      </Button>
      <Button
        mr={1}
        onClick={() => handlePageChange(currentPage - 1)}
        variant={"solid"}
        isDisabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </Button>
      <Input w={"48px"}
        type='number'
        value={Math.min(newPage, totalPages)}
        onChange={handleOnChange}
        onKeyDown={onEnterKey} color={"white"}
        variant={"outline"}
        bg={"black"}
        textAlign={"center"}
        _hover={{ bg: "textPrimary", color: "textReversePrimary" }} />
      <Text mx={2}>of {totalPages}</Text>
      <Button
        ml={1}
        variant={"solid"}
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </Button>
      <Button
        ml={1}
        onClick={() => handlePageChange(totalPages)}
        variant={"solid"}
        isDisabled={currentPage === totalPages}
      >
        <IcLast />
      </Button>
    </Flex>
  );
};

export default Pagination;
