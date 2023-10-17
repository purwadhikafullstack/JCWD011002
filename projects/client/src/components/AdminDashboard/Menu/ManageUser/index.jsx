import {
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import UserList from "./UsersList";
import { getUsers } from "../../../../api/admin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddButton from "./AddButton";
import Searchbar from "./Searchbar";
import Pagination from "../../../Utility/Pagination";
import { useSearchParams } from "react-router-dom";

const utilityContainer = {
  direction: "row",
};

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [maxPage, setMaxpage] = useState(1);
  const [searchPageParams, setCurrentPage] = useSearchParams({ page: 1 });
  const toast = useToast();
  const triggerUpdate = useSelector((state) => state.trigger.listUser);
  const search = useSelector((state) => state.search.users);
  const currentPage = searchPageParams.get("page");

  async function fetchUsers() {
    const attributes = {
      search,
      page: currentPage,
    };
    const { data } = await getUsers(toast, attributes);
    const { users: userList, pages } = data;
    setMaxpage(pages);
    setUsers(userList);
  }

  const userListAttr = {
    users,
  };

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage,
  };

  useEffect(() => {
    fetchUsers();
  }, [search, currentPage, triggerUpdate]);

  const mainContainer = {
    w: "full",
    direction: "column",
    pos: "relative",
    gap: "16px",
  };

  const containerAttr = {
    w: "full",
    overflowX: "hidden",
  };

  const thAttr = {
    color: "textPrimary",
    textAlign: "center",
  };

  const tableAttr = {
    variant: "striped",
    bgColor: "bgSecondary",
    colorScheme: "whiteAlpha"
  };

  return (
    <Flex {...mainContainer}>
      <Flex {...utilityContainer}>
        <AddButton />
        <Spacer />
        <Searchbar />
      </Flex>
      <TableContainer {...containerAttr}>
        <Table {...tableAttr}>
          <Thead bgColor={"primary"}>
            <Tr>
              <Th {...thAttr}>No</Th>
              <Th {...thAttr}>Name</Th>
              <Th {...thAttr}>Role</Th>
              <Th {...thAttr}>Warehouse</Th>
              <Th {...thAttr}>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <UserList {...userListAttr} />
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer />
      <Pagination {...paginationAttr} />
    </Flex>
  );
}

export default ManageUsers;
