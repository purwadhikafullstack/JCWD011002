import { Text, VStack } from "@chakra-ui/react";

function setInfoDetail(title, value) {
  return { title, value };
}

const container = {
  alignItems: "left",
  gap: 0,
};
const titleAttr = {
  fontWeight: "semibold",
};

function DrawerInfoDetail({ title, value }) {
  return (
    <VStack {...container}>
      <Text {...titleAttr}>{title}</Text>
      <Text>{value}</Text>
    </VStack>
  );
}

export default DrawerInfoDetail;
export { setInfoDetail };
