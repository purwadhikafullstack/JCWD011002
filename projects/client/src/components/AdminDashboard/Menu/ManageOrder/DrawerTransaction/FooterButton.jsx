import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import PopoverConfirmation from "../../../../Utility/PopoverConfirmation";
import {
  cancelOrder,
  updateOrderStatus,
} from "../../../../../api/transactions";
import { useDispatch } from "react-redux";
import { setOrderTrigger } from "../../../../../storage/TriggerReducer";

function FooterButton({ status, id_user, id_transaction }) {
  const {
    isOpen: firstIsOpen,
    onOpen: firstOnOpen,
    onClose: firstOnClose,
  } = useDisclosure();
  const {
    isOpen: secondIsOpen,
    onOpen: secondOnOpen,
    onClose: secondOnClose,
  } = useDisclosure();
  const {
    isOpen: cancelIsOpen,
    onOpen: cancelOnOpen,
    onClose: cancelOnClose,
  } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  async function handleUpadateStatus(newStatus) {
    await updateOrderStatus(toast, id_transaction, newStatus);
    dispatch(setOrderTrigger());
  }

  async function handleCancelStatus() {
    await cancelOrder(toast, {
      userId: id_user,
      transactionId: id_transaction,
    });
    dispatch(setOrderTrigger());
  }

  const btnCancel = {
    children: "Cancel",
    variant: "error",
    onClick: cancelOnOpen,
  };
  const btnPaymentConfirm = {
    children: "Confirm Payment",
    variant: "success",
    onClick: firstOnOpen,
  };
  const btnPaymentReject = {
    children: "Reject Payment",
    variant: "error",
    onClick: secondOnOpen,
  };
  const btnSent = {
    children: "Send",
    variant: "success",
    onClick: firstOnOpen,
  };

  const cancelAttr = {
    trigger: <Button {...btnCancel} />,
    confirm: async () => await handleCancelStatus(),
    isOpen: cancelIsOpen,
    onClose: cancelOnClose,
  };

  const paymentConfirmAttr = {
    trigger: <Button {...btnPaymentConfirm} />,
    confirm: async () => await handleUpadateStatus(3),
    isOpen: firstIsOpen,
    onClose: firstOnClose,
  };
  const paymentRejectAttr = {
    trigger: <Button {...btnPaymentReject} />,
    confirm: async () => await handleUpadateStatus(1),
    isOpen: secondIsOpen,
    onClose: secondOnClose,
  };

  const sentAttr = {
    trigger: <Button {...btnSent} />,
    confirm: async () => await handleUpadateStatus(4),
    isOpen: firstIsOpen,
    onClose: firstOnClose,
  };

  switch (status) {
    case 2:
      return (
        <>
          <PopoverConfirmation {...paymentConfirmAttr} />
          <PopoverConfirmation {...paymentRejectAttr} />
          {/* <PopoverConfirmation {...cancelAttr}/> */}
        </>
      );
    case 3:
      return (
        <>
          <PopoverConfirmation {...sentAttr} />
          <PopoverConfirmation {...cancelAttr} />
        </>
      );
    // case 4:
    //   return "Sent";
    // case 5:
    //   return "Finish";
    // default:
    //   return "Canceled";
  }
}

export default FooterButton;
