import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import AllStatus from "./Status/AllStatus";
import ToPay from "./Status/ToPay";
import ToConfirm from "./Status/ToConfirm";
import Processed from "./Status/Processed";
import Shipped from "./Status/Shipped";
import Completed from "./Status/Completed";
import Cancelled from "./Status/Cancelled";

const Buttons = () => {
  const [activePage, setActivePage] = useState("topay");

  const buttonStyle = {
    borderRadius: "10px 10px 0 0",
    fontSize: "xs",
    color: "textPrimary",
    w: "90px",
    minW: "90px",
    variant: "outline",
    _hover: {
      bg: "primary",
      color: "white",
    },
  };

  const activeButtonStyle = {
    ...buttonStyle,
    bg: "#34638A",
    color: "white",
  };

  const renderPage = () => {
    switch (activePage) {
      case "all":
        return <AllStatus />;
      case "topay":
        return <ToPay />;
      case "toconfirm":
        return <ToConfirm />;
      case "processed":
        return <Processed />;
      case "shipped":
        return <Shipped />;
      case "completed":
        return <Completed />;
      case "cancelled":
        return <Cancelled />;
      default:
        return null;
    }
  };

  return (
    <Flex direction={"column"}>
      <Box
        mb={2}
        display={"flex"}
        overflowX={"scroll"}
        w={"100vw"}
        whiteSpace={"nowrap"}
      >
        <Button
          {...(activePage === "all" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("all")}
        >
          All Status
        </Button>
        <Button
          {...(activePage === "topay" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("topay")}
        >
          To Pay
        </Button>
        <Button
          {...(activePage === "toconfirm" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("toconfirm")}
        >
          To Confirm
        </Button>
        <Button
          {...(activePage === "processed" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("processed")}
        >
          Processed
        </Button>
        <Button
          {...(activePage === "shipped" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("shipped")}
        >
          Shipped
        </Button>
        <Button
          {...(activePage === "completed" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("completed")}
        >
          Completed
        </Button>
        <Button
          {...(activePage === "cancelled" ? activeButtonStyle : buttonStyle)}
          onClick={() => setActivePage("cancelled")}
        >
          Cancelled
        </Button>
      </Box>
      <Box w={"100vw"}>{renderPage()}</Box>
    </Flex>
  );
};

export default Buttons;
