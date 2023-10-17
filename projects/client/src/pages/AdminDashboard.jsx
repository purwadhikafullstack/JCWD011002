import { Flex, Text } from "@chakra-ui/react";
import SideMenu from "../components/AdminDashboard/SideMenu";
import { useState } from "react";
import {
  BiHomeAlt2 as IcHome,
  BiGitPullRequest as IcMutation,
  BiCartAlt as IcOrder,
} from "react-icons/bi";
import {
  PiWarehouse as IcWarehouse,
  PiBagSimple as IcProduct,
} from "react-icons/pi";
import { TbCategory as IcCategory, TbUsers as IcUser } from "react-icons/tb";
import { SlGraph as IcReport } from "react-icons/sl";
import Dashboard from "../components/AdminDashboard/Menu/Dashboard";
import ManageUsers from "../components/AdminDashboard/Menu/ManageUser";
import Report from "../pages/Report";

const ACCESS_ADMIN = ["admin"];
const ACCESS_ALL_ADMIN = ["admin", "admin warehouse"];

const container = {
  w: "full",
  p: "12px",
  gap: "12px",
  bgColor: "bgPrimary",
  warp: "wrap",
};
const contentContainer = {
  flexGrow: 1,
};

function createMenuSet(name, logo, access, page) {
  return { name, logo, access, page };
}

function dummyPage(name) {
  return <Text>{name}</Text>;
}

const menuList = [
  createMenuSet("Dashboard", <IcHome />, ACCESS_ALL_ADMIN, <Dashboard />),
  createMenuSet("Users", <IcUser />, ACCESS_ADMIN, <ManageUsers />),
  createMenuSet(
    "Warehouses",
    <IcWarehouse />,
    ACCESS_ADMIN,
    dummyPage("Manage Warehouses")
  ),
  createMenuSet(
    "Categories",
    <IcCategory />,
    ACCESS_ADMIN,
    dummyPage("Manage Categories")
  ),
  createMenuSet(
    "Products",
    <IcProduct />,
    ACCESS_ADMIN,
    dummyPage("Manage Products")
  ),
  createMenuSet(
    "Mutations",
    <IcMutation />,
    ACCESS_ALL_ADMIN,
    dummyPage("Manage Mutation")
  ),
  createMenuSet("Orders", <IcOrder />, ACCESS_ADMIN, dummyPage("Manage Order")),
  createMenuSet("Reports", <IcReport />, ACCESS_ALL_ADMIN, <Report />),
];

function AdminDashboard() {
  const [selected, setSelected] = useState(0);
  const sideMenuAttr = {
    selected,
    setSelected,
    menuList,
  };
  return (
    <Flex {...container}>
      <SideMenu {...sideMenuAttr} />
      <Flex {...contentContainer}>{menuList[selected]["page"]}</Flex>
    </Flex>
  );
}

/*
MENU
  - Dashboard
  - Manage User
  - Manage Warehouse
  - Manage Category
  - Manage Product
  - Manage Mutation
  - Manage Order
    - approve and make request
  - Report
*/

export default AdminDashboard;
