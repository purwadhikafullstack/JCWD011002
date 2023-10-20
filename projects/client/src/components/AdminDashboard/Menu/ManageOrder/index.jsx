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
  const tabList = [
    ["To Pay", <TabPayment status={1} />],
    ["To Confirm", <TabPayment status={2} />],
    ["Processed", <TabPayment status={3} />],
    ["Sent", <TabPayment status={4} />],
    ["Finished", <TabPayment status={5} />],
    ["Canceled", <TabPayment status={6} />],
  ];
  return (
    <Flex {...mainContainer}>
      <Filter />
      <Tabs {...container}>
        <TabList>
          {tabList.map((tab, index) => (
            <Tab whiteSpace="nowrap" key={index}>{tab[0]}</Tab>
          ))}
        </TabList>
        <TabPanels h="calc(100% - 40px)" >
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
