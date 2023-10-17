import { Flex, Text } from "@chakra-ui/react";
import FormRegistration from "../Form/FormRegistration";

const container = {
  direction: "column",
  alignItems: "center",
  gap: "24px",
  w: "full",
  h: "full",
  py: "64px",
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
