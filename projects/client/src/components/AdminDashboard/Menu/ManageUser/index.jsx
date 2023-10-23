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
import Pagination from "../../../Utility/Pagination";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import LoadingBar from "../../../Utility/LoadingBar";

const utilityContainer = {
  direction: "row",
};

function ManageUsers() {
  const [isLoading, setLoading] = useState(false);
  const [firstRander, setFirstRander] = useState(true);
  const [users, setUsers] = useState([]);
  const [maxPage, setMaxpage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  const triggerUpdate = useSelector((state) => state.trigger.listUser);
  const search = useSelector((state) => state.search.users) || "";
  const currentPage = searchParams.get("page") || 1;
  const currentSort = searchParams.get("sort") || "ASC";
  const currentRoles = searchParams.get("role") || 0;
  const currentWarehouse = searchParams.get("warehouse") || 0;
  const dependancies = [currentSort, currentRoles, currentWarehouse, search];
  const limit = 10;

  async function fetchUsers() {
    const attributes = {
      search,
      page: currentPage,
      limit,
      sort: currentSort,
      role: currentRoles,
      warehouse: currentWarehouse,
    };
    if (parseInt(attributes?.warehouse) === 0) delete attributes.warehouse;
    if (parseInt(attributes?.role) === 0) delete attributes.role;
    setLoading(true);
    const { data } = await getUsers(toast, attributes);
    const { users: userList, pages } = data;
    setLoading(false);
    setMaxpage(pages);
    setUsers(userList);
    setFirstRander(false);
  }

  const userListAttr = {
    users,
    page: currentPage,
    limit,
  };

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage: setSearchParams,
  };

  function resetPage() {
    setSearchParams((prev) => {
      if (!firstRander) {
        prev.set("page", 1);
        return prev;
      }
    });
  }

  useEffect(() => {
    fetchUsers();
  }, [currentPage, triggerUpdate, ...dependancies]);

  useEffect(() => {
    resetPage();
  }, dependancies);

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
    colorScheme: "whiteAlpha",
  };

  return (
    <>
      <Flex {...mainContainer}>
        <Flex {...utilityContainer}>
          <AddButton />
          <Spacer />
          <Filter />
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
      {isLoading && !firstRander && <LoadingBar />}
    </>
  );
}

export default ManageUsers;
