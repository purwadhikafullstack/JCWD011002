import { Button, Flex, Select, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getRoles } from "../../../../api/admin";
import { getWarehouses } from "../../../../api/warehouse";

const mainContainer = {
  direction: "column",
  gap: "12px",
};
const container = {
  direction: "column",
  gap: "8px",
};

function getIndexValue(items, value) {
  return items.findIndex((item) => item?.name === value);
}

function setDefaultValue(items, value) {
  const idx = getIndexValue(items, value);
  return items[idx]?.id;
}

function setOption(item) {
  return {
    value: item?.id,
    key: item?.id,
    children: item?.name,
    style: {
      textTransform: "capitalize",
      backgroundColor: "#233947",
    },
  };
}

function DrawerEdit({ data, formik }) {
  const { user, warehouse: defaultWarehouse } = data;
  const [roles, setRoles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const toast = useToast();

  async function fetchRoles() {
    const { data } = await getRoles(toast);
    setRoles(data);
    const value = setDefaultValue(data, user?.role?.name);
    formik.setFieldValue("role", value);
    if (user?.role?.name === "admin") formik.setFieldValue("warehouse", 0);
  }

  async function fetchWarehouses() {
    const { data } = await getWarehouses(toast);
    setWarehouses(data);
    const value = setDefaultValue(data, defaultWarehouse?.name);
    formik.setFieldValue("warehouse", value);
  }

  function getRoleAdmin() {
    const adminIdx = getIndexValue(roles, "admin");
    const adminId = roles[adminIdx]?.id;
    return adminId;
  }

  function setContentWarehouse() {
    const adminId = getRoleAdmin();
    return formik?.values?.role !== 0 && formik?.values?.role !== adminId;
  }

  function handleChange(event, field) {
    const value = parseInt(event.target.value);
    formik.setFieldValue(field, value);
    if (field === "role") {
      if (value === getRoleAdmin()) formik.setFieldValue("warehouse", 0);
    }
  }

  useEffect(() => {
    fetchRoles();
    fetchWarehouses();
  }, []);

  const selectRolesAttr = {
    textTransform: "capitalize",
    value: formik?.values?.role,
    cursor: "pointer",
    onChange: (e) => handleChange(e, "role"),
  };
  const selectWarehousesAttr = {
    textTransform: "capitalize",
    value: formik?.values?.warehouse,
    placeholder: "Select Warehouse",
    cursor: "pointer",
    onChange: (e) => handleChange(e, "warehouse"),
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...mainContainer}>
        <Flex {...container}>
          <Text fontWeight={"semibold"}>Role</Text>
          <Select {...selectRolesAttr}>
            {roles.map((role) => (
              <option {...setOption(role)}/>
            ))}
          </Select>
        </Flex>
        {setContentWarehouse() && (
          <Flex {...container}>
            <Text fontWeight={"semibold"}>Warehouse</Text>
            <Select
              {...selectWarehousesAttr}
              required={true}
              _placeholder={{ hidden: true }}
            >
              {/* <option value="" disabled selected hidden={true}>Select </option> */}
              {warehouses.map((warehouse) => (
                <option {...setOption(warehouse)}/>
              ))}
            </Select>
          </Flex>
        )}
        <Button id="save-button" type="submit" display="none" />
      </Flex>
    </form>
  );
}

export default DrawerEdit;
