import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import PopoverConfirmation from "../../../../Utility/PopoverConfirmation";
import {
  cancelOrder,
  updateOrderStatus,
} from "../../../../../api/transactions";
import { useDispatch } from "react-redux";
import { setOrderTrigger } from "../../../../../storage/TriggerReducer";
import { useState } from "react";
import LoadingBar from "../../../../Utility/LoadingBar";

function FooterButton({ status, id_user, id_transaction }) {
  const [isLoading, setIsLoading] = useState(false);
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
    isLoading,
    loadingText: "Submitting",
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
    confirm: async () => {
      setIsLoading(true);
      await handleUpadateStatus(1);
      setIsLoading(false);
    },
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
        </>
      );
    case 3:
      return (
        <>
          <PopoverConfirmation {...sentAttr} />
          <PopoverConfirmation {...cancelAttr} />
        </>
      );
  }
}

export default FooterButton;
