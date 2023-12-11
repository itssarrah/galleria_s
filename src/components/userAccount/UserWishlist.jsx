import React from "react";
import Filter from "../shop/Filter";
import Categories from "../shop/Categories";
import { Card } from "../Landingpage";
function UserWishlist() {
  return (
    <div className="flex items-start w-full  ">
      <Filter type="false" />
      <div className="w-fit overflow-x-hidden flex flex-col  pt-8 ">
        <Categories />
        <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center">
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
          <Card
            itemUrl="https://i.pinimg.com/236x/3b/7c/04/3b7c049360ca7983362ee19ba1453d6a.jpg"
            sellerUrl="https://i.pinimg.com/236x/52/61/47/526147daeabbdc27ef514e879afbcd13.jpg"
            title="Saddle bag"
            basePrice="1500.00"
            isOnSale={true}
            salePrice="1200.00"
            isLiked={false}
            seller="Amore Co."
          />
        </div>
      </div>
    </div>
  );
}

export default UserWishlist;
