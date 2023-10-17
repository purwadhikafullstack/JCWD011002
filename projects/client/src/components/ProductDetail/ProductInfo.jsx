import { Flex, GridItem, Text } from "@chakra-ui/react";
import { formaterPrice } from "../../helpers/formater";
import FormAddToCart from "./FormAddToCart";

const container = {
  direction: "column",
  gap: "8px",
};

const titleAttr = {
  fontWeight: "semibold",
  fontSize: "2xl",
};

const categoryAttr = {
  bgColor: "secondary",
  w: "fit-content",
  px: "8px",
  py: "4px",
  borderRadius: "8px",
};

const priceAttr = {
  fontSize: "lg",
  fontWeight: "semibold",
  color: ""
};

function ProductInfo({ product }) {
  return (
    <GridItem>
      <Flex {...container}>
        <Text {...titleAttr}>{product?.name}</Text>
        <Text {...categoryAttr}>{product?.category}</Text>
        <Text {...priceAttr}>Rp {formaterPrice(product?.price)}</Text>
        <Text>{product?.description}</Text>
        <Text>Stock : {product?.stock}</Text>
        <FormAddToCart product={product} />
      </Flex>
    </GridItem>
  );
}

export default ProductInfo;
