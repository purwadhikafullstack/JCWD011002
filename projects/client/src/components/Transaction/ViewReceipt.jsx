import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Badge,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const ViewReceipt = ({ transactionId }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [path, setPath] = useState("");

  const fetchReceipt = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/receipt/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPath(response.data.receipt);
    } catch (error) {
      console.error("Error fetching receipt:", error);
    }
  };
  useEffect(() => {
    fetchReceipt();
  }, []);

  const getImage = (path) => {
    if (!path) return "";
    // path = path.replaceAll("\\", "/");
    return `${API_URL}/${path}`;
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Badge cursor={"pointer"} color={"black"} alignSelf={"center"}>
          RECEIPT
        </Badge>
      </PopoverTrigger>
      <PopoverContent color="black">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontWeight={"bold"}>RECEIPT</Text>
        </PopoverHeader>
        <PopoverBody>
          <Text mb={1} color={"gray"} fontSize={"xs"}>
            MWECG2/ID/TXN{transactionId}
          </Text>
          <Image src={getImage(path)} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ViewReceipt;
