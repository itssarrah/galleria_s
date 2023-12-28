import React from "react";
import Filter from "../shop/Filter";
import Categories from "../shop/Categories";

import ShopCard from "../cards/ShopCard";

function UserFavoriteBiz() {
  return (
    <>
      <div className="flex items-start w-full h-full ">
        <Filter type="false" />
        <div className="w-fit  overflow-y-hidden flex flex-col  pt-8 ">
          <Categories />
          <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center">
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
            <ShopCard
              imageUrl=" https://i.pinimg.com/236x/fa/d1/24/fad124e64a371412a0743b72f636401b.jpg"
              title="Adelia co."
              likes="123k"
              rating="4.7"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFavoriteBiz;
