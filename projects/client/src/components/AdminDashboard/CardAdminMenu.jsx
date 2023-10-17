import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";

const logoAttr = {
  justifyContent: "center",
};

function CardAdminMenu({ name, logo, selected = false, setSelected, display }) {
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
  function handleClick() {
    setSelected();
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
