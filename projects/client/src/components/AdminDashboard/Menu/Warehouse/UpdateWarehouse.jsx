import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody, Input, Button, Box, Text, useToast, Image, DrawerCloseButton, Select, Textarea } from '@chakra-ui/react'
import React from 'react'
import LoadingBar from '../../../Utility/LoadingBar';

const UpdateWarehouse = ({ city, isDrawerOpen, closeEditDrawer, handleEditWarehouse, province, selectedProvinceId, handleSelectProvince, editedWarehouse, setEditedWarehouse, isLoading }) => {
  return (
    <>
      <Drawer isOpen={isDrawerOpen} onClose={closeEditDrawer}>
        <DrawerOverlay>
          <DrawerContent bg={"secondary"} color={"white"}>
            <DrawerCloseButton />
            <DrawerHeader>Edit Warehouse</DrawerHeader>
            <DrawerBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditWarehouse();
                }}
              >
                <Input my={2}
                  placeholder="Name"
                  value={editedWarehouse.name}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      name: e.target.value,
                    })
                  }
                />

                <Select my={2} name="province" value={selectedProvinceId} onChange={handleSelectProvince}>
                  {province.map((province) => (
                    <option style={{ color: "white", backgroundColor: "#233947" }} key={province.province_id} value={province.province_id}>{province.province}</option>
                  ))}
                </Select>
                <Select my={4} isDisabled={!selectedProvinceId} placeholder={selectedProvinceId ? "select city" : editedWarehouse.city_name} name="city_name" value={editedWarehouse.city_name} onChange={(e) => setEditedWarehouse({ ...editedWarehouse, city_name: e.target.value })} >
                  {city.map((city) => (
                    <option style={{ color: "white", backgroundColor: "#233947" }} key={city.city_id} value={city.city_name}>{city.city_name}</option>
                  ))}
                </Select>
                <Textarea mb={4}
                  placeholder="Address"
                  value={editedWarehouse.address}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      address: e.target.value,
                    })
                  }
                />
                <Input mb={4}
                  placeholder="Postal Code"
                  value={editedWarehouse.postal_code}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      postal_code: e.target.value,
                    })
                  }
                />
                <Box w={"85%"} position={"absolute"} bottom={0}>
                  <Button w={"full"} colorScheme="green" mb={3} type="submit" isLoading={isLoading} loadingText="Saving...">Save</Button>
                  <br />
                  <Button w={"full"} mb={3} onClick={closeEditDrawer}>Cancel</Button>
                </Box>
              </form>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
        {isLoading && <LoadingBar />}
      </Drawer>
    </>
  )
}

export default UpdateWarehouse