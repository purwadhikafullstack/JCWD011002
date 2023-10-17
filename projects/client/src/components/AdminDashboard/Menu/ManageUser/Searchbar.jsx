import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { searchUser } from "../../../../storage/SearchReducer";

const container = {
  w: "30%",
};

const leftElementAttr = {
  children: <FiSearch />,
};

function Searchbar() {
  const dispatch = useDispatch();

  function onChange(event) {
    const { value } = event.target;
    dispatch(searchUser(value));
  }

  const inputAttr = {
    placeholder: "Search Name...",
    onChange,
  };
  return (
    <InputGroup {...container}>
      <InputLeftElement {...leftElementAttr} />
      <Input {...inputAttr} />
    </InputGroup>
  );
}

export default Searchbar;
