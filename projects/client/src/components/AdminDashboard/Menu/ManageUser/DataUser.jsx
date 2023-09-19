import { Box, Button, Td, Tr, useDisclosure } from "@chakra-ui/react";
import DrawerUser from "./DrawerUser";

const tdAttr = {
  textTransform: "capitalize",
  textAlign: "center",
};

function DataUser({ admin, num }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { user, warehouse } = admin;

  const statusAttr = {
    borderRadius: "50%",
    bgColor: user?.is_active ? "successSecondary" : "errorPrimary",
    w: "20px",
    h: "20px",
    m: "auto",
  };
  const buttonAttr = {
    variant: "edit",
    onClick: onOpen,
  };
  const drawerDetailAttr = { admin, isOpen, onClose };
  return (
    <Tr>
      <Td {...tdAttr}>{num}</Td>
      <Td {...tdAttr} textAlign={"left"}>
        {user?.name}
      </Td>
      <Td {...tdAttr}>{user?.role?.name}</Td>
      <Td {...tdAttr}>
        {warehouse && warehouse !== "" ? warehouse?.name : "-"}
      </Td>
      <Td {...tdAttr}>
        <Box {...statusAttr} />
      </Td>
      <Td>
        <Button {...buttonAttr}>Detail</Button>
        <DrawerUser {...drawerDetailAttr} />
      </Td>
    </Tr>
  );
}

export default DataUser;
