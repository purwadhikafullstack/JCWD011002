import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TabPayment from "./TabPayment";
import Filter from "./Filter";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const date = new Date();

const mainContainer = {
  w: "full",
  direction: "column",
  pos: "relative",
  gap: "16px",
};

const container = {
  w: "full",
  h: "full",
  variant: "enclosed",
  isFitted: true,
  isLazy: true,
};

function ManageOrder() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [firstRander, setFirstRander] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "DESC";
  const currentMonth = searchParams.get("month") || date.getMonth();
  const currentYear = searchParams.get("year") || date.getFullYear();
  const currentWarehouse = searchParams.get("warehouse") || "0";
  const currentSearch = useSelector((state) => state.search.orders) || "";
  const search = { searchParams, setSearchParams, resetPage };
  const params = {
    currentSort,
    currentMonth,
    currentYear,
    currentWarehouse,
    currentSearch,
  };
  const dependancies = [
    selectedTab,
    currentSort,
    currentMonth,
    currentYear,
    currentSearch,
    currentWarehouse,
  ];

  function resetPage() {
    setSearchParams((prev) => {
      if (!firstRander) {
        prev.set("page", 1);
        return prev;
      }
    });
  }

  useEffect(() => {
    resetPage();
    setFirstRander(false);
  }, dependancies);

  const tabList = [
    ["To Pay", <TabPayment status={1} search={search} params={params} />],
    ["To Confirm", <TabPayment status={2} search={search} params={params} />],
    ["Processed", <TabPayment status={3} search={search} params={params} />],
    ["Sent", <TabPayment status={4} search={search} params={params} />],
    ["Finished", <TabPayment status={5} search={search} params={params} />],
    ["Canceled", <TabPayment status={6} search={search} params={params} />],
  ];
  return (
    <Flex {...mainContainer}>
      <Filter />
      <Tabs {...container}>
        <TabList>
          {tabList.map((tab, index) => (
            <Tab
              whiteSpace="nowrap"
              key={index}
              onClick={() => setSelectedTab(index)}
            >
              {tab[0]}
            </Tab>
          ))}
        </TabList>
        <TabPanels h="calc(100% - 40px)">
          {tabList.map((tab, index) => (
            <TabPanel h="full" key={index}>
              {tab[1]}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default ManageOrder;
