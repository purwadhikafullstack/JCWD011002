import { Select } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const style = {
  backgroundColor: "#2D2D2D",
};

const selectAttr = {
  w: "fit-content",
  cursor: "pointer",
};

function setMonths() {
  function setAttr(index, month) {
    return {
      children: month,
      value: index,
      style,
    };
  }
  return months.map((month, index) => (
    <option {...setAttr(index, month)} key={index} />
  ));
}

function setYears() {
  const startYear = 2020;
  const endYear = new Date().getFullYear();
  function yearRange() {
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index
    );
  }
  function setAttr(year) {
    return {
      children: year,
      value: year,
      style,
    };
  }
  return yearRange().map((year) => <option {...setAttr(year)} key={year} />);
}

function setInitParams() {
  const date = new Date();
  const initial = {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
  return initial;
}

function FilterDate() {
  const [searchParams, setSearchParams] = useSearchParams(setInitParams());
  const currentMonth = searchParams.get("month");
  const currentYear = searchParams.get("year");

  function changeParams(field, value) {
    setSearchParams((prev) => {
      prev.set(field, value);
      return prev;
    });
  }

  const selectMonths = {
    ...selectAttr,
    defaultValue: currentMonth,
    onChange: (e) => changeParams("month", e.target.value),
  };
  const selectYears = {
    ...selectAttr,
    defaultValue: currentYear,
    onChange: (e) => changeParams("year", e.target.value),
  };

  return (
    <>
      <Select {...selectMonths}>{setMonths()}</Select>
      <Select {...selectYears}>{setYears()}</Select>
    </>
  );
}

export default FilterDate;
