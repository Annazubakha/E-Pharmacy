import { ReviewsList } from "../index";
import { Review } from "../../redux/reviews/slice";

export interface ReviewsProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsProps> = ({
  reviews,
}): JSX.Element => {
  return (
    <section className="section container">
      <h2 className="text-[28px] text-center leading-[1.14] font-semibold mb-[14px] text-my-black md:text-[40px] md:leading-[1.2]">
        Reviews
      </h2>
      <p className="text-[14px] text-center leading-[1.29]  mb-[64px] text-gris-dark md:text-[16px] md:leading-[1.25] md:mb-[88px]">
        Search for Medicine, Filter by your location
      </p>
      <ReviewsList reviews={reviews} />
    </section>
  );
};
