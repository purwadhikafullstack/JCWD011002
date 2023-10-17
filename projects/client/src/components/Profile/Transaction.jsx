import React from "react";
import TransactionList from "../../pages/TransactionList";
import { Box } from "@chakra-ui/react";
const Transaction = () => {
  return (
    <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
      <TransactionList />
    </Box>
  );
};

export default Transaction;
