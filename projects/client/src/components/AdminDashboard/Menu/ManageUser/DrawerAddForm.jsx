import { Button, Flex, Input, Select, Text, useToast } from "@chakra-ui/react";
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
const buttonAttr = {
  id: "add-admin-button",
  type: "submit",
  display: "none",
};

function getIndexValue(items, value) {
  return items.findIndex((item) => item?.name === value);
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

function renderOption(items) {
  return items.map((item) => <option {...setOption(item)} />);
}

function DrawerAddForm({ formik }) {
  const [roles, setRoles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const toast = useToast();

  function handleChange(event, field) {
    let { value } = event.target;
    if (field !== "email") value = parseInt(value);
    formik.setFieldValue(field, value);
  }

  const inputEmail = {
    placeholder: "Input Email",
    value: formik?.value?.email,
    onChange: (e) => handleChange(e, "email"),
    required: true,
  };
  const inputRole = {
    placeholder: "Select Role",
    textTransform: "capitalize",
    value: formik?.value?.id_role,
    onChange: (e) => handleChange(e, "id_role"),
    children: renderOption(roles),
    required: true,
  };
  const inputWarehouse = {
    placeholder: "Select Warehouse",
    textTransform: "capitalize",
    value: formik?.value?.id_warehouse,
    onChange: (e) => handleChange(e, "id_warehouse"),
    children: renderOption(warehouses),
    required: true,
  };

  async function fetchRoles() {
    const { data } = await getRoles(toast);
    setRoles(data);
  }

  async function fetchWarehouse() {
    const { data } = await getWarehouses(toast);
    setWarehouses(data);
  }

  function getRoleAdminWarehouse() {
    const adminIdx = getIndexValue(roles, "admin warehouse");
    const adminId = roles[adminIdx]?.id;
    return adminId;
  }

  function setContentWarehouse() {
    const adminId = getRoleAdminWarehouse();
    return formik?.values?.id_role !== 0 && formik?.values?.id_role === adminId;
  }

  useEffect(() => {
    fetchRoles();
    fetchWarehouse();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...mainContainer}>
        <Flex {...container}>
          <Text>Email</Text>
          <Input {...inputEmail} />
        </Flex>
        <Flex {...container}>
          <Text>Role</Text>
          <Select {...inputRole} />
        </Flex>
        {setContentWarehouse() && (
          <Flex {...container}>
            <Text>Warehouse</Text>
            <Select {...inputWarehouse} />
          </Flex>
        )}
        <Button {...buttonAttr} />
      </Flex>
    </form>
  );
}

export default DrawerAddForm;
