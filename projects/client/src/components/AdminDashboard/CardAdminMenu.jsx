import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const logoAttr = {
  justifyContent: "center",
};

// function CardAdminMenu({ name, logo, selected = false, setSelected, url }) {
function CardAdminMenu({ name, logo, selected = false, setSelected, display, url }) {
  const container = {
    display,
    templateColumns: "1fr 3fr",
    alignItems: "center",
    gap: "8px",
    p: "8px",
    bgColor: selected ? "primary" : "none",
    borderRadius: "8px",
    cursor: "pointer",
    _hover: {
      bgColor: selected ? "primary" : "secondary",
    },
  };
  const navigate = useNavigate();
  function handleClick() {
    setSelected();
    navigate(url);
  }

  return (
    <Grid {...container} onClick={handleClick}>
      <GridItem>
        <Flex {...logoAttr}>{logo}</Flex>
      </GridItem>
      <GridItem>
        <Text>{name}</Text>
      </GridItem>
    </Grid>
  );
}

export default CardAdminMenu;
