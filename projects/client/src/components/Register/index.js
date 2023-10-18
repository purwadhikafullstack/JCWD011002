import { Flex, Text } from "@chakra-ui/react";
import FormRegistration from "../Form/FormRegistration";

const container = {
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  h: "full",
  py: { base: "32px", lg: "0px" },
  gap: "32px",
};

const title = {
  variant: "title",
};

function Register() {
  return (
    <Flex {...container}>
      <Text {...title}>Registration</Text>
      <FormRegistration />
    </Flex>
  );
}

export default Register;
