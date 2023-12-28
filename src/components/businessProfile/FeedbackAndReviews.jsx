import ReviewCard from "../reviews/ReviewCard";

const FeedbackAndReviews = () => (
  <div className="grid grid-cols-1 gap-3 justify-center items-center lg:grid-cols-2">
    {[...Array(8)].map((_) => (
      <ReviewCard />
    ))}
  </div>
);

export default FeedbackAndReviews;
