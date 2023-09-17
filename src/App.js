import { Nav } from "./components/navbar.jsx";
import { LandingPage } from "./components/Landingpage.jsx";
import {
  BackgroundAsset,
  BackgroundAssetTwo,
} from "./components/background.jsx";
import "./App.css";
import React from "react";
import { Businessauth } from "./components/auth/businessauth.jsx";
import  Shop from "./views/shop/shopItemsSorted.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
