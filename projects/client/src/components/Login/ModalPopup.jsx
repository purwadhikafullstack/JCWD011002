import {
  Modal,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import FormLogin from "../Form/FormLogin";
import FormRegisterMail from "../Form/FormRegister";

const modalOverlayAttr = {
  backdropFilter: "blur(2px)",
};
const tabsAttr = {
  isFitted: true,
};

function ModalPopup({ isOpen, onClose }) {
  const modalAttr = { isOpen, onClose };
  const tabsPanelAttr = {onClose}

  return (
    <Modal {...modalAttr}>
      <ModalOverlay {...modalOverlayAttr} />
      <ModalContent>
        <Tabs {...tabsAttr}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormLogin {...tabsPanelAttr}/>
            </TabPanel>
            <TabPanel>
              <FormRegisterMail {...tabsPanelAttr}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}

export default ModalPopup;
