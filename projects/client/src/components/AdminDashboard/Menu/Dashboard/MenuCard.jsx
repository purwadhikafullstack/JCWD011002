import { Flex, GridItem, Icon, Text } from "@chakra-ui/react";

function MenuCard({ icon, name, path }) {
  function onClick() {
    document.location.href = path;
  }
  const container = {
    h: "full",
    bgColor: "secondary",
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: ".3s",
    onClick,
    _hover: {
      bgColor: "primary",
    },
  };
  const iconAttr = {
    as: icon,
    fontSize: {
      base: "48px",
      md: "56px",
      xl: "72px",
    },
  };
  const titleAttr = {
    children: name,
    textTransform: "capitalize",
    fontWeight: "semibold",
    fontSize: {
      base: "16px",
      lg: "20px",
      xl: "24px",
    },
  };
  return (
    <GridItem>
      <Flex {...container}>
        <Icon {...iconAttr} />
        <Text {...titleAttr} />
      </Flex>
    </GridItem>
  );
}

export default MenuCard;
