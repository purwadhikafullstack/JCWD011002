import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Summary from "./Summary/Summary";
import Detail from "./Detail/Detail";

const Stock = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      <Tabs
        defaultIndex={1}
        isLazy
        index={tabIndex}
        onChange={handleTabsChange}
        colorScheme="white"
        variant="enclosed"
      >
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Summary />
          </TabPanel>
          <TabPanel>
            <Detail />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Stock;
