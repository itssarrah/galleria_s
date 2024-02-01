import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LandingPage } from "./components/Landingpage.jsx";
import {
  BackgroundAsset,
  BackgroundAssetTwo,
} from "./components/background.jsx";
import "./App.css";
import { Businessauth } from "./components/auth/businessauth.jsx";
import Shop from "./views/shop/shopItemsSorted.jsx";
import ProductPage from "./views/product/ProductPage.jsx";
import AddProduct from "./views/product/addProduct.jsx";
import UserAccountPage from "./views/userAccount/userAccountPage.jsx";

import UserWishlist from "./components/userAccount/UserWishlist.jsx";
import UserFeedback from "./components/userAccount/UserFeedback.jsx";
import UserFavoriteBiz from "./components/userAccount/UserFavoriteBiz.jsx";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./i18n.js";
import UserAuth from "./components/auth/userauth.jsx";
import Choice from "./components/auth/Choice.jsx";
import Login from "./components/auth/Login.jsx";
import BusinessesProfile from "./views/Profile/BusinessProfile.jsx";
import ItemsOnSale from "./components/businessProfile/ItemsOnSale.jsx";
import Insights from "./components/businessProfile/Insights.jsx";
import FeedbackAndReviews from "./components/businessProfile/FeedbackAndReviews.jsx";
import AppLayout from "./components/ui/AppLayout.jsx";

const queryClient = new QueryClient();

function MainContent() {
  return (
    <div className="App">
      <BackgroundAsset position="top-left" />
      <BackgroundAssetTwo position="top-right" />
      {/* <div className="content"> */}

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />

            <Route path="/home" element={<LandingPage />} />
            <Route path="/shop" element={<Shop />} />
          </Route>
          <Route path="/businessregistration" element={<Businessauth />} />
          <Route path="/userregistration" element={<UserAuth />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/businessprofile" element={<BusinessesProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<AddProduct />} />
          {/* <Route path="/user/:userId" element={<UserAccountPage />}></Route> */}
          {/* Inside App component */}
          <Route path="/profile" element={<UserAccountPage />}>
            <Route index element={<UserWishlist />} />
            <Route path="fav-biz" element={<UserFavoriteBiz />} />
            <Route path="feedback" element={<UserFeedback />} />
          </Route>
          <Route path="/business/:id" element={<BusinessesProfile />}>
            <Route index element={<ItemsOnSale />} />
            <Route path="insights" element={<Insights />} />
            <Route path="feedback" element={<FeedbackAndReviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
    </QueryClientProvider>
  );
}

export default App;
