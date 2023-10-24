import { Flex, useMediaQuery } from "@chakra-ui/react";
import Register from "../components/Register";

const banner = {
  flex: 1,
  bgImage: "url(/images/banner_registration.jpg)",
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
          <Register />
        </Flex>
      </Flex>
    </Flex>
  );
}

function DesktopView() {
  return (
    <Flex {...container}>
      <Flex {...banner} />
      <Register />
    </Flex>
  );
}

const container = {
  w: "full",
  alignItems: "center",
  justifyContent: "center",
};

function Registration() {
  const [isMd] = useMediaQuery("(max-width: 768px)");
  return <>{isMd ? <MobileView /> : <DesktopView />}</>;
}

export default Registration;
