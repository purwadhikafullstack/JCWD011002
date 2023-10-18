import { Flex } from "@chakra-ui/react";
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
import { Outlet } from "react-router-dom";

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

function createMenuSet(name, logo, access, url) {
  return { name, logo, access, url };
}


const menuList = [
  createMenuSet("Dashboard", <IcHome />, ACCESS_ALL_ADMIN, ""),
  createMenuSet("Users", <IcUser />, ACCESS_ADMIN, "/user"),
  createMenuSet("Warehouses", <IcWarehouse />, ACCESS_ADMIN, "/warehouse"),
  createMenuSet("Categories", <IcCategory />, ACCESS_ALL_ADMIN, "/category"),
  createMenuSet("Products", <IcProduct />, ACCESS_ALL_ADMIN, "/product"),
  createMenuSet("Mutations", <IcMutation />, ACCESS_ALL_ADMIN, "/stockmutation"),
  createMenuSet("Orders", <IcOrder />, ACCESS_ALL_ADMIN, "/order"),
  createMenuSet("Reports", <IcReport />, ACCESS_ALL_ADMIN, "/report"),
];

function AdminDashboard() {
  const [selected, setSelected] = useState(0);
  const sideMenuAttr = {
    selected,
    setSelected,
    menuList,
  };
  return (
    <>
      <Flex {...container}>
        <SideMenu {...sideMenuAttr} />
        <Flex {...contentContainer}>{menuList[selected]["page"]}</Flex>
        <Outlet />
      </Flex>
    </>
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
