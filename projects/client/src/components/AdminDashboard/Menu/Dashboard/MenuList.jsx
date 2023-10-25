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
import MenuCard from "./MenuCard";
import { Grid } from "@chakra-ui/react";
import { getRole } from "../../../../helpers/Roles";

function createMenu(icon, name) {
  return { icon, name, path: `/${name}` };
}

let menus = [
  createMenu(IcUser, "users"),
  createMenu(IcWarehouse, "warehouses"),
  createMenu(IcCategory, "categories"),
  createMenu(IcProduct, "products"),
  createMenu(IcMutation, "mutations"),
  createMenu(IcOrder, "orders"),
  createMenu(IcReport, "reports"),
];


function MenuList() {
  const role = getRole();
  const menuList = role === "admin" ? menus : menus.slice(2);
  const container = {
    h: "full",
    templateRows: "repeat(2, 1fr)",
    autoFlow: "column",
    gap: "16px",
  };
  return (
    <Grid {...container}>
      {menuList.map((menu, index) => (
        <MenuCard {...menu} key={index} />
      ))}
    </Grid>
  );
}

export default MenuList;
