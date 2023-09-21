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

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./i18n";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language == "ar";
  return (
    <div className={isArabic ? "text-right" : "text-left"}>
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
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
