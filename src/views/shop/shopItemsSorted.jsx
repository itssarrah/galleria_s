import React from "react";

import navbar from "../../components/navbar"
import Hero from "../../components/shop/Hero"
import Footer from "../../components/Footer";
import Body from "../../components/shop/Body";
    

const Shop = () => {
    return (
        <div className="overflow-hidden">
            <navbar/>
            <Hero/>
            <Body/>
            <Footer/>
        </div>
    )
}
export default Shop


