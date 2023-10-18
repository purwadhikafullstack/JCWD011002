import { DrawerFooter, Flex } from "@chakra-ui/react";
import FooterButton from "./FooterButton";

function FooterButtons({ status, id_user, id_transaction }) {
  const buttons = { status, id_user, id_transaction };
  const footer = {
    borderTopWidth: "1px",
    gap: "8px",
  };
  const container = {
    direction: "column",
    w: "full",
    gap: "8px",
    children: <FooterButton {...buttons}/>,
  };
  return (
    <DrawerFooter {...footer}>
      <Flex {...container} />
    </DrawerFooter>
  );
}

export default FooterButtons;
