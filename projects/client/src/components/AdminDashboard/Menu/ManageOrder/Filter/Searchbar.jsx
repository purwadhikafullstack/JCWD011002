import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../../../helpers/useDebounce";
import { useDispatch } from "react-redux";
import { searchOrder } from "../../../../../storage/SearchReducer";

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const query = searchParams.get("q") || "";
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

  const container = {
    w: "280px",
  };
  const leftSearch = {
    children: <FiSearch />,
  };
  const search = {
    placeholder: "Search...",
    value: query,
    onChange,
  };

  useDebounce(() => {
    dispatch(searchOrder(query));
  }, [query]);

  return (
    <InputGroup {...container}>
      <InputLeftElement {...leftSearch} />
      <Input {...search} />
    </InputGroup>
  );
}

export default Searchbar;
