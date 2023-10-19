import React from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  VStack,
  HStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="primary" zIndex={999} p={4} w={"full"}>
      <Flex
        justify="space-between"
        align="center"
        direction={["column", "row"]}
      >
        <VStack spacing={2} textAlign={["center", "left"]}>
          <Text fontSize="lg" fontWeight="bold">
            Sitemap
          </Text>
          <Link href="/">Beranda</Link>
          <Link href="/produk">Produk</Link>
          <Link href="/tentang">Tentang Kami</Link>
          <Link href="/kontak">Kontak</Link>
        </VStack>
        <HStack spacing={4}>
          <Link href="https://www.facebook.com">
            <Icon as={FaFacebook} boxSize={6} />
          </Link>
          <Link href="https://www.twitter.com">
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
          <Link href="https://www.instagram.com">
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
        </HStack>
        <Image src="/logo.png" alt="Logo Perusahaan" boxSize={16} />
      </Flex>
    </Box>
  );
};

export default Footer;
