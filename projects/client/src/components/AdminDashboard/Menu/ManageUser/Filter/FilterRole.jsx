import { Select } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const roles = [
  { name: "All Roles", id: 0 },
  { name: "User", id: 1 },
  { name: "Admin", id: 2 },
  { name: "Admin Warehouse", id: 3 },
];

function setFilter() {
  function setAttr(role) {
    return {
      children: role?.name,
      value: role?.id,
      style: {
        backgroundColor: "#2D2D2D",
      },
    };
  }
  return roles.map((role, index) => <option {...setAttr(role)} key={index} />);
}

function FilterRoles() {
  const [searchParams, setSearchParams] = useSearchParams({});

  function onChange(event) {
    const { value } = event.target;
    setSearchParams((prev) => {
      prev.set("role", value);
      return prev;
    });
  }

  const statusAttr = {
    w: "fit-content",
    defaultValue: 0,
    onChange,
  };

  return <Select {...statusAttr}>{setFilter()}</Select>;
}

export default FilterRoles;
