import { Navbar, Nav } from "./components/navbar.jsx";
import { LandingPage } from "./components/Landingpage.jsx";
import {
  BackgroundAsset,
  BackgroundAssetTwo,
} from "./components/background.jsx";
import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <Nav />
      <BackgroundAsset position="top-left" />
      <BackgroundAssetTwo position="top-right" />
      <LandingPage />
    </div>
  );
}

export default App;
