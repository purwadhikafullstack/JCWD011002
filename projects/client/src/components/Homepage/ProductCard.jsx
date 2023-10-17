import {
  Button,
  Flex,
  GridItem,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import GetImage from "../../api/GetImage";
import { formaterPrice } from "../../helpers/formater";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../api/cart";
import Notification from "../../helpers/Notification";
import jwt_decode from "jwt-decode";

const container = {
  direction: "column",
  w: "full",
  bgColor: "white",
  color: "textReversePrimary",
  pos: "relative",
};

const detailAttr = {
  direction: "column",
  p: "8px",
};

const addCartPos = {
  base: "4px",
  sm: "0px",
  md: "4px",
  lg: "8px",
};

const nameAttr = {
  fontWeight: "semibold",
  noOfLines: 1,
  fontSize: "lg",
  //   fontFamily: "Fira Sans",
};

const categoryAttr = {
  borderRadius: "8px",
  noOfLines: 1,
  bgColor: "bgSecondary",
  opacity: "0.8",
  w: "fit-content",
  p: "4px 8px",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "textPrimary",
  border: "1px solid",
  borderColor: "textSecondary",
  pos: "absolute",
  right: "8px",
  bottom: "8px",
};

const priceAttr = {
  fontFamily: "Fira Sans",
};

function isLogin() {
  return localStorage.getItem("token");
}

function getUserId() {
  const token = localStorage.getItem("token");
  return jwt_decode(token)["id"];
}

function ProductCard({ product }) {
  const toast = useToast();
  const navigate = useNavigate();

  function handleDetail() {
    navigate(`/product/${product?.id}`);
  }

  async function handleAddToCart(event) {
    event.stopPropagation();
    if (!isLogin()) {
      document.getElementById("btn-login-modal").click();
      return Notification(toast, {
        title: "You must login first",
        status: "400",
      });
    }
    const attributes = {
      userId: getUserId(),
      productId: product?.id,
      quantity: 1,
    };
    await addToCart(toast, attributes);
  }

  const mainContainer = {
    w: "full",
    onClick: handleDetail,
    cursor: "pointer",
    transitionDuration: ".3s",
    borderRadius: "8px",
    overflow: "hidden",
    _hover: {
      transform: "translateY(-12px)",
    },
  };

  const imageAttr = {
    src: GetImage(product?.image),
    objectFit: "cover",
  };

  const imageSectionAttr = {
    pos: "relative",
  };

  const addToCartAttr = {
    children: "Add to cart",
    fontFamily: "Fira Code",
    variant: "edit",
    mt: "8px",
    onClick: (e) => handleAddToCart(e),
  };

  return (
    <GridItem {...mainContainer}>
      <Flex {...container}>
        <Flex {...imageSectionAttr}>
          <Image {...imageAttr} />
          <Text {...categoryAttr}>{product?.category}</Text>
        </Flex>
        <Flex {...detailAttr}>
          <Text {...nameAttr}>{product?.name}</Text>
          <Text {...priceAttr}>Rp {formaterPrice(product?.price)}</Text>
          <Button {...addToCartAttr} />
        </Flex>
      </Flex>
    </GridItem>
  );
}

export default ProductCard;