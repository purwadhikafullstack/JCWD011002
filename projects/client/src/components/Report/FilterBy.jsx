import React, { useEffect, useState } from "react";
import { Flex, Select } from "@chakra-ui/react";

function getMonthAndYear() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  return { currentMonth, currentYear };
}

const FilterBy = ({
  filterByMonth,
  setFilterByMonth,
  filterByYear,
  setFilterByYear,
}) => {
  const handleMonthChange = (e) => {
    setFilterByMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setFilterByYear(e.target.value);
  };

  useEffect(() => {
    const { currentMonth, currentYear } = getMonthAndYear();
    setFilterByMonth(currentMonth.toString());
    setFilterByYear(currentYear.toString()); 
  }, [setFilterByMonth, setFilterByYear]);

  return (
    <Flex gap={2}>
      <Select
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Month"
        value={filterByMonth}
        onChange={handleMonthChange}
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </Select>
      <Select
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Year"
        value={filterByYear}
        onChange={handleYearChange}
      >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </Select>
    </Flex>
  );
};

export default FilterBy;
