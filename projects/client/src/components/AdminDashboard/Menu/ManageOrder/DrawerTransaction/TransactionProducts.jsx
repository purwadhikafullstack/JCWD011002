import { Flex, Img, Spacer, Text, useToast } from "@chakra-ui/react";
import getImage from "../../../../../api/GetImage";
import { formaterPrice } from "../../../../../helpers/formater";
import { useEffect, useState } from "react";
import { getWarehouses } from "../../../../../api/warehouse";

const container = {
  direction: "row",
  gap: "12px",
  alignItems: "center",
};

function TransactionProducts({ product }) {
  const [warehouses, setWarehouses] = useState([]);
  const { name, price, qty, image, warehouse } = product;
  const toast = useToast();

  async function fetchWarehouse() {
    const { data } = await getWarehouses(toast);
    setWarehouses(data);
  }

  useEffect(() => {
    fetchWarehouse();
  }, []);

  function getWarehouse() {
    return warehouses.filter((item) => item?.id === warehouse)[0]?.name;
  }

  const qtyAttr = {
    children: `${qty} x`,
    fontSize: "xl",
    fontWeight: "bold",
  };
  const imgAttr = {
    src: getImage(image),
    h: "80px",
  };

  const textContainer = {
    direction: "column",
  };
  const nameAttr = {
    children: name,
    fontSize: "xl",
    fontWeight: "semibold",
  };
  const priceAttr = {
    children: `@Rp ${formaterPrice(price)}`,
  };
  const warehouseAttr = {
    children: `${getWarehouse()}`,
  };
  const totalAttr = {
    children: `Rp ${formaterPrice(price * qty)}`,
    fontSize: "xl",
    fontWeight: "bold",
  };
  return (
    <Flex {...container}>
      <Text {...qtyAttr} />
      <Img {...imgAttr} />
      <Flex {...textContainer}>
        <Text {...nameAttr} />
        <Text {...priceAttr} />
        <Text {...warehouseAttr} />
      </Flex>
      <Spacer />
      <Text {...totalAttr} />
    </Flex>
  );
}

export default TransactionProducts;
