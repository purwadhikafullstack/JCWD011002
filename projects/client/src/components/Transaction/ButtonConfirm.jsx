import { Badge, useDisclosure, useToast } from "@chakra-ui/react";
import { updateOrderStatus } from "../../api/transactions";
import PopoverConfirmation from "../Utility/PopoverConfirmation";

function ButtonConfirm({ id_transaction }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const btnConfirm = {
    children: "CONFIRM",
    bg: "successPrimary",
    ml: 1,
    alignSelf: "center",
    color: "textPrimary",
    cursor: "pointer",
    onClick: onOpen,
  };

  const confirmAttr = {
    trigger: <Badge {...btnConfirm} />,
    confirm: async () => await updateOrderStatus(toast, id_transaction, 5),
    isOpen,
    onClose,
  };
  
  return <PopoverConfirmation {...confirmAttr} />;
}

export default ButtonConfirm;
