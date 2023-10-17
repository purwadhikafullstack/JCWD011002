import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

const popoverBodyAttr = {
  bgColor: "bgSecondary",
  // border: "1px solid",
  w: "fit-content",
};

const confirmContainerAttr = {
  w: "full",
  gap: "8px",
};

function PopoverConfirmation({ trigger, confirm, isOpen, onClose }) {
  // const {onOpen, onClose} = useDisclosure();

  const popoverAttr = {
    placement: "top",
    isOpen,
    closeOnBlur: true,
  };

  const triggerAttr = {
    children: trigger,
  };
  const buttonYes = {
    children: "Yes",
    variant: "success",
    grow: 1,
    onClick: () => {
      confirm();
      onClose();
    },
  };
  const buttonNo = {
    children: "No",
    variant: "error",
    grow: 1,
    onClick: () => onClose(),
  };
  return (
    <Popover {...popoverAttr}>
      <PopoverTrigger {...triggerAttr} />
      <PopoverContent {...popoverBodyAttr}>
        <PopoverArrow {...popoverBodyAttr} />
        <PopoverHeader>Are you sure?</PopoverHeader>
        <PopoverBody>
          <Flex {...confirmContainerAttr}>
            <Button {...buttonYes} />
            <Button {...buttonNo} />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverConfirmation;
