import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  useToast,
  useMediaQuery,
  extendTheme,
  Text,
  Flex,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  HiOutlineChevronDoubleRight,
  HiOutlineChevronDoubleLeft,
} from "react-icons/hi";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
  const pagesToDisplay = totalPages || calculatedTotalPages;

  const [inputPage, setInputPage] = useState(currentPage);
  const toast = useToast();

  const handleFirstPage = () => {
    const firstPage = 1;
    onPageChange(firstPage);
    setInputPage(firstPage);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      onPageChange(previousPage);
      setInputPage(previousPage);
    }
  };

  const handleNext = () => {
    if (currentPage < pagesToDisplay) {
      const nextPage = currentPage + 1;
      onPageChange(nextPage);
      setInputPage(nextPage);
    }
  };

  const handleLastPage = () => {
    const lastPage = pagesToDisplay;
    onPageChange(lastPage);
    setInputPage(lastPage);
  };

  const handleInputPageChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleGoToPage = () => {
    const page = parseInt(inputPage);
    if (page >= 1 && page <= pagesToDisplay) {
      onPageChange(page);
    } else {
      toast({
        title: "Invalid Page",
        description: `Please enter a page number between 1 and ${pagesToDisplay}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGoToPage();
    }
  };

  return (
    <Flex
      px={isMd ? 2 : 0}
      mt={2}
      color={"white"}
      w={"full"}
      justifyContent={"center"}
    >
      <HStack spacing={2}>
        <Button
          onClick={handleFirstPage}
          size={isMd ? "sm" : "sm"}
          variant="solid"
          isDisabled={currentPage === 1}
        >
          <HiOutlineChevronDoubleLeft />
        </Button>
        <Button
          onClick={handlePrevious}
          variant={"solid"}
          size={isMd ? "sm" : "sm"}
          isDisabled={currentPage === 1}
        >
          <Icon as={IoIosArrowBack} />
        </Button>
        {/* <Button
          key={currentPage}
          onClick={() => handlePageClick(currentPage)}
          variant="solid"
          size={isMd ? "sm" : "sm"}
        >
          {currentPage}
        </Button> */}
        <Input
          textAlign={"center"}
          type="number"
          variant="outline"
          borderRadius={7}
          color="white"
          size={isMd ? "sm" : "sm"}
          _hover={{ color: "black", bgColor: "white" }}
          w={"60px"}
          placeholder="Page"
          value={inputPage}
          onChange={handleInputPageChange}
          onKeyDown={handleInputKeyDown}
        />
        <Text w={"auto"} fontSize={"md"}>
          of {pagesToDisplay}
        </Text>
        <Button
          onClick={handleNext}
          variant="solid"
          size={isMd ? "sm" : "sm"}
          isDisabled={currentPage === pagesToDisplay}
        >
          <Icon as={IoIosArrowForward} />
        </Button>
        <Button
          onClick={handleLastPage}
          variant="solid"
          size={isMd ? "sm" : "sm"}
          isDisabled={currentPage === pagesToDisplay}
        >
          <HiOutlineChevronDoubleRight />
        </Button>
        {/* <Button
          size={isMd ? "sm" : "sm"}
          onClick={handleGoToPage}
          variant="solid"
        >
          Go
        </Button> */}
      </HStack>
    </Flex>
  );
};

export default Pagination;
