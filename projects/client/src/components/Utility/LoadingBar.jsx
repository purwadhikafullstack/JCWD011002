import { Flex, Text, keyframes } from "@chakra-ui/react";

const animation = keyframes`
    0% {
        top: 8px;
        height: 64px;
    }
    50%, 100% {
        top: 24px;
        height: 32px;
    }
`;

const bars = {
  pos: "relative",
  w: "80px",
  h: "80px",
  mx: "auto",
};

const bar = {
  pos: "absolute",
  left: "8px",
  width: "16px",
  background: "white",
  animation: `${animation} 1.6s cubic-bezier(0, 0.5, 0.5, 1) infinite`,
};

const bar1 = {
  style: {
    animationDelay: "-0.24s",
  },
};

const bar2 = {
  left: "32px",
  style: {
    animationDelay: "-0.12s",
  },
};

const bar3 = {
  left: "56px",
  style: {
    animationDelay: "0s",
  },
};

const background = {
  pos: "fixed",
  top: 0,
  left: 0,
  w: "100vw",
  h: "100vh",
  bgColor: "#00000066",
  zIndex: 9999,
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
};

const container = {
  pos: "relative",
  direction: "column",
};

const wait = {
  children: "Please Wait...",
  fontWeight: "semibold",
  color: "textPrimary"
};

function LoadingBar() {
  return (
    <Flex {...background}>
      <Flex {...container}>
        <Flex {...bars}>
          <Flex {...bar} {...bar1} />
          <Flex {...bar} {...bar2} />
          <Flex {...bar} {...bar3} />
        </Flex>
        <Text {...wait} />
      </Flex>
    </Flex>
  );
}

export default LoadingBar;
