import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Divider,
} from "@chakra-ui/react";
import Product from "./Product/Product";
import Category from "./Category/Category";
import Chart from "./Chart";
const Sales = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      <Chart />
      <Divider mt={4} mb={4} />
      <Tabs
        defaultIndex={1}
        isLazy
        index={tabIndex}
        onChange={handleTabsChange}
        colorScheme="white"
        variant="enclosed"
      >
        <TabList>
          <Tab>Product Sales</Tab>
          <Tab>Category Sales</Tab>
        </TabList>
        <TabPanels color={"white"}>
          <TabPanel>
            <Product />
          </TabPanel>
          <TabPanel>
            <Category />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Sales;
