import { Drawer, FormControl, FormLabel, Input, Select, DrawerBody, DrawerCloseButton, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Button, Box, Textarea } from '@chakra-ui/react';
import React from 'react'
import LoadingBar from '../../../Utility/LoadingBar';

const CreateWarehouse = ({ isDrawerCreateOpen, setIsDrawerCreateOpen, handleCreateWarehouse, province, selectedProvinceId, editedWarehouse, setEditedWarehouse, city, handleSelectProvince, isLoading }) => {
  return (
    <Drawer isOpen={isDrawerCreateOpen} onClose={() => setIsDrawerCreateOpen(false)}>
      <DrawerOverlay>
        <DrawerContent bg={"secondary"} color={"white"}>
          <DrawerCloseButton />
          <DrawerHeader>Create Warehouse</DrawerHeader>
          <DrawerBody>
            {/* Isi form untuk membuat gudang baru di sini */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateWarehouse(editedWarehouse);
              }}
            >
              <FormControl mb={2}>
                <FormLabel>Name :</FormLabel>
                <Input
                  placeholder="Name"
                  value={editedWarehouse.name}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Province :</FormLabel>
                <Select
                  placeholder={selectedProvinceId ? "Select Province" : "Province"}
                  name="province"
                  value={selectedProvinceId}
                  onChange={handleSelectProvince}
                >
                  {province.map((province) => (
                    <option style={{ color: "white", backgroundColor: "#233947" }}
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>City :</FormLabel>
                <Select
                  isDisabled={!selectedProvinceId}
                  placeholder={
                    selectedProvinceId
                      ? "Select City"
                      : "City"
                  }
                  name="city_name"
                  value={editedWarehouse.city_name}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      city_name: e.target.value,
                    })
                  }
                >
                  {city.map((city) => (
                    <option style={{ color: "white", backgroundColor: "#233947" }}
                      key={city.city_id}
                      value={city.city_name}
                    >
                      {city.city_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Full Address :</FormLabel>
                <Textarea
                  placeholder="Address"
                  value={editedWarehouse.address}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      address: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Postal Code :</FormLabel>
                <Input
                  placeholder="Postal Code"
                  value={editedWarehouse.postal_code}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      postal_code: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Box w={"85%"} position={"absolute"} bottom={5}>
                <Button w={"full"} mb={2} colorScheme="green" type="submit" isLoading={isLoading} loadingText="Creating...">Create</Button>
                <br />
                <Button w={"full"} onClick={() => setIsDrawerCreateOpen(false)}>Cancel</Button>
              </Box>
            </form>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
      {isLoading && <LoadingBar />}
    </Drawer>
  )
}

export default CreateWarehouse