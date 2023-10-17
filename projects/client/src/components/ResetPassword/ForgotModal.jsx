import FormForgotPassword from "../Form/FormForgotPassword";

const {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} = require("@chakra-ui/react");

const modalOverlayAttr = {
  backdropFilter: "blur(2px)",
};

const modalContentAttr = {
  alignItems: "center",
};

const modalBodyAttr = {
  w: "full",
  p: "0 12px 12px",
};

function ForgotModal({ isOpen, onClose }) {
  const modalAttr = { isOpen, onClose };
  const forgotPasswordAttr = { onClose };
  return (
    <Modal {...modalAttr}>
      <ModalOverlay {...modalOverlayAttr} />
      <ModalContent {...modalContentAttr}>
        <ModalHeader>Forgot Password</ModalHeader>
        <ModalBody {...modalBodyAttr}>
          <FormForgotPassword {...forgotPasswordAttr} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ForgotModal;
