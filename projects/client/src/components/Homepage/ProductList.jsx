import { Grid, useMediaQuery, useToast } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../api/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Utility/Pagination";
import { useSearchParams } from "react-router-dom";
import LoadingBar from "../Utility/LoadingBar";

const breakpoints = ["320px", "768px", "960px", "1200px", "1536px"];

const container = {
  templateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "16px",
};

function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [firstRander, setFirstRander] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const search = useSelector((state) => state.search.products);
  const toast = useToast();

  const currentPage = searchParams.get("page") || 1;
  const currentCategory = searchParams.get("category") || 0;
  const currentOrder = searchParams.get("order") || "name";
  const currentSort = searchParams.get("sort") || "ASC";

  const [isSm, isMd, isLg, isXl, is2Xl] = useMediaQuery(
    breakpoints.map((breakpoint) => `(max-width: ${breakpoint})`)
  );

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage: setSearchParams,
  };

  async function fetchProducts() {
    const attributes = {
      search,
      page: currentPage,
      category: currentCategory,
      order: currentOrder,
      sort: currentSort,
      limit: 12,
    };
    setIsLoading(true);
    const { data } = await getProducts(toast, attributes);
    const { products: productList, pages } = data;
    setMaxPage(pages);
    setProducts(productList);
    setFirstRander(false);
    setIsLoading(false);
  }

  useEffect(() => {
    setSearchParams((prev) => {
      if (!firstRander) {
        prev.set("page", 1);
        return prev;
      }
    });
  }, [search, currentCategory, currentOrder, currentSort]);

  useEffect(() => {
    fetchProducts();
  }, [search, currentPage, currentCategory, currentOrder, currentSort]);


  return (
    <>
      <Grid {...container}>
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </Grid>
      <Pagination {...paginationAttr} />
      {isLoading && !firstRander && <LoadingBar />}
    </>
  );
}

export default ProductList;
