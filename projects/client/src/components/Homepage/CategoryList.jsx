import { Grid, useToast } from "@chakra-ui/react";
import { getCategories } from "../../api/product";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { useSearchParams } from "react-router-dom";

const container = {
  templateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "16px",
};

const allAttr = {
  id: 0,
  name: "All",
};

function CategoryList() {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [searchPageParams, setCurrentCateogry] = useSearchParams({
    category: 0,
  });
  const currentCategory = searchPageParams.get("category");

  async function fetchCategories() {
    const { data } = await getCategories(toast);
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function selected(idCategory) {
    return idCategory === parseInt(currentCategory);
  }

  function setCategory(category) {
    return {
      category,
      selected: selected(category?.id),
      onClick: () => {
        setCurrentCateogry((prev) => {
          prev.set("category", category?.id);
          return prev;
        });
      },
    };
  }

  return (
    <Grid {...container}>
      <CategoryCard {...setCategory(allAttr)} />
      {categories.map((category, index) => (
        <CategoryCard {...setCategory(category)} key={index} />
      ))}
    </Grid>
  );
}

export default CategoryList;
