import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../../../helpers/useDebounce";
import { useDispatch } from "react-redux";
import { searchInvoice } from "../../../../../storage/SearchReducer";

function SearchInvoice() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const query = searchParams.get("invoice") || "";
  const dispatch = useDispatch();

  function onChange(event) {
    const { value } = event.target;
    setSearchParams(
      (prev) => {
        prev.set("invoice", value);
        return prev;
      },
      { replace: true }
    );
  }

  const container = {
    w: "240px",
  };
  const leftSearch = {
    children: <FiSearch />,
  };
  const search = {
    placeholder: "Search Invoice...",
    value: query,
    onChange,
  };

  useDebounce(() => {
    dispatch(searchInvoice(query));
  }, [query]);

  return (
    <InputGroup {...container}>
      <InputLeftElement {...leftSearch} />
      <Input {...search} />
    </InputGroup>
  );
}

export default SearchInvoice;
