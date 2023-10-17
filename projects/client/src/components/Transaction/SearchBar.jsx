import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");

  return (
    <Stack spacing={4}>
      <InputGroup px={isMd ? 2 : 0} mb={2}>
        <Input
          w={isMd ? "100vw" : "30vw"}
          size={isMd ? "md" : ""}
          bgColor={"white"}
          color={"black"}
          onKeyDown={handleKeyboard}
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement mr={isMd ? 3 : 1}>
          <SearchIcon color="black" onClick={handleSearch} />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
};

export default SearchBar;
