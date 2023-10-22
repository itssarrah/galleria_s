import { Nav } from "./components/navbar.jsx";
import { LandingPage } from "./components/Landingpage.jsx";
import {
  BackgroundAsset,
  BackgroundAssetTwo,
} from "./components/background.jsx";
import "./App.css";
import React from "react";
import { Businessauth } from "./components/auth/businessauth.jsx";
import Shop from "./views/shop/shopItemsSorted.jsx";
import ProductPage from "./views/product/ProductPage.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./i18n";
import UserAuth from "./components/auth/userauth.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <BackgroundAsset position="top-left" />
        <BackgroundAssetTwo position="top-right" />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route
              path="/businessregistration"
              element={<Businessauth />}
            ></Route>
            <Route path="/userregistration" element={<UserAuth />}></Route>

            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/product" element={<ProductPage/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
