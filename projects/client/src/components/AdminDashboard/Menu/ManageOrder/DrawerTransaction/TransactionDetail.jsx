import { Divider, Flex, Img, Spacer, Text } from "@chakra-ui/react";
import getImage from "../../../../../api/GetImage";
import TransactionProducts from "./TransactionProducts";
import { formaterPrice } from "../../../../../helpers/formater";
import { LiaShippingFastSolid as IcShipping } from "react-icons/lia";

const container = {
  direction: "column",
  gap: "12px",
  minH: "full",
};

function TransactionDetail({ products, payment, shipping, total }) {
  const totalSummary = {
    fontSize: "xl",
    fontWeight: "bold",
  };
  const shippingText = {
    fontSize: "xl",
    alignItems: "flex-end",
    fontWeight: "bold",
    gap: "8px",
  };
  const shippingDetailContainer = {
    gap: "4px",
    direction: "column",
    fontSize: "md",
    fontWeight: "semibold",
  };
  const shippingTitle = {
    gap: "8px",
    alignItems: "center",
  };
  return (
    <Flex {...container}>
      {products.map((product, index) => (
        <TransactionProducts product={product} key={index} />
      ))}
      <Spacer />
      <Divider />
      <Flex {...shippingText}>
        <Flex {...shippingDetailContainer}>
          <Flex {...shippingTitle}>
            <Text>Shipping</Text>
            <IcShipping fontSize={"24px"} />
          </Flex>
          <Text>{shipping?.method}</Text>
        </Flex>
        <Spacer />
        <Text>Rp {formaterPrice(shipping?.cost)}</Text>
      </Flex>
      <Flex {...totalSummary}>
        <Text>Total</Text>
        <Spacer />
        <Text>Rp {formaterPrice(total)}</Text>
      </Flex>
    </Flex>
  );
}

export default TransactionDetail;
