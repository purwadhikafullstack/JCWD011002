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
import DrawerInfo from "./DrawerInfo";
import DrawerEdit from "./DrawerEdit";
import { useState } from "react";
import DrawerBaseButtonGroup from "./DrawerBaseButtonGroup";
import DrawerEditButtonGroup from "./DrawerEditButtonGroup";
import { useFormik } from "formik";
import { updateAdmin } from "../../../../api/admin";
import { useDispatch } from "react-redux";
import { setUserTrigger } from "../../../../storage/TriggerReducer";
import LoadingBar from "../../../Utility/LoadingBar";

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

function DrawerUser({ user, isOpen, onClose }) {
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { role } = user;
  const dispatch = useDispatch();
  const toast = useToast();

  const initialValues = {
    role: 0,
    warehouse: 1,
  };

  async function handleSubmit(attributes) {
    // Update Data
    setLoading(true);
    await updateAdmin(toast, user?.id, attributes);
    dispatch(setUserTrigger());
    setLoading(false);
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
      <DrawerEdit user={user} formik={formik} />
    ) : (
      <DrawerInfo user={user} />
    );
  }

  function setDrawerButton() {
    return isEdit ? (
      <DrawerEditButtonGroup {...editButtonAttr} />
    ) : (
      <DrawerBaseButtonGroup {...editButtonAttr} onClose={onClose} />
    );
  }

  return (
    <>
      <Drawer {...drawerAttr}>
        <DrawerOverlay />
        <DrawerContent {...drawerContentAttr}>
          <DrawerHeader {...drawerHeaderAttr}>
            {isEdit ? user?.name : "Information"}
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody py="20px">{setDrawerContent()}</DrawerBody>
          {role?.name !== "user" && (
            <DrawerFooter {...drawerFooterAttr}>
              {setDrawerButton()}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
      {isLoading && <LoadingBar />}
    </>
  );
}
export default DrawerUser;
