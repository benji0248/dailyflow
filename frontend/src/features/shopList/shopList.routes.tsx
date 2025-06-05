import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopListPage from "./components/ShopListPage";

const ShopListRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopListPage />} />
    </Routes>
  );
};
export default ShopListRoutes;