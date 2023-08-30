import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./Pages/Category";
import Home from "./Pages/Home";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import Users from "./Pages/Users";
import BaseLayout from "./layout/index";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <BaseLayout />

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/category" Component={Category} />
          <Route path="/product" Component={Product} />
          <Route path="/users" Component={Users} />
          <Route path="/orders" Component={Orders} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
