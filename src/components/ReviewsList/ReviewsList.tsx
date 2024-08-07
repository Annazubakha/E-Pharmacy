import { useWindowSizeHook } from "../../helpers";
import { ReviewsItem } from "../index";
import { ReviewsProps } from "../ReviewsSection/ReviewsSection";

export const ReviewsList: React.FC<ReviewsProps> = ({
  reviews,
}): JSX.Element => {
  const size = useWindowSizeHook().innerWidth;
  let visibleReviews;

  if (size < 768) {
    visibleReviews = reviews.slice(0, 1);
  } else if (size < 1440) {
    visibleReviews = reviews.slice(0, 2);
  } else {
    visibleReviews = reviews;
  }
  return (
    <ul className="md:flex gap-[16px] lg:gap-[28px]">
      {visibleReviews?.map((review) => (
        <ReviewsItem key={review._id} review={review} />
      ))}
    </ul>
  );
};
