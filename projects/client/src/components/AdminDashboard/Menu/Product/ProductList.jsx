import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Spacer, Icon, } from '@chakra-ui/react'
import axios from 'axios'
import DetailProduct from './ProductDetail'
import CreateProduct from './CreateProduct'
import FilterProducts from './FilterProduct'
import Pagination from './Pagination'
import EditStockDrawer from './StockDetail'
import { getRole } from '../../../../helpers/Roles'
import ProductTable from './ProductTable'
import { AddIcon } from '@chakra-ui/icons'
const ProductList = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sort, setSort] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
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
          search,
          id_category: categoryId,
          sort,
          status,
          page: search ? null : page,
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
  }, [search, categoryId, sort, status, page, limit])

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
            <Button onClick={handleCreateClick} bg={"darkBlue"} color={"white"} _hover={{ bg: "editSecondary" }} ><Icon as={AddIcon} mr={2} boxSize={"12px"} /> Create Product</Button>
          </Box>
        }
        <Box>
          <FilterProducts
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            sort={sort}
            setSort={setSort}
            status={status}
            setStatus={setStatus}
            fetchProducts={fetchProducts}
            search={search}
            setSearch={setSearch}
          />
        </Box>
        <ProductTable products={products} handleDetailClick={handleDetailClick} handleDetailStock={handleDetailStock} />
        <DetailProduct isOpen={isDetailOpen} onClose={handleCloseDetail} product={selectedProduct} fetchProduct={fetchProducts} />
        <CreateProduct isOpen={isDrawerCreateOpen} onClose={handleCloseCreate} fetchProducts={fetchProducts} />
        <EditStockDrawer isOpen={isDetailStockOpen} onClose={() => setIsDetailStockOpen(false)} products={selectedProduct} fetchProducts={fetchProducts} fetchDetailStock={handleDetailStock} />
        <Spacer />

        {products.length > 0 ? (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        ) : null}

      </Flex>

    </>
  )
}

export default ProductList