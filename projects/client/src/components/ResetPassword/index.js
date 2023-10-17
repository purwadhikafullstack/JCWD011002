import { Flex, Text } from "@chakra-ui/react";
import FormResetPassword from "../Form/FormResetPassword";

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
      <Text {...title}>Reset Password</Text>
      <FormResetPassword />
    </Flex>
  );
}

export default Register;
