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
  createMenuSet("dashboard", <IcHome />, ACCESS_ALL_ADMIN, ""),
  createMenuSet("users", <IcUser />, ACCESS_ADMIN, "/users"),
  createMenuSet("warehouses", <IcWarehouse />, ACCESS_ADMIN, "/warehouses"),
  createMenuSet("categories", <IcCategory />, ACCESS_ALL_ADMIN, "/categories"),
  createMenuSet("products", <IcProduct />, ACCESS_ALL_ADMIN, "/products"),
  createMenuSet("mutations", <IcMutation />, ACCESS_ALL_ADMIN, "/mutations"),
  createMenuSet("orders", <IcOrder />, ACCESS_ALL_ADMIN, "/orders"),
  createMenuSet("reports", <IcReport />, ACCESS_ALL_ADMIN, "/reports"),
];

function AdminDashboard() {
  const [selected, setSelected] = useState(0);
  const sideMenuAttr = {
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

export default AdminDashboard;
