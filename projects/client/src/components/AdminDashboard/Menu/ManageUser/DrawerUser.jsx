import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import DrawerInfo from "./DrawerInfo";
import DrawerEdit from "./DrawerEdit";
import { useState } from "react";
import DrawerBaseButtonGroup from "./DrawerBaseButtonGroup";
import DrawerEditButtonGroup from "./DrawerEditButtonGroup";
import { useFormik } from "formik";
import { updateAdmin } from "../../../../api/admin";
import { useDispatch } from "react-redux";
import { setUserTrigger } from "../../../../storage/TriggerReducer";

const drawerContentAttr = {
  bgColor: "secondary",
  color: "textPrimary",
};
const drawerHeaderAttr = {
  borderBottomWidth: "1px",
};
const drawerFooterAttr = {
  borderTopWidth: "1px",
};

function DrawerUser({ admin, isOpen, onClose }) {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = admin;
  const dispatch = useDispatch();
  const toast = useToast();

  const initialValues = {
    role: 0,
    warehouse: 1,
  };

  async function handleSubmit(attributes) {
    // Update Data
    await updateAdmin(toast, user?.id, attributes);
    dispatch(setUserTrigger());
    onClose();
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const drawerAttr = {
    isOpen,
    onClose: () => {
      onClose();
      setIsEdit(false);
    },
    placement: "right",
  };

  const editButtonAttr = {
    editToggle: setIsEdit,
    user,
  };

  function setDrawerContent() {
    return isEdit ? (
      <DrawerEdit data={admin} formik={formik} />
    ) : (
      <DrawerInfo data={admin} />
    );
  }

  function setDrawerButton() {
    return isEdit ? (
      <DrawerEditButtonGroup {...editButtonAttr} />
    ) : (
      <DrawerBaseButtonGroup {...editButtonAttr} onClose={onClose}/>
    );
  }
  
  return (
    <Drawer {...drawerAttr}>
      <DrawerOverlay />
      <DrawerContent {...drawerContentAttr}>
        <DrawerHeader {...drawerHeaderAttr}>
          {isEdit ? user?.name : "Information"}
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody py="20px">{setDrawerContent()}</DrawerBody>
        <DrawerFooter {...drawerFooterAttr}>{setDrawerButton()}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default DrawerUser;
