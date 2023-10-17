import { Button, Flex } from "@chakra-ui/react";

const container = {
  w: "full",
};

function DrawerAddButton({ isLoading = false }) {
  const addButtonAttr = {
    children: "Create New Admin",
    variant: "success",
    w: "full",
    isLoading,
    onClick: () => document.getElementById("add-admin-button").click(),
  };
  
  return (
    <Flex {...container}>
      <Button {...addButtonAttr} />
    </Flex>
  );
}

export default DrawerAddButton;
