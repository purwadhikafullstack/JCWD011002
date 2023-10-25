import { Flex, Image, Text } from "@chakra-ui/react";
import CardAdminMenu from "./CardAdminMenu";
import { getRole } from "../../helpers/Roles";

const containerAttr = {
  direction: "column",
  gap: "32px",
  basis: { sm: "200px", md: "256px", lg: "320px" },
  shrink: 0,
  px: "8px",
  pt: "16px",
  pb: "8px",
  bgColor: "bgSecondary",
  borderRadius: "8px",
  alignItems: "center",
};
const iconAttr = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};
const logoImg = {
  src: "/logo.png",
  w: "128px",
};
const logoAttr = {
  variant: "title",
};
const menuAttr = {
  direction: "column",
  gap: "8px",
  w: "full",
};

function isSelected(menu) {
  const currentPath = document.location.pathname.replace("/", "");
  if (currentPath === "" && menu === "dashboard") return true;
  return menu === currentPath;
}

function SideMenu({ setSelected, menuList }) {
  const role = getRole();
  return (
    <Flex {...containerAttr}>
      <Flex {...iconAttr}>
        <Image {...logoImg} />
        <Text {...logoAttr}>NetComp</Text>
      </Flex>
      <Flex {...menuAttr}>
        {menuList.map((menu, index) => (
          <CardAdminMenu
            {...menu}
            display={menu["access"].includes(role) ? "grid" : "none"}
            selected={isSelected(menu.name)}
            setSelected={() => setSelected(index)}
            key={index}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default SideMenu;
