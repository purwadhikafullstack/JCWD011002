import { Route, Routes } from "react-router-dom";
import { Flex, useToast } from "@chakra-ui/react";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import NavUser from "./components/Navbar/NavUser";
import Profile from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import UserAddress from "./pages/UserAddress";
import AdminDashboard from "./pages/AdminDashboard";
import { getRole } from "./helpers/Roles";
import { useEffect, useState } from "react";
import UserProfile from "./components/Profile/UpdateProfile";
import { getUser } from "./api/profile";
import Transaction from "./components/Profile/Transaction";
import ProductCategory from "./components/AdminDashboard/Menu/ProductCategory/ProductCategory";
import ProductList from "./components/AdminDashboard/Menu/Product/ProductList";
import ManageUsers from "./components/AdminDashboard/Menu/ManageUser";
import WarehouseList from "./components/AdminDashboard/Menu/Warehouse/WarehouseList";
import ProductDetail from "./pages/ProductDetail";
import Report from "./pages/Report";
import Dashboard from "./components/AdminDashboard/Menu/Dashboard";
import MutationList from "./components/AdminDashboard/Menu/Mutation/MutationList";
import ManageOrder from "./components/AdminDashboard/Menu/ManageOrder";


const ADMIN_PATH = ["/", "/category", "/profile"];

const ADMIN = ["admin", "admin warehouse"];

const mainContainerAttr = {
  w: "100vw",
  pt: "64px",
  color: "textPrimary",
  direction: "column",
};

const contentContainerAttr = {
  w: "100vw",
  minH: "calc(100vh - 64px - 187px)",
};

function setPage() {
  if (ADMIN.includes(getRole())) return <AdminDashboard />;
  return <HomePage />;
}

function adminPath() {
  const role = getRole();
  const currentPath = document.location.pathname;
  if (ADMIN.includes(role) && !ADMIN_PATH.includes(currentPath))
    document.location.href = "/";
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    adminPath();
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  if (!isLoading)
    return (
      <Flex {...mainContainerAttr}>
        <NavUser />
        <Flex {...contentContainerAttr}>
          <Routes>
            <Route path="/" element={setPage()}>
              <Route path="" element={<Dashboard />} />
              <Route path="user" element={<ManageUsers />} />
              <Route path="warehouse" element={<WarehouseList />} />
              <Route path="category" element={<ProductCategory />} />
              <Route path="product" element={<ProductList />} />
              <Route path="stockmutation" element={<MutationList />} />
              <Route path="order" element={<ManageOrder />} />
              <Route path="report" element={<Report />} />
            </Route>
            <Route path="/registration/:token" element={<Registration />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="" element={<UserProfile />} />
              <Route path="address" element={<UserAddress />} />
              <Route path="transaction" element={<Transaction />} />
            </Route>
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category" element={<ProductCategory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Flex>
        <Footer />
      </Flex>
    );
}

export default App;
