import {
  Flex,
  Spacer,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import { useEffect, useState } from "react";
import { getTransactions } from "../../../../../api/transactions";
import Pagination from "../../../../Utility/Pagination";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRole } from "../../../../../helpers/Roles";
import { getAdminWarehouse } from "../../../../../api/admin";
import LoadingBar from "../../../../Utility/LoadingBar";

const date = new Date();

const mainContainer = {
  direction: "column",
  h: "full",
  w: "full",
  gap: "16px",
};

const tableAttr = {
  variant: "striped",
  bgColor: "bgSecondary",
  colorScheme: "whiteAlpha",
};

const tHeadAttr = {
  bgColor: "primary",
};

const thAttr = {
  textAlign: "center",
  color: "textPrimary",
};

function TabPayment({ status, search, params }) {
  const [isLoading, setLoading] = useState(false);
  const [firstRander, setFirstRander] = useState(true);
  const [transactions, setTransaction] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const { searchParams, setSearchParams } = search;
  const {currentSort, currentMonth, currentYear, currentWarehouse, currentSearch, currentInvoice} = params
  const currentPage = searchParams.get("page") || 1;
  const updateStatus = useSelector((state) => state.trigger.orderStatus);
  const dependancies = [
    currentPage,
    currentSort,
    currentMonth,
    currentYear,
    currentSearch,
    currentInvoice,
    currentWarehouse,
    updateStatus,
  ];
  const toast = useToast();

  async function selectWarehouse() {
    if (getRole() === "admin") return currentWarehouse;
    const { data } = await getAdminWarehouse(toast);
    return data?.id_warehouse;
  }

  async function fetchTransactions() {
    const attributes = {
      status,
      page: currentPage,
      limit: 10,
      sort: currentSort,
      month: currentMonth,
      year: currentYear,
      search: currentSearch,
      invoice: currentInvoice,
      warehouse: await selectWarehouse(),
    };
    if (parseInt(attributes?.warehouse) === 0) delete attributes.warehouse;
    setLoading(true);
    const { data } = await getTransactions(toast, attributes);
    const { transactions: transactionList, pages } = data;
    setLoading(false);
    setTransaction(transactionList);
    setMaxPage(pages);
    setFirstRander(false);
  }

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage: setSearchParams,
  };

  useEffect(() => {
    fetchTransactions();
  }, dependancies);

  const headers = ["Invoice", "Date", "User", "Payment", "Total", "Action"];

  const transactionsAttr = {
    transactions,
    status,
  };

  return (
    <>
      <Flex {...mainContainer}>
        <TableContainer>
          <Table {...tableAttr}>
            <Thead {...tHeadAttr}>
              <Tr>
                {headers.map((header, index) => (
                  <Th {...thAttr} key={index}>
                    {header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <TransactionList {...transactionsAttr} />
          </Table>
        </TableContainer>
        <Spacer />
        <Pagination {...paginationAttr} />
      </Flex>
      {isLoading && !firstRander && <LoadingBar />}
    </>
  );
}

export default TabPayment;
