import {
  Flex,
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

const date = new Date();

const mainContainer = {
  direction: "column",
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

function TabPayment({ status }) {
  const [transactions, setTransaction] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    month: date.getMonth(),
    year: date.getFullYear(),
    sort: "DESC",
    k_order: "",
    warehouse: 0,
  });
  const currentPage = searchParams.get("page");
  const currentSort = searchParams.get("sort");
  const currentMonth = searchParams.get("month");
  const currentYear = searchParams.get("year");
  const currentWarehouse = searchParams.get("warehouse");
  const currentSearch = useSelector((state) => state.search.orders);
  const dependancies = [currentSort, currentMonth, currentYear, currentSearch, currentWarehouse];

  async function fetchTransactions() {
    const attributes = {
      status,
      page: currentPage, // current page
      limit: 10, // limit
      sort: currentSort,
      month: currentMonth,
      year: currentYear,
      search: currentSearch,
      warehouse: currentWarehouse,
    };
    if (parseInt(currentWarehouse) === 0) delete attributes.warehouse;
    const { data } = await getTransactions(toast, attributes);
    const { transactions: transactionList, pages } = data;
    setTransaction(transactionList);
    setMaxPage(pages);
  }

  function resetPage() {
    setSearchParams((prev) => {
      prev.set("page", 1);
      return prev;
    });
  }

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage: setSearchParams,
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, ...dependancies]);

  useEffect(() => {
    resetPage();
  }, dependancies);

  const headers = [
    "Invoice",
    "Date",
    "User",
    "Payment",
    "Total",
    "Action",
  ];

  const transactionsAttr = {
    transactions,
    status,
  };

  return (
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
      <Pagination {...paginationAttr} />
    </Flex>
  );
}

export default TabPayment;