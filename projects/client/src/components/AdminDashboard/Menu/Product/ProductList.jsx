import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Table, TableContainer, Thead, Th, Tbody, Tr, Td, Img, Text, Center, } from '@chakra-ui/react'
import axios from 'axios'
import DetailProduct from './ProductDetail'
import CreateProduct from './CreateProduct'
import FilterProducts from './FilterProduct'
import Pagination from './Pagination'
import EditStockDrawer from './StockDetail'
import { getRole } from '../../../../helpers/Roles'
import ProductTable from './ProductTable'
const ProductList = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [sort, setSort] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isDetailStockOpen, setIsDetailStockOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDrawerCreateOpen, setIsDrawerCreateOpen] = useState(false)
  const role = getRole()
  const handleCreateClick = () => {
    setIsDrawerCreateOpen(true)
  }
  const handleCloseCreate = () => {
    setIsDrawerCreateOpen(false)
  }
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/admin`, {
        params: {
          search: search || '',
          id_category: categoryId,
          price,
          sort,
          name,
          status,
          page,
          limit,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      setProducts(data.data.data)
      setTotalPages(data.data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search, searchInput, categoryId, price, sort, name, status, page, limit])

  const handleDetailClick = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      setSelectedProduct(data.data)
      if (isDetailStockOpen === true) {
        setIsDetailOpen(false)
      } else {
        setIsDetailOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
  }

  const handleDetailStock = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedProduct(data.data);
      setIsDetailStockOpen(true);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex flexDirection={"column"} w={"full"} mt={4}>
        {role === "admin" &&
          <Box>
            <Button onClick={handleCreateClick} bg={"darkBlue"} mb={4} color={"white"} >Create Product</Button>
          </Box>
        }
        <Box>
          <FilterProducts
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            price={price}
            setPrice={setPrice}
            sort={sort}
            setSort={setSort}
            name={name}
            setName={setName}
            status={status}
            setStatus={setStatus}
            fetchProducts={fetchProducts}
            search={search}
            setSearch={setSearch}
          />
        </Box>
        <ProductTable products={products} handleDetailClick={handleDetailClick} handleDetailStock={handleDetailStock} />
        {products.length === 0 && (
          <Center mt={10}>
            <Text>Product not found</Text>
          </Center>
        )}
        <DetailProduct isOpen={isDetailOpen} onClose={handleCloseDetail} product={selectedProduct} fetchProduct={fetchProducts} />
        <CreateProduct isOpen={isDrawerCreateOpen} onClose={handleCloseCreate} fetchProducts={fetchProducts} />
        <EditStockDrawer isOpen={isDetailStockOpen} onClose={() => setIsDetailStockOpen(false)} products={selectedProduct} fetchProducts={fetchProducts} fetchDetailStock={handleDetailStock} />
        {products.length > 0 ? (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        ) : null}

      </Flex>

    </>
  )
}

export default ProductList