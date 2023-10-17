import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../storage/SearchReducer";
import useDebounce from "../../helpers/useDebounce";

const container = {
  w: "300px",
  display: {
    base: "none",
    md: "block",
  },
};

const leftElementAttr = {
  children: <FiSearch />,
};

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const query = searchParams.get("q");
  const dispatch = useDispatch();

  function onChange(event) {
    const { value } = event.target;
    setSearchParams(
      (prev) => {
        prev.set("q", value);
        return prev;
      },
      { replace: true }
    );
  }

  const inputAttr = {
    placeholder: "Search Product...",
    value: query,
    onChange,
  };

  useDebounce(() => {
    dispatch(searchProduct(query));
  }, [query]);

  return (
    <InputGroup {...container}>
      <InputLeftElement {...leftElementAttr} />
      <Input {...inputAttr} />
    </InputGroup>
  );
}

export default Searchbar;
