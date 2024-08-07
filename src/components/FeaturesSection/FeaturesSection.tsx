import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import features from "../../data/features.json";
import { Icon } from "../index";

export const FeaturesSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    arrows: false,
    autoplaySpeed: 0,
    cssEase: "linear",
    draggable: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  return (
    <div className="slider-custom">
      <Slider {...settings}>
        {features.map(({ id, feature }) => (
          <li
            className="slider-item-custom flex gap-[8px] items-center text-[14px] leading-[1.29] font-semibold tracking-[-0.02em] text-my-black"
            key={id}
          >
            <Icon id="lightning" size={20} />
            {feature}
          </li>
        ))}
      </Slider>
    </div>
  );
};
