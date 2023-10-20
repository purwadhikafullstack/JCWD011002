import { HStack, Text, VStack } from "@chakra-ui/react";

function setInfoDetail(title, value, icon) {
  return { title, value, icon };
}

const container = {
  alignItems: "left",
  gap: 0,
};
const titleAttr = {
  fontWeight: "semibold",
};

function DrawerInfoDetail({ title, value, icon }) {
  return (
    <VStack {...container}>
      <HStack>
        {icon}
        <Text {...titleAttr}>{title}</Text>
      </HStack>
      <Text>{value}</Text>
    </VStack>
  );
}

export default DrawerInfoDetail;
export { setInfoDetail };
