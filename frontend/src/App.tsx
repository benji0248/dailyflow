import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import ShopListRoutes from "./features/shopList/shopList.routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {ShopListRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
