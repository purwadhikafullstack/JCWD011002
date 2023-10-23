import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import SalesCard from "./SalesCard";
import jwt_decode from "jwt-decode";

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

const Charts = () => {
  const role = jwt_decode(localStorage.getItem("token")).role;
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const yearNow = new Date().getFullYear();
  const [whName, setWhName] = useState("");
  const [wh, setWh] = useState(0);

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWh(response.data.data.id_warehouse);
      setWhName(response.data.data.warehouse_name);
    } catch (error) {}
  };

  useEffect(() => {
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

  // per warehouse
  const fetchDataWarehouse = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/product/permonth?warehouseId=${wh}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // all warehouse
  const fetchDataMonthly = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/product/permonth`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      data.sort((a, b) => a.month - b.month);
      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      // const labels = data.map((item) => `${item.month} ${item.year}`);
      const labels = data.map(
        (item) => `${monthNames[item.month - 1]} ${item.year}`
      );

      const totalSales = data.map((item) => parseInt(item.total_sales_monthly));
      const newChart = new Chart(ctx, {
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
      chartRef.current.chart = newChart;
    }
  }, [data]);

  return (
    <>
      <Box mb={2} w={"80vw"} borderRadius={"10px"}>
        <Flex>
          {role === "admin warehouse" ? (
            <Text
              fontWeight={"bold"}
              px={6}
              py={3}
              bg={"#393939"}
              color={"white"}
            >
              {whName}
            </Text>
          ) : (
            <></>
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
