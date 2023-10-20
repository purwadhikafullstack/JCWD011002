import { Flex, Image } from "@chakra-ui/react";
import DrawerInfoDetail, { setInfoDetail } from "./DrawerInfoDetail";
import getImage from "../../../../api/GetImage";
import {
  FiUser as IcUser,
  FiMail as IcMail,
  FiPhone as IcPhone,
  FiKey as IcRole,
  FiCalendar as IcJoin,
} from "react-icons/fi";
import { PiWarehouse as IcWarehouse } from "react-icons/pi";

const DATE_LOCALE = "en-UK";

function capitalize(x) {
  x = x.split(" ");
  x = x.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
  return x;
}

function showDate(date) {
  date = new Date(date);
  return date.toLocaleDateString(DATE_LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DrawerInfo({ user }) {
  const { warehouse } = user?.admin || {};
  const container = {
    direction: "column",
    gap: "12px",
  };

  const avatarAttr = {
    src: getImage(user?.avatar),
    borderRadius: "8px",
  };
  const nameAttr = setInfoDetail("Name", user?.name, <IcUser />);
  const usernameAttr = setInfoDetail("Username", user?.username, <IcUser />);
  const emailAttr = setInfoDetail("Email", user?.email, <IcMail />);
  const phoneAttr = setInfoDetail("Phone", user?.phone, <IcPhone />);
  const roleAttr = setInfoDetail(
    "Role",
    capitalize(user?.role?.name),
    <IcRole />
  );
  const joinAtAttr = setInfoDetail(
    "Join At",
    showDate(user?.created_at),
    <IcJoin />
  );
  const warehouseAttr = setInfoDetail(
    "Warehouse",
    warehouse?.name,
    <IcWarehouse />
  );

  return (
    <Flex {...container}>
      <Image {...avatarAttr} />
      <DrawerInfoDetail {...nameAttr} />
      <DrawerInfoDetail {...usernameAttr} />
      <DrawerInfoDetail {...emailAttr} />
      <DrawerInfoDetail {...phoneAttr} />
      <DrawerInfoDetail {...roleAttr} />
      <DrawerInfoDetail {...joinAtAttr} />
      {warehouse && <DrawerInfoDetail {...warehouseAttr} />}
    </Flex>
  );
}

export default DrawerInfo;
