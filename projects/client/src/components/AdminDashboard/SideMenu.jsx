import { Flex, Text } from "@chakra-ui/react";
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
const logoAttr = {
  variant: "title",
};
const menuAttr = {
  direction: "column",
  gap: "8px",
  w: "full",
};

function SideMenu({ selected, setSelected, menuList }) {
  const role = getRole();
  return (
    <Flex {...containerAttr}>
      <Text {...logoAttr}>LOGO</Text>
      <Flex {...menuAttr}>
        {menuList.map((menu, index) => (
          <CardAdminMenu
            {...menu}
            display={menu["access"].includes(role) ? "grid" : "none"}
            selected={index === selected ? true : false}
            setSelected={() => setSelected(index)}
            key={index}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default SideMenu;
