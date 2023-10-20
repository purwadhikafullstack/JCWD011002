import { Select, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getWarehouses } from "../../../../../api/warehouse";
import { useSearchParams } from "react-router-dom";

function setFilter(warehouses) {
  function setAttr(warehouse) {
    return {
      children: warehouse?.name,
      value: warehouse?.id,
      style: {
        backgroundColor: "#2D2D2D",
      },
    };
  }
  return warehouses.map((warehouse, index) => (
    <option {...setAttr(warehouse)} key={index} />
  ));
}

function FilterWarehouse() {
  const [warehouses, setWarehouses] = useState([{ name: "All Warehouse", id: 0 }]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const toast = useToast();

  async function fetchWarehouse() {
    const { data } = await getWarehouses(toast);
    setWarehouses([...warehouses, ...data]);
  }

  useEffect(() => {
    fetchWarehouse();
  }, []);

  function onChange(event) {
    const { value } = event.target;
    setSearchParams((prev) => {
      prev.set("warehouse", value);
      return prev;
    });
  }

  const statusAttr = {
    w: "fit-content",
    defaultValue: 0,
    onChange,
  };

  return <Select {...statusAttr}>{setFilter(warehouses)}</Select>;
}

export default FilterWarehouse;
