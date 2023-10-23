import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import DrawerAddForm from "./DrawerAddForm";
import { useFormik } from "formik";
import DrawerAddButton from "./DrawerAddButton";
import { useState } from "react";
import { register } from "../../../../api/admin";
import LoadingBar from "../../../Utility/LoadingBar";

const drawerContentAttr = {
  bgColor: "secondary",
  color: "textPrimary",
};
const drawerHeaderAttr = {
  borderBottomWidth: "1px",
};
const drawerBodyAttr = {
  py: "20px",
};
const drawerFooterAttr = {
  borderTopWidth: "1px",
};
const initialValues = {
  email: "",
  id_role: 0,
  id_warehouse: 0,
};

function DrawerAddAdmin({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const drawerAttr = {
    isOpen,
    onClose,
    placement: "right",
  };

  async function handleSubmit(attributes) {
    // Send Data
    setIsLoading(true);
    await register(toast, attributes);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const addFormAttr = {
    formik,
  };

  const addButtonAttr = {
    isLoading,
  };

  return (
    <>
      <Drawer {...drawerAttr}>
        <DrawerOverlay />
        <DrawerContent {...drawerContentAttr}>
          <DrawerHeader {...drawerHeaderAttr}>Add Admin</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody {...drawerBodyAttr}>
            <DrawerAddForm {...addFormAttr} />
          </DrawerBody>
          <DrawerFooter {...drawerFooterAttr}>
            <DrawerAddButton {...addButtonAttr} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {isLoading && <LoadingBar />}
    </>
  );
}

export default DrawerAddAdmin;
