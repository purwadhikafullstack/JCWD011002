import { Tbody, Td, Tr } from "@chakra-ui/react";
import TransactionData from "./TransactionData";

function NotFound() {
  const container = {
    textAlign: "center",
    fontWeight: "semibold",
    colSpan: 6,
  };
  return (
    <Tr>
      <Td {...container}>Not Found</Td>
    </Tr>
  );
}

function TransactionList({ transactions, status }) {
  return (
    <Tbody>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <TransactionData transaction={transaction} status={status} key={index} />
        ))
      ) : (
        <NotFound />
      )}
    </Tbody>
  );
}

export default TransactionList;
