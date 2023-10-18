import { Flex, Text } from "@chakra-ui/react";
import FormResetPassword from "../Form/FormResetPassword";

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

function ResetPassword() {
  return (
    <Flex {...container}>
      <Text {...title}>Reset Password</Text>
      <FormResetPassword />
    </Flex>
  );
}

export default ResetPassword;
