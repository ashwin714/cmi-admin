import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import AdminLayout from "../Layout/AdminLayout";
import Login from "../Modules/Auth/Login";
import ProductList from "../Modules/Product/ProductList";
import OrderListPage from "../Modules/Order/OrderList";
import ProductDetails from "../Modules/Product/ProductDetails";
import AddProduct from "../Modules/Product/AddProduct";
import OrderDetails from "../Modules/Order/OrderDetails";

const RoutingPath = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />}></Route>
      </Route>
      <Route path="/cmi" element={<AdminLayout />}>
        <Route index element={<ProductList />}></Route>
        <Route path="/cmi/addProduct" element={<AddProduct />} />
        <Route path="/cmi/editProduct/:id" element={<AddProduct />} />
        <Route path="/cmi/productDetails/:id" element={<ProductDetails />} />
        <Route
          path="/cmi/order/productDetails/:id/:orderId"
          element={<ProductDetails />}
        />
        <Route path="/cmi/order" element={<OrderListPage />}></Route>
        <Route path="/cmi/orderDetails/:id" element={<OrderDetails />}></Route>
      </Route>
    </Routes>
  );
};

export default RoutingPath;
