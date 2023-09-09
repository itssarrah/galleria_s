import { Navbar } from "./components/navbar.jsx";
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
      <Navbar />
      <BackgroundAsset position="top-left" />
      <BackgroundAsset position="rotated-right" />
      <BackgroundAssetTwo position="top-right" />
      <LandingPage />
    </div>
  );
}

export default App;
