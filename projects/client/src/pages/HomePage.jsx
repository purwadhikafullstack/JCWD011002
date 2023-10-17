import React from "react";
import CategoryCard from "../components/Card/CategoryCard";
import { Flex } from "@chakra-ui/react";
import LineBreak from "../components/Custom/LineBreak";
import ProductList from "../components/Homepage/ProductList";
import CategoryList from "../components/Homepage/CategoryList";
import Filter from "../components/Homepage/Filter";

const container = {
  direction: "column",
  w: "full",
  pos: "relative",
  gap: "16px",
  px: ["16px", "20px", "24px", "156px"],
  py: "16px",
};

const HomePage = () => {
  return (
    <Flex {...container}>
      <LineBreak data="Category" />
      <CategoryList />
      <LineBreak data="Product" />
      <Filter />
      <ProductList />
    </Flex>
  );
};

export default HomePage;
