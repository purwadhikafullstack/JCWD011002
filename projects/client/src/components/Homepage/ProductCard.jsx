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
import { useState } from "react";
import LoadingBar from "../Utility/LoadingBar";

const container = {
  bgColor: "white",
  direction: "column",
  w: "full",
  h: "full",
  color: "textReversePrimary",
  pos: "relative",
};

const detailAttr = {
  direction: "column",
  p: "8px",
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
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function isReady() {
    return product?.is_active && parseInt(product?.stock) > 0;
  }

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
    setLoading(true);
    await addToCart(toast, attributes);
    setLoading(false);
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
    filter: `grayscale(${isReady() ? 0 : 0.8})`,
  };

  const imageSectionAttr = {
    pos: "relative",
    minH: "240px",
  };

  const addToCartAttr = {
    children: "Add to cart",
    fontFamily: "Fira Code",
    variant: "edit",
    mt: "8px",
    isDisabled: !isReady(),
    onClick: (e) => handleAddToCart(e),
    _disabled: {
      cursor: "not-allowed",
      bgColor: "textSecondary",
      _hover: {
        bgColor: "textReverseSecondary",
      },
    },
  };

  const soldOutAttr = {
    pos: "absolute",
    h: "full",
    src: "/images/out-of-stock.png",
    objectFit: "cover",
    p: "16px",
    display: !isReady() ? "block" : "none",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    m: "auto"
  };

  return (
    <>
      <GridItem {...mainContainer}>
        <Flex {...container}>
          <Flex {...imageSectionAttr}>
            <Flex>
              <Image {...imageAttr} />
              <Image {...soldOutAttr} />
            </Flex>
            <Text {...categoryAttr}>{product?.category}</Text>
          </Flex>
          <Flex {...detailAttr}>
            <Text {...nameAttr}>{product?.name}</Text>
            <Text {...priceAttr}>Rp {formaterPrice(product?.price)}</Text>
            <Button {...addToCartAttr} />
          </Flex>
        </Flex>
      </GridItem>
      {isLoading && <LoadingBar />}
    </>
  );
}

export default ProductCard;
