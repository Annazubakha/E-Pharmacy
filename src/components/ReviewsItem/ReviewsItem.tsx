import { Review } from "../../redux/reviews/slice";

interface ReviewProps {
  review: Review;
}

export const ReviewsItem: React.FC<ReviewProps> = ({ review }): JSX.Element => {
  return (
    <li className="relative bg-white second rounded-[27px] text-center px-[16px] pb-[32px] pt-[54px] md:w-[344px] border-[1px] border-white-text lg:w-[376px]">
      <img
        src={review.imageUrl}
        alt="Users photo"
        className=" absolute w-[64px] h-[64px] top-[-32px] right-[135px] md:right-[140px] lg:right-[156px]"
      />
      <p className="text-[20px] leading-[1.5] font-semibold mb-[16px] text-my-black">
        {review.name}
      </p>
      <p className="text-[16px] leading-[1.25]  text-gris-dark">
        {review.testimonial}
      </p>
    </li>
  );
};
