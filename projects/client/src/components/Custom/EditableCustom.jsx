import {
  Editable,
  EditableInput,
  EditablePreview,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

function EditableCustom({ id, param ,value }) {
  const container = {
    gap: 0,
    alignItems: "left",
  };
  const titleAttr = {
    fontSize: "18px",
    textTransform: "capitalize",
    fontWeight: "semibold",
  };
  const editableAttr = {
    fontFamily: "Fira Code",
    defaultValue: value,
    isPreviewFocusable: true,
  };

  return (
    <VStack {...container}>
      <Text {...titleAttr}>{param}</Text>
      <Editable {...editableAttr}>
        <EditablePreview />
        <Input as={EditableInput} />
      </Editable>
    </VStack>
  );
}

export default EditableCustom;
