import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import { getTransaction } from "../../../../../api/transactions";
import { useEffect, useState } from "react";
import TransactionDetail from "./TransactionDetail";
import HeaderDetail from "./HeaderDetail";
import FooterButtons from "./FooterButtons";

const drawerContentAttr = {
  bgColor: "secondary",
  color: "textPrimary",
};
const drawerHeaderAttr = {
  borderBottomWidth: "1px",
};
const drawerFooterAttr = {
  borderTopWidth: "1px",
  gap: "8px",
};

const btnContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function isFooter(status) {
  const noFooter = [1, 4, 5, 6];
  return !noFooter.includes(status);
}

function DrawerTransaction({
  status,
  transaction,
  shipping,
  total,
  isOpen,
  onClose,
}) {
  const { transaction_payments: payment, user } = transaction;
  const [products, setProducts] = useState([]);
  const toast = useToast();

  const drawerAttr = {
    isOpen,
    onClose,
    placement: "right",
    size: "lg",
  };

  async function fetchTransactionProduct() {
    const { data } = await getTransaction(toast, transaction?.id);
    setProducts(data?.transaction_products);
  }

  useEffect(() => {
    fetchTransactionProduct();
  }, []);

  const headerAttr = {
    id: transaction?.id || 0,
    payment: payment[0],
  };

  const transactionDetail = {
    payment: payment[0],
    products,
    shipping,
    total,
  };

  const footerButtons = {
    status,
    id_user: user?.id,
    id_transaction: transaction?.id,
  };

  return (
    <Drawer {...drawerAttr}>
      <DrawerOverlay />
      <DrawerContent {...drawerContentAttr}>
        <DrawerHeader {...drawerHeaderAttr}>
          <HeaderDetail {...headerAttr} />
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody py="20px">
          <TransactionDetail {...transactionDetail} />
        </DrawerBody>
        {isFooter(status) && <FooterButtons {...footerButtons} />}
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerTransaction;
