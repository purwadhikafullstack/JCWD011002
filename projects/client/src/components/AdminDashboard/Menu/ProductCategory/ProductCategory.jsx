import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  IconButton,
  Button,
  useDisclosure,
  useToast,
  Flex,
  ButtonGroup,
  Box,
  Image,
  Spacer,
  Icon
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal"
import FormCreateCategory from "./CreateCategory";
import Pagination from "../Product/Pagination";
import FilterCategory from "./FilterCategory";
import UpdateCategory from "./UpdateCategory";
import { getRole } from "../../../../helpers/Roles";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure()
  const role = getRole();
  const toast = useToast()
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        {
          params: {
            page: search ? null : page,
            sort,
            name,
            search,
            limit
          },
          headers
        }
      );
      setCategories(data.data);
      setTotalPages(data.message.totalPages)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [sort, name, search, page, limit]);

  const handleDelete = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onConfirmationOpen();
  };

  const handleConfirmationDelete = async () => {
    try {

      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/category/${selectedCategoryId}`,
        { headers }
      );

      toast({
        title: "Category successfully deleted",
        status: "success",
        duration: "2000",
        isClosable: true,
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== selectedCategoryId)
      );
    } catch (error) {
      toast({
        title: "Failed to delete category",
        description: error.response.data.message || error.response.data.errors[0].msg,
        status: "error",
        duration: "2000",
        isClosable: true,
      })
    } finally {
      setSelectedCategoryId(null);
      onConfirmationClose();
    }
  };
  const handleEdit = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsEditOpen(true);
  }
  function NotFound() {
    const container = {
      textAlign: "center",
      fontWeight: "semibold",
      colSpan: 3,
    };
    return (
      <Tr>
        <Td {...container}>Not Found</Td>
      </Tr>
    );
  }
  return (
    <Flex direction={"column"} w={"full"}>
      <Flex justifyContent={role === "admin" ? "space-between" : "flex-end"} mb={2}>
        {role === "admin" &&
          <Button bg={"primary"} color={"white"} onClick={onOpen} _hover={{ bg: "editSecondary" }}>
            <Icon as={AddIcon} mr={2} boxSize={"12px"} /> Create Category
            <FormCreateCategory isLoading={isLoading} setIsLoading={setIsLoading} isOpen={isOpen} onClose={onClose} fetchCategory={fetchCategories} />
          </Button>
        }
        <FilterCategory search={search} setSearch={setSearch} sort={sort} setSort={setSort} name={name} setName={setName} searchInput={searchInput} setSearchInput={setSearchInput} />
      </Flex>

      <TableContainer>
        <Table variant={"striped"} colorScheme="whiteAlpha"
          bgColor={"bgSecondary"}>
          <Thead bg={"primary"}>
            <Tr>
              <Th color={"white"}>No</Th>
              <Th color={"white"}>Image</Th>
              <Th color={"white"}>Category Name</Th>
              {role === "admin" && <Th color={"white"}>Action</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {categories.length > 0 && categories?.map((category, index) => (
              <Tr key={category.id}>
                <Td>{index + 1}</Td>
                <Td><Image src={`${process.env.REACT_APP_API_BASE_URL}/${category.image}`} alt={category.name} width={50} height={50} /></Td>
                <Td>{category.name}</Td>
                {role === "admin" &&
                  <Td>
                    <>
                      <IconButton mr={3}
                        icon={<EditIcon />}
                        colorScheme="blue"
                        onClick={() => handleEdit(category.id)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(category.id)}
                      />
                    </>
                  </Td>
                }
              </Tr>
            ))}
            {(!categories || categories.length) === 0 && <NotFound />}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer />
      {categories.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      ) : null}

      <UpdateCategory isLoading={isLoading} setIsLoading={setIsLoading} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} categoryId={selectedCategoryId} fetchCategory={fetchCategories} />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        onConfirm={handleConfirmationDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
      />
    </Flex>
  );
};

export default ProductCategory;
