import { Flex, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import getImage from "../../../../api/GetImage";
import DrawerEditUser from "./DrawerUser";

const cardContainer = {
  h: { sm: "128px", md: "256px", lg: "280px" },
  bgColor: "primary",
  borderRadius: "8px",
  overflow: "hidden",
  pos: "relative",
  cursor: "pointer",
  role: "group",
  transition: "0.6s",
  _hover: {
    bgColor: "secondary",
  },
};

const dataContainer = {
  w: "full",
  h: "24%",
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  pos: "absolute",
  fontFamily: "Fira Code",
  fontSize: "12px",
  backdropFilter: "blur(2px)",
};

const topContainer = {
  ...dataContainer,
  top: "0",
  bgGradient: "linear(to-b, #00000088, #00000000)",
};
const bottomContainer = {
  ...dataContainer,
  bottom: "0",
  bgGradient: "linear(to-t, #00000088, #00000000)",
};
const nameAttr = {
  fontWeight: "bold",
  fontSize: "20px",
  textTransform: "capitalize",
  noOflines: 1,
};

function CardUser({ user }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { role, warehouses } = user;

  function handleClick() {
    onOpen();
    console.log("clicked");
  }

  const drawerAttr = {
    user,
    isOpen,
    onClose,
  };

  const avatarAttr = {
    src: getImage(user["avatar"]),
    objectFit: "cover",
    objectPosition: "center",
    transition: "0.6s",
    _groupHover: {
      transform: "scale(1.2)",
    },
  };

  console.log(user);
  return (
    <GridItem h={"fit-content"}>
      <Flex {...cardContainer} onClick={handleClick}>
        <Image {...avatarAttr} />
        <Flex {...topContainer}>
          <Text {...nameAttr}>{role["name"]}</Text>
          {warehouses.length > 0 && (
            <Text noOfLines={1}>{warehouses[0]["name"]}</Text>
          )}
        </Flex>
        <Flex {...bottomContainer}>
          <Text {...nameAttr}>{user["name"]}</Text>
        </Flex>
      </Flex>
      <DrawerEditUser {...drawerAttr} />
    </GridItem>
  );
}

export default CardUser;
