import { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import { Flex, Grid, GridItem, Image, useToast } from "@chakra-ui/react";
import getImage from "../api/GetImage";
import ProductInfo from "../components/ProductDetail/ProductInfo";

const mainContainer = {
  w: "full",
};

function ProductDetail() {
  const [product, setProduct] = useState();
  const toast = useToast();

  function getId() {
    const url = window.location.href.split("/");
    return url.pop();
  }

  function isReady() {
    return product?.is_active && parseInt(product?.stock) > 0;
  }

  async function fetchProduct() {
    const { data } = await getProduct(toast, getId());
    setProduct(data);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const container = {
    templateColumns: {
      base: "repeat(1, minmax(250, 1fr))",
      md: "repeat(2, minmax(250px, 1fr))",
    },
    w: "full",
    py: "16px",
    px: {
      base: "32px",
      md: "64px",
      lg: "256px",
    },
    gap: "16px",
  };

  const imageAttr = {
    h: "300px",
    pos: "relative",
    bgImage: getImage(product?.image),
    bgPos: "center",
    borderRadius: "8px",
    overflow: "hidden",
    bgSize: "contain",
    bgColor: "bgSecondary",
    bgRepeat: "no-repeat",
  };

  const backdrop = {
    w: "full",
    h: "full",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: `grayscale(${isReady() ? 0 : 0.8})`,
  };

  const soldOutAttr = {
    h: "full",
    src: "/images/out-of-stock.png",
    objectFit: "cover",
    p: "16px",
    display: !isReady() ? "block" : "none",
  };

  return (
    <Flex {...mainContainer}>
      <Grid {...container}>
        <GridItem {...imageAttr}>
          <Flex {...backdrop}>
            <Image {...soldOutAttr} />
          </Flex>
        </GridItem>
        <ProductInfo product={product} />
      </Grid>
    </Flex>
  );
}

export default ProductDetail;
