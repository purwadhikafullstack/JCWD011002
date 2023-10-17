import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import SalesCard from "./SalesCard";
import jwt_decode from "jwt-decode";

const Charts = () => {
  const role = jwt_decode(localStorage.getItem("token")).role;
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const yearNow = new Date().getFullYear();
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [whName, setWhName] = useState("");
  const [wh, setWh] = useState(null);

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWh(response.data.data.id_warehouse);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchWarehouse = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/warehouse`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setDataWarehouse(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fetchWarehouse();
    fetchWHAdmin();
    fetchData();
  }, [wh]);

  const fetchData = async () => {
    if (role === "admin warehouse") {
      await fetchDataWarehouse();
    } else {
      await fetchDataMonthly();
    }
  };

  const fetchDataWarehouse = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/warehouse/${wh}`
      );
      setData(response.data.warehouse_sales);
      setWhName(response.data.warehouseName);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMonthly = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/sales/monthly`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const labels = data.map((item) => `${item.month} ${item.year}`);
      const totalSales = data.map((item) =>
        parseInt(item.total_sales_per_month)
      );

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${yearNow} Sales`,
              data: totalSales,
              backgroundColor: "#34638A",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "white",
              },
            },
            x: {
              ticks: {
                color: "white",
              },
            },
          },
          plugins: {
            datalabels: {
              color: "#ffffff",
              anchor: "end",
              align: "end",
              offset: -5,
              font: {
                weight: "bold",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <>
      <Box mb={2} w={"80vw"} borderRadius={"10px"}>
        <Flex>
          {role === "admin warehouse" ? (
            <Text p={3} bg={"#393939"} color={"white"}>
              {whName}
            </Text>
          ) : (
            <></>
            // <Select
            //   bg={"#393939"}
            //   color={"white"}
            //   border={"none"}
            //   borderBottomRadius={0}
            //   w={"12vw"}
            //   placeholder="Select Warehouse"
            // >
            //   {dataWarehouse.map((warehouse) => (
            //     <option
            //       style={{ color: "black" }}
            //       key={warehouse.id}
            //       value={warehouse.id}
            //     >
            //       {warehouse.name}
            //     </option>
            //   ))}
            // </Select>
          )}
        </Flex>
        <canvas
          style={{ backgroundColor: "#393939", padding: "20px" }}
          ref={chartRef}
          width={"full"}
          height={100}
        ></canvas>
      </Box>
      {role === "admin" ? <SalesCard /> : <></>}
    </>
  );
};

export default Charts;
