import { extendTheme } from "@chakra-ui/react";

const buttonDark = {
  fontFamily: "Fira Code, monospace",
  color: "textPrimary",
};

const successScheme = {
  ...buttonDark,
  bgColor: "successPrimary",
  _hover: {
    bgColor: "successSecondary",
  },
};

const errorScheme = {
  ...buttonDark,
  bgColor: "errorPrimary",
  _hover: {
    bgColor: "errorSecondary",
  },
};

const editScheme = {
  ...buttonDark,
  bgColor: "editPrimary",
  _hover: {
    bgColor: "editSecondary",
  },
};

const themes = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "bgPrimary",
      },
    },
  },
  fonts: {
    body: "JetBrains Mono, monospace",
  },
  colors: {
    primary: "#34638A",
    secondary: "#233947",
    bgPrimary: "#1C1C1C",
    bgSecondary: "#2D2D2D",
    textPrimary: "#FFFFFF",
    textSecondary: "#E0E0E0",
    textReversePrimary: "#000000",
    textReverseSecondary: "gray.500",
    successPrimary: "#2E7D32",
    successSecondary: "#4CAF50",
    errorPrimary: "#D32F2F",
    errorSecondary: "#EF5350",
    warningPrimary: "#ED6C02",
    warningSecondary: "#FF9800",
    editPrimary: "#34638A",
    editSecondary: "#2C4E69",
    blueCold: "#9E9FA5",
    darkBlue: "#34638A",
  },
  components: {
    Text: {
      variants: {
        title: {
          fontWeight: "bold",
          fontSize: "32px",
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "8px",
      },
      variants: {
        success: successScheme,
        error: errorScheme,
        edit: editScheme,
        capsuleSuccess: {
          borderRadius: "3rem",
          ...successScheme,
        },
        capsuleError: {
          borderRadius: "3rem",
          ...errorScheme,
        },
        iconCircleSuccess: {
          borderRadius: "50%",
          w: "60px",
          h: "60px",
          fontSize:"28px",
          ...successScheme,
        },
      },
    },
    Table: {
      parts: ["Thead"],
      Thead: {
        baseStyle: {
          color: "red",
          bgColor: "yellow",
        },
      },
    },
  },
});

export default themes;
