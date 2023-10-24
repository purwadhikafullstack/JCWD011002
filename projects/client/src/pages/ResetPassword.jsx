import { Flex, useMediaQuery } from "@chakra-ui/react";
import ResetPassword from "../components/ResetPassword";

const container = {
  w: "full",
  alignItems: "center",
  justifyContent: "center",
};

const banner = {
  flex: 1,
  bgImage: "url(/images/reset_password.jpg)",
  h: "full",
  bgPos: "center",
  bgSize: "cover",
  filter: { base: "none", lg: "brightness(60%)" },
};

function MobileView() {
  const backdrop = {
    w: "full",
    backdropFilter: "blur(8px) brightness(60%)",
  };
  return (
    <Flex {...container}>
      <Flex {...banner}>
        <Flex {...backdrop}>
          <ResetPassword />
        </Flex>
      </Flex>
    </Flex>
  );
}

function DesktopView() {
  return (
    <Flex {...container}>
      <Flex {...banner} />
      <ResetPassword />
    </Flex>
  );
}

function ResetPasswordPage() {
  const [isMd] = useMediaQuery("(max-width: 768px)");
  return <>{isMd ? <MobileView /> : <DesktopView />}</>;
}

export default ResetPasswordPage;
