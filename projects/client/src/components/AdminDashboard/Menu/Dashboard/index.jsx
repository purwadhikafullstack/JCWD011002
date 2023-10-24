import { Flex } from "@chakra-ui/react";
import MenuList from "./MenuList";

const container = {
  w: "full",
  direction: "column",
  pos: "relative",
  gap: "16px",
};

function Dashboard() {
  return (
    <Flex {...container}>
      <MenuList />
    </Flex>
  );
}

export default Dashboard;
