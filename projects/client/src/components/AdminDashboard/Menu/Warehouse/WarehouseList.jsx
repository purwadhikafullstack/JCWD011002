import {
  Button,
  useToast,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getWarehouseList } from "../../../../api/warehouse";
import axios from "axios";
import { getCityByProvince, getProvince } from "../../../../api/address";
import Pagination from "../Product/Pagination";
import FilterWarehouse from "./FilterWarehouse";
import DeleteWarehouse from "./DeleteWarehouse";
import WarehouseTable from "./WarehouseTable";
import UpdateWarehouse from "./UpdateWarehouse";
import CreateWarehouse from "./CreateWarehouse";
import Loading from "../../../Utility/Loading";



const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerCreateOpen, setIsDrawerCreateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [sort, setSort] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterProvince, setFilterProvince] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editedWarehouse, setEditedWarehouse] = useState({
    name: "",
    address: "",
    province: "",
    city_name: "",
    postal_code: "",
  });
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const API_WAREHOUSE = `${BASE_URL}/warehouse`;
  const handlePageChange = (newPage) => {
    setPage(newPage)
  }
  const fetchProvince = async () => {
    await getProvince(setProvince, toast)
  }

  const fetchCity = async () => {
    if (selectedProvinceId) {
      await getCityByProvince(selectedProvinceId, setCity, toast)
    }
  }

  useEffect(() => {
    fetchProvince();
  }, [])
  useEffect(() => {
    fetchCity();
  }, [selectedProvinceId])

  useEffect(() => {
    if (editedWarehouse.province) {
      const selectedProvince = province.find(
        (p) => p.province === editedWarehouse.province
      );

      if (selectedProvince) {
        setSelectedProvinceId(selectedProvince.province_id);
        setSelectedProvinceName(selectedProvince.province);
      }
    }
  }, [province, editedWarehouse, selectedWarehouse]);


  const handleSelectProvince = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(selectedId);
    setSelectedProvinceName(selectedName);
    // setCity([]);
    setEditedWarehouse({
      ...editedWarehouse,
      province: selectedName,
      city_name: "",
    });
  }

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const { data } = await getWarehouseList(toast, page, sort, name, search, filterProvince);
      setWarehouses(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  };

  const openEditDrawer = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setEditedWarehouse(warehouse);
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setSelectedWarehouse(null);
    setIsDrawerOpen(false);
  };

  const handleEditWarehouse = async () => {
    try {
      setIsLoading(true);
      const updatedData = {
        ...editedWarehouse,
        province: selectedProvinceName,
      };
      await axios.patch(
        `${API_WAREHOUSE}/${selectedWarehouse.id}`, updatedData, {
        headers,
      }
      )
      toast({
        title: "Warehouse Updated",
        description: "Warehouse data has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchWarehouses();
      closeEditDrawer();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while updating the warehouse data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, [page, sort, name, search, filterProvince]);

  const openDeleteModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteModalOpen(true);
  }
  const closeDeleteModal = () => {
    setSelectedWarehouse(null);
    setIsDeleteModalOpen(false);
  }

  const handleDeleteWarehouse = async () => {
    try {
      await axios.delete(
        `${API_WAREHOUSE}/${selectedWarehouse.id}`, {
        headers,
      }
      )
      toast({
        title: "Warehouse Deleted",
        description: "Warehouse data has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      fetchWarehouses();
      closeDeleteModal();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the warehouse data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleDrawerCreateOpen = () => {
    setEditedWarehouse({
      name: "",
      address: "",
      province: "",
      city_name: "",
      postal_code: "",
    })
    setIsDrawerCreateOpen(true);
  }

  const handleCreateWarehouse = async () => {
    try {
      setIsLoading(true);
      const createData = {
        ...editedWarehouse,
        province: selectedProvinceName,
      }
      await axios.post(
        `${API_WAREHOUSE}`, createData, {
        headers
      }
      )
      fetchWarehouses();
      setIsDrawerCreateOpen(false);
      toast({
        title: "Warehouse Created",
        description: "Warehouse data has been created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occurred while creating the warehouse data.",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Table content */}
      <Flex flexDirection={"column"} w={"full"} mt={4}>
        {/* {isLoading && <Loading />} */}
        <Flex justifyContent={"space-between"}>
          <Box>
            <Button bg={"darkBlue"} mb={4} color={"white"} onClick={handleDrawerCreateOpen}>Create Warehouse</Button>
          </Box>
          <FilterWarehouse
            sort={sort} setSort={setSort} search={search} setSearch={setSearch} searchInput={searchInput} setSearchInput={setSearchInput} name={name} setName={setName} province={filterProvince} setProvince={setFilterProvince} />
        </Flex>
        <WarehouseTable warehouses={warehouses} openEditDrawer={openEditDrawer} openDeleteModal={openDeleteModal} />
        {warehouses.length > 0 ? (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        ) : null}
      </Flex>
      {/* Edit Drawer */}
      <UpdateWarehouse isLoading={isLoading} city={city} isDrawerOpen={isDrawerOpen} closeEditDrawer={closeEditDrawer} handleEditWarehouse={handleEditWarehouse} province={province} selectedProvinceId={selectedProvinceId} handleSelectProvince={handleSelectProvince} editedWarehouse={editedWarehouse} setEditedWarehouse={setEditedWarehouse} />

      <DeleteWarehouse isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} handleDeleteWarehouse={handleDeleteWarehouse} />
      {/* Create Warehouse Drawer */}
      <CreateWarehouse isLoading={isLoading} isDrawerCreateOpen={isDrawerCreateOpen} setIsDrawerCreateOpen={setIsDrawerCreateOpen} handleCreateWarehouse={handleCreateWarehouse} province={province} selectedProvinceId={selectedProvinceId} handleSelectProvince={handleSelectProvince} editedWarehouse={editedWarehouse} setEditedWarehouse={setEditedWarehouse} city={city} />

    </>
  );
};

export default WarehouseList;
