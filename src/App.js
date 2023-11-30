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
import UserAccountPage from "./views/userAccount/userAccountPage.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./i18n";
import UserAuth from "./components/auth/userauth.jsx";
import Choice from "./components/auth/Choice.jsx";
import Login from "./components/auth/Login.jsx";

function MainContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/choice" && <Nav />}
      <BackgroundAsset position="top-left" />
      <BackgroundAssetTwo position="top-right" />
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/businessregistration" element={<Businessauth />} />
          <Route path="/userregistration" element={<UserAuth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

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

            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/product" element={<ProductPage />}></Route>
            <Route path="/user/:userId" element={<UserAccountPage />}></Route>
          </Routes>
        </div>
      </div>

      

    </Router>
  );
}

export default App;
