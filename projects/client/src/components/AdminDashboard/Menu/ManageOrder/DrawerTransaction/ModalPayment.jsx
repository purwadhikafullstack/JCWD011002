import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import getImage from "../../../../../api/GetImage";

function ModalPayment({ payment, isOpen, onClose }) {
  const contentAttr = {
    borderRadius: "12px",
  };
  const bodyAttr = {
    p: 0,
    borderRadius: "8px",
    overflow: "hidden",
  };
  const closeButton = {
    color: "textSecondary",
  };
  const modalAttr = {
    isOpen,
    onClose,
  };
  const container = {
    pos: "relative",
  };
  const imgAttr = {
    src: getImage(payment?.receipt),
  };
  const paymentMethodAttr = {
    children: payment?.payment_method?.name,
    borderRadius: "8px",
    noOfLines: 1,
    bgColor: "bgPrimary",
    opacity: "0.8",
    w: "fit-content",
    p: "4px 8px",
    fontSize: "sm",
    fontWeight: "semibold",
    color: "textPrimary",
    border: "1px solid",
    borderColor: "textSecondary",
    pos: "absolute",
    left: "8px",
    top: "8px",
  };
  return (
    <Modal {...modalAttr}>
      <ModalOverlay />
      <ModalContent {...contentAttr}>
        <ModalBody {...bodyAttr}>
          <Flex {...container}>
            <ModalCloseButton {...closeButton} />
            <Image {...imgAttr} />
            <Text {...paymentMethodAttr} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalPayment;
