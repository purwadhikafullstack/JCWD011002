import { Button, Td, Tr, useDisclosure } from "@chakra-ui/react";
import { formaterPrice, formaterDate } from "../../../../../helpers/formater";
import DrawerTransaction from "../DrawerTransaction";

const tdAttr = {
  textAlign: "center",
};

function TransactionData({ transaction, status }) {
  const { user, transaction_payments, shipping_cost, shipping_method, total } =
    transaction;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shipping = { cost: shipping_cost, method: shipping_method };

  const drawerTransactionAttr = {
    status,
    transaction,
    shipping,
    total,
    isOpen,
    onClose,
  };

  const btnDetail = {
    onClick: onOpen,
    variant: "edit",
    children: "Detail",
  };

  return (
    <>
      <Tr>
        <Td {...tdAttr}>MWEGC2/ID/TXN{transaction?.id}</Td>
        <Td {...tdAttr}>{formaterDate(transaction?.created_at)}</Td>
        <Td {...tdAttr}>{user?.username}</Td>
        <Td {...tdAttr}>{transaction_payments[0]?.status?.name}</Td>
        <Td {...tdAttr}>Rp {formaterPrice(total)}</Td>
        <Td {...tdAttr}>
          <Button {...btnDetail} />
        </Td>
      </Tr>
      <DrawerTransaction {...drawerTransactionAttr} />
    </>
  );
}

export default TransactionData;
