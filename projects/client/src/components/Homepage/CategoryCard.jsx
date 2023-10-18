import { Flex, GridItem, Text } from "@chakra-ui/react";
import getImage from "../../api/GetImage";
const backdrop = {
  w: "full",
  h: "full",
  alignItems: "center",
  justifyContent: "center",
  bgColor: "#00000066",
  backdropFilter: "blur(2px)",
};

const tittleAttr = {
  fontSize: "2xl",
  fontWeight: "semibold",
};

function CategoryCard({ category, selected = false, onClick }) {
  const mainContainer = {
    onClick,
    bgColor: "primary",
    bgImage:
      `${getImage(category?.image)}`,
    bgPos: "center",
    bgSize: "cover",
    w: "full",
    h: "120px",
    cursor: "pointer",
    borderRadius: "8px",
    overflow: "hidden",
    border: !selected ? "none" : "3px solid",
    borderColor: "textPrimary",
    filter: `grayscale(${selected ? 0 : 0.8})`,
    _hover: {
      border: "3px solid",
      borderColor: "successSecondary",
      filter: "none",
    },
  };

  return (
    <GridItem {...mainContainer}>
      <Flex {...backdrop}>
        <Text {...tittleAttr}>{category?.name}</Text>
      </Flex>
    </GridItem>
  );
}

export default CategoryCard;
