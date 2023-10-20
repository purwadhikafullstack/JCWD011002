import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Notification from "../../helpers/Notification";
import { addToCart } from "../../api/cart";
import jwt_decode from "jwt-decode";
import { TbShoppingCartPlus as IcAddToCart } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const initialValues = {
  qty: 1,
};

const container = {
  direction: "column",
  gap: "8px",
};

const addOnBtn = {
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "bold",
  bgColor: "primary",
  _hover: {
    bgColor: "secondary",
  },
};

const qtyAttr = {
  direction: "row",
  alignItems: "center",
  gap: "8px",
};

const inputQty = {
  w: "160px",
};

function isLogin() {
  return localStorage.getItem("token");
}

function getUserId() {
  const token = localStorage.getItem("token");
  return jwt_decode(token)["id"];
}

function FormAddToCart({ product }) {
  const toast = useToast();
  const navigate = useNavigate();

  function handleNotif(title) {
    Notification(toast, {
      title,
      status: 400,
    });
  }

  function isReady() {
    return product?.is_active && parseInt(product?.stock) > 0;
  }

  function handelChange(value) {
    if (value > product?.stock) return handleNotif("Cannot be more than stock");
    formik.setFieldValue("qty", value);
  }

  function handleQtyClick(value) {
    if (value < 1) return handleNotif("Cannot be less than 1");
    handelChange(value);
  }

  async function handleSubmit(attributes) {
    if (!isLogin()) {
      document.getElementById("btn-login-modal").click();
      return handleNotif("You must login first");
    }
    const { qty } = attributes;
    const attr = {
      userId: getUserId(),
      productId: product.id,
      quantity: qty,
    };
    // Add to Cart
    await addToCart(toast, attr);
    navigate("/cart");
  }

  function handleBlur() {
    let { qty } = formik.values;
    if (!qty || qty < 1) qty = 1;
    formik.setFieldValue("qty", parseInt(qty));
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const inputAttr = {
    value: formik.values.qty,
    textAlign: "center",
    type: "number",
    min: 1,
    onChange: (e) => handelChange(e.target.value),
    onBlur: () => handleBlur(),
  };

  const btnPlus = {
    ...addOnBtn,
    children: "+",
    onClick: () => handleQtyClick(formik.values.qty + 1),
  };

  const btnMinus = {
    ...addOnBtn,
    children: "-",
    onClick: () => handleQtyClick(formik.values.qty - 1),
  };

  const btnAddToCart = {
    variant: "success",
    type: "submit",
    w: "fit-content",
    gap: "8px",
    isDisabled: !isReady(),
    _disabled: {
      cursor: "not-allowed",
      bgColor: "textSecondary",
      _hover: {
        bgColor: "textReverseSecondary",
      },
    },
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...container}>
        <Flex {...qtyAttr}>
          <Text>Quantity</Text>
          <InputGroup {...inputQty}>
            <InputLeftAddon {...btnMinus} />
            <Input {...inputAttr} />
            <InputRightAddon {...btnPlus} />
          </InputGroup>
        </Flex>
        <Button {...btnAddToCart}>
          <IcAddToCart />
          <Text>Add To Cart</Text>
        </Button>
      </Flex>
    </form>
  );
}

export default FormAddToCart;
