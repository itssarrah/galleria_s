import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Stars from "./Stars";

// css
import "./product.css";

const ReviewCard = ({ username, userPicture, title, description, rating }) => {
  return (
    <div className="review-card flex flex-col justify-around">
      <div className="flex gap-3 items-center">
        <img
          src={userPicture}
          alt="user"
          className="w-10 aspect-square rounded-full inline-block"
        />
        <span className="text-md font-bold">{username}</span>
      </div>
      <div>
        <h2 className="font-bold text-xl my-3">{title}: </h2>
        <p className="text-xl">{description}</p>
      </div>

      <Stars average={rating} />
    </div>
  );
};

const Reviews = ({
  _reviews = [
    {
      username: "@Bahdja_mesers",
      userPicture: "/images/cardseller.png",
      title: "Produit excellent mais long a arriver",
      description:
        "Sed interdum ut scelerisque lectus dui diam semper massa scelerisque. Elit amet quis at rhoncus aliquet dui pretium ut. In ac ut enim sed ultrices.",
      rating: 4,
    },
  ],
}) => {
  const [reviews, setReviews] = React.useState(_reviews);
  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="pl-[4rem]">
        <h2 className="product-title">Top Reviews</h2>
        <p className="text-md text-[#666666]">Swipe to see more reviews!</p>
      </div>

      <Splide>
        <SplideSlide>
          <ReviewCard {...reviews[currentReviewIndex]} />
        </SplideSlide>
        <SplideSlide>
          <ReviewCard {...reviews[currentReviewIndex]} />
        </SplideSlide>
        <SplideSlide>
          <ReviewCard {...reviews[currentReviewIndex]} />
        </SplideSlide>
        <SplideSlide>
          <ReviewCard {...reviews[currentReviewIndex]} />
        </SplideSlide>
        <SplideSlide>
          <ReviewCard {...reviews[currentReviewIndex]} />
        </SplideSlide>
        <SplideSlide>
          <ReviewCard {...reviews[currentReviewIndex]} />
        </SplideSlide>
      </Splide>
      <div className="link self-center text-sm"> See All </div>
    </div>
  );
};

export default Reviews;
