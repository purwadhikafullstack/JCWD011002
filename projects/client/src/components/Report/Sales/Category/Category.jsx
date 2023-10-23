import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "../../Pagination";
import FilterBy from "../../FilterBy";
import OrderBy from "./OrderBy";
import toRupiah from "@develoka/angka-rupiah-js";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");
  const [orderBy, setOrderBy] = useState("month_year DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [warehouseId, setWarehouseId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryTotals, setCategoryTotals] = useState({});
  const [wh, setWh] = useState(0);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.data.id_warehouse > 0) {
        setWh(response.data.data.id_warehouse);
      } else {
        setWh(0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchWHAdmin();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/sales/category`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          filterByMonth,
          filterByYear,
          warehouseId,
          categoryId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategory(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [
    filterByMonth,
    filterByYear,
    orderBy,
    currentPage,
    warehouseId,
    categoryId,
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/product/permonth?warehouseId=${wh}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const categoryTotals = extractCategoryTotals(response.data.data);
      setCategoryTotals(categoryTotals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryTotals]);

  const extractCategoryTotals = (data) => {
    const categoryTotals = {};

    data.forEach((monthlyData) => {
      const monthYear = `${monthlyData.year}-${monthlyData.month
        .toString()
        .padStart(2, "0")}`;

      monthlyData.month_sales.forEach((product) => {
        const categoryId = product.id_category;

        if (!categoryTotals[categoryId]) {
          categoryTotals[categoryId] = {};
        }

        if (!categoryTotals[categoryId][monthYear]) {
          categoryTotals[categoryId][monthYear] = {
            total_qty_sold_product: 0,
            total_sales_product: 0,
          };
        }

        categoryTotals[categoryId][monthYear].total_qty_sold_product +=
          product.total_qty_sold_product;
        categoryTotals[categoryId][monthYear].total_sales_product +=
          product.total_sales_product;
      });
    });

    return categoryTotals;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <Flex>
        <FilterBy
          filterByMonth={filterByMonth}
          setFilterByMonth={setFilterByMonth}
          filterByYear={filterByYear}
          setFilterByYear={setFilterByYear}
        />
        <OrderBy
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          warehouseId={warehouseId}
          setWarehouseId={setWarehouseId}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      </Flex>
      <TableContainer mt={4}>
        <Table
          variant="striped"
          bgColor={"bgSecondary"}
          colorScheme="whiteAlpha"
        >
          <Thead bgColor={"primary"}>
            <Tr>
              <Th textAlign="center" color={"white"}>
                CATEGORY ID
              </Th>
              <Th textAlign="center" color={"white"}>
                CATEGORY NAME
              </Th>
              <Th textAlign="center" color={"white"}>
                MONTH
              </Th>
              <Th textAlign="center" color={"white"}>
                YEAR
              </Th>
              <Th textAlign="center" color={"white"}>
                QTY SOLD
              </Th>
              <Th textAlign="center" color={"white"}>
                TOTAL SALES
              </Th>
            </Tr>
          </Thead>
          {category.length === 0 ? (
            <Tbody>
              <Tr>
                <Td colSpan={6} textAlign="center">
                  No Data
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {category.map((sale) => {
                const categoryId = sale.id_category;
                const month = sale.month_year;
                const categoryTotalsData =
                  categoryTotals[categoryId] &&
                  categoryTotals[categoryId][month];

                return (
                  <Tr key={categoryId + month}>
                    <Td textAlign="center">{categoryId}</Td>
                    <Td textAlign="center">{sale.category_name}</Td>
                    <Td textAlign="center">
                      {monthNames[new Date(month).getMonth()]}
                    </Td>
                    <Td textAlign="center">{new Date(month).getFullYear()}</Td>
                    <Td textAlign="center">
                      {categoryTotalsData
                        ? categoryTotalsData.total_qty_sold_product
                        : 0}
                    </Td>
                    <Td textAlign="center">
                      {categoryTotalsData
                        ? toRupiah(categoryTotalsData.total_sales_product, {
                            dot: ".",
                            floatingPoint: 0,
                          })
                        : "0"}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      {category.length >= 10 ? (
        <Pagination
          totalItems={category.length}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Category;
