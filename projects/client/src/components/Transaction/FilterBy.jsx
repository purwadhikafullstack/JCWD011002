import React, { useState } from "react";
import {
  Flex,
  Box,
  ButtonGroup,
  Input,
  Select,
  IconButton,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { MdSaveAs } from "react-icons/md";
import { Search2Icon, CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const FilterBy = ({ onFilterChange, onDateRangeFilter }) => {
  const [filterValue, setFilterValue] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
  };

  const handleApplyDateFilter = () => {
    const formattedStartDate = startDate.replace("T", " ").substring(0, 16);
    const formattedEndDate = endDate.replace("T", " ").substring(0, 16);
    onDateRangeFilter(formattedStartDate, formattedEndDate);
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
    <Flex px={isMd ? 2 : 0} ml={isMd ? 0 : 2}>
      <Select
        color={"black"}
        bg={"white"}
        size={isMd ? "sm" : "md"}
        borderRadius={6}
        placeholder="FILTER BY"
        onChange={handleFilterChange}
        value={filterValue}
      >
        <option value="desc">DATE : NEWEST</option>
        <option value="asc">DATE : OLDEST</option>
      </Select>
      {isMd ? (
        <Box>
          <Popover placement="top-start">
            <PopoverTrigger>
              <ButtonGroup ml={2} size="sm" isAttached variant="outline">
                <Button
                  fontSize={"sm"}
                  size={"sm"}
                  w={"40vw"}
                  // h={10}
                  borderRadius={6}
                  bg={"white"}
                  color={"black"}
                  fontWeight={"medium"}
                >
                  DATE FILTER
                </Button>
                <IconButton
                  // h={10}
                  bg={"white"}
                  borderRadius={6}
                  color={"black"}
                  icon={<CalendarIcon />}
                />
              </ButtonGroup>
            </PopoverTrigger>
            <PopoverContent color="black">
              <PopoverHeader fontWeight="semibold">
                Filter by Date Range
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Text>Start Date:</Text>
                <Input
                  placeholder="Start Date"
                  size="md"
                  type="datetime-local"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <Text mt={4}>End Date:</Text>
                <Input
                  mb={1}
                  placeholder="End Date"
                  size="md"
                  type="datetime-local"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </PopoverBody>
              <PopoverFooter align={"right"}>
                <Button
                  size={"sm"}
                  border={"1px solid black"}
                  variant={"outline"}
                  onClick={handleApplyDateFilter}
                >
                  Apply
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
      ) : (
        <>
          <Input
            bg={"white"}
            color={"black"}
            ml={2}
            mr={2}
            size="md"
            type="text"
            placeholder="Set Start Date"
            onMouseEnter={(e) => (e.target.type = "datetime-local")}
            onMouseLeave={(e) => (e.target.type = "text")}
            value={startDate}
            onChange={handleStartDateChange}
          />
          <Input
            bg={"white"}
            color={"black"}
            size="md"
            type="text"
            placeholder="Set End Date"
            onMouseEnter={(e) => (e.target.type = "datetime-local")}
            onMouseLeave={(e) => (e.target.type = "text")}
            value={endDate}
            onChange={handleEndDateChange}
          />
          <Button
            variant={"outline"}
            color={"black"}
            fontSize={"md"}
            bg={"white"}
            _hover={{ color: "white", bg: "black" }}
            ml={2}
            w={"7vw"}
            onClick={handleApplyDateFilter}
          >
            Apply
          </Button>
        </>
      )}
    </Flex>
  );
};

export default FilterBy;
