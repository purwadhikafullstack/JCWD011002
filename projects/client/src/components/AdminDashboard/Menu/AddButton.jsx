import { Flex, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

function AddButton({ add }) {
  const containerRef = useRef();
  const id = "add-user";

  const addNewAttr = {
    id,
    alignItems: "center",
    justifyContent: "center",
    // h: { sm: "128px", md: "256px", lg: "280px" },
    h: containerRef.current?.clientWidth,
    borderRadius: "8px",
    overflow: "hidden",
    pos: "relative",
    fontSize: { sm: "64px", md: "80px", lg: "108px" },
    cursor: "pointer",
    onClick: add,
    bgColor: "primary",
    transition: "0.6s",
    role: "group",
    _hover: {
      bgColor: "secondary",
    },
  };

  const iconAttr = {
    transition: "0.6s",
    _groupHover: {
      transform: "scale(1.28)",
    },
  };

  function setHeight() {
    // console.log(containerRef.current?.clientWidth);
    const width = containerRef.current?.clientWidth;
    document.getElementById(id).style.height = width;
  }

  useEffect(() => {
    setHeight();
  }, [containerRef]);

  return (
    <GridItem h={"fit-content"}>
      <Flex {...addNewAttr} ref={containerRef}>
        <Text {...iconAttr}>+</Text>
      </Flex>
    </GridItem>
  );
}

export default AddButton;
