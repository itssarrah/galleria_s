import React from "react";
import "../css/background.css";

function BackgroundAsset({ position }) {
  return <div className={`bg-asset w-1/4  ${position} `}></div>;
}

function BackgroundAssetTwo({ position }) {
  return <div className={`bg-asset2  ${position} `}></div>;
}

export { BackgroundAsset, BackgroundAssetTwo };
