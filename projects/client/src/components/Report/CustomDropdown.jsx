import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";

const CustomDropdown = ({ options, selectedValue, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    if (onChange) {
      onChange(value);
    }
    setIsOpen(false);
  };

  return (
    <Stack position="relative" spacing={0}>
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <Stack
          position="absolute"
          top="100%"
          left={0}
          zIndex={999}
          boxShadow="md"
          bg="white"
          border="1px solid #fff"
        >
          {filteredOptions.map((option) => (
            <Text
              key={option.value}
              p={2}
              cursor="pointer"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </Text>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default CustomDropdown;
