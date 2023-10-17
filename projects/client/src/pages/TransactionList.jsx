import React, { useState } from "react";
import {
  Box,
  TabList,
  TabPanel,
  Tab,
  Tabs,
  TabPanels,
} from "@chakra-ui/react";
import Pagination from "../components/Transaction/Pagination";
import ToPay from "../components/Transaction/Status/ToPay";
import ToConfirm from "../components/Transaction/Status/ToConfirm";
import Processed from "../components/Transaction/Status/Processed";
import Shipped from "../components/Transaction/Status/Shipped";
import Completed from "../components/Transaction/Status/Completed";
import Cancelled from "../components/Transaction/Status/Cancelled";
import AllStatus from "../components/Transaction/Status/AllStatus";
import StatusNavigation from "../components/Transaction/StatusNavigation";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const TransactionList = () => {
  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");

  const tab = {
    fontSize: isMd ? "sm" : "md",
  };
  const tabPanel = {
    w: isMd ? "107vw" : "",
  };

  return (
    <>
      {isMd ? (
        <StatusNavigation />
      ) : (
        <>
          <Tabs
            colorScheme="white"
            isLazy
            w={isMd ? "100vw" : "70vw"}
            isFitted
            variant="enclosed"
          >
            <TabList color={"white"} h={"3em"} mb="1em">
              <Tab {...tab}>All Status</Tab>
              <Tab {...tab}>To Pay</Tab>
              <Tab {...tab}>To Confirm</Tab>
              <Tab {...tab}>Processed</Tab>
              <Tab {...tab}>Shipped</Tab>
              <Tab {...tab}>Completed</Tab>
              <Tab {...tab}>Cancelled</Tab>
            </TabList>
            <TabPanels
              justifyContent={"center"}
              display={"flex"}
              alignItems={"center"}
            >
              <TabPanel {...tabPanel}>
                <AllStatus />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <ToPay />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <ToConfirm />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Processed />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Shipped />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Completed />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Cancelled />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <Pagination /> */}
        </>
      )}
    </>
  );
};

export default TransactionList;