import React, { useState } from 'react'
import ReqMutationFrom from './ReqMutationFrom'
import ReqMutationTo from './ReqMutationTo'
import AllMutation from './AllMutation'
import { Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import jwtDecode from 'jwt-decode'
const MutationList = () => {
  const decode = jwtDecode(localStorage.getItem('token'))
  const role = decode.role
  return (
    <>
      <Tabs w={"full"} isFitted variant='enclosed'>
        <TabList>
          {role === "admin warehouse" && <Tab _selected={{ color: 'white', bg: 'darkBlue' }}>Mutation To Your Warehouse</Tab>}
          {role === "admin warehouse" && <Tab _selected={{ color: 'white', bg: 'darkBlue' }}>Your Request Mutation</Tab>}
          <Tab _selected={{ color: 'white', bg: 'darkBlue' }}>All Mutation</Tab>
        </TabList>
        <TabPanels>
          {role === "admin warehouse" &&
            <TabPanel>
              <ReqMutationFrom />
            </TabPanel>
          }
          {role === "admin warehouse" &&
            <TabPanel>
              <ReqMutationTo />
            </TabPanel>
          }
          <TabPanel>
            <AllMutation />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default MutationList