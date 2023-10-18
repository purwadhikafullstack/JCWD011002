import { Button, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { FaFileInvoice as IcInvoice } from "react-icons/fa";
import { MdNavigateNext as IcNext } from "react-icons/md";
import ModalPayment from "./ModalPayment";
import Notification, {
  setToastParams,
} from "../../../../../helpers/Notification";

const container = {
  direction: "row",
  gap: "8px",
  alignItems: "center",
};

function setStatus(status) {
  switch (status) {
    case "Approve":
      return "success";
    case "Reject":
      return "error";
    default:
      return "edit";
  }
}

function HeaderDetail({ payment, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { status } = payment;
  const titleAttr = {};

  function noPayment() {
    Notification(toast, {
      title: "Receipt haven't been uploaded",
      status: 500,
    });
  }

  const statusAttr = {
    children: status?.name,
    rightIcon: <IcNext fontSize={"12px"} />,
    variant: setStatus(status?.name),
    borderRadius: "4px",
    py: "6px",
    px: "12px",
    h: "fit-content",
    fontSize: "12px",
    fontWeight: "semibold",
    textTransform: "Uppercase",
    onClick: payment?.receipt ? onOpen : noPayment,
  };
  const paymentAttr = {
    payment,
    isOpen,
    onClose,
  };
  return (
    <Flex {...container}>
      <IcInvoice />
      <Text {...titleAttr}>MWEGC2/ID/TXN{id}</Text>
      <Button {...statusAttr} />
      <ModalPayment {...paymentAttr} />
    </Flex>
  );
}

export default HeaderDetail;
