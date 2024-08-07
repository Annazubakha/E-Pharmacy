import { NavLink } from "react-router-dom";
import { Icon } from "../index";
import { useWindowSizeHook } from "../../helpers";

import Img1 from "../../assets/images/logo/logowhite_mobile@1x.png";
import Img2 from "../../assets/images/logo/logowhite_mobile@2x.png";
import Img3 from "../../assets/images/logo/logowhite_tablet@1x.png";
import Img4 from "../../assets/images/logo/logowhite_tablet@2x.png";

export const Footer = (): JSX.Element => {
  const size = useWindowSizeHook();
  return (
    <footer className="relative bg-my-green text-[14px] text-my-white leading-[1.29] py-[20px] container mt-auto md:py-[32px] w-full lg:py-[40px]">
      <div className="gap-[12px] mb-[20px] flex items-center md:gap-[14px]">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={`${Img3} 1x, ${Img4} 2x`}
            type="image/png"
          />
          <img srcSet={`${Img1} 1x, ${Img2} 2x`} alt="Logo" />
        </picture>
        <p className="text-[16px] tracking-[-0.03em] font-semibold md:text-[20px]">
          E-Pharmacy
        </p>
      </div>
      <p className="mb-[40px] md:mb-[120px] md:text-[14px] md:leading-[1.25] w-[261px] lg:mb-[104px]">
        Get the medicine to help you feel better, get back to your active life,
        and enjoy every moment.
      </p>
      <nav className="flex gap-[32px] mb-[100px]  font-semibold md:absolute top-[41px] right-[32px] lg:top-[40px] lg:right-[554px] lg:gap-[50px] md:mb-0">
        <NavLink to="/home" className=" hover:scale-125 transition-transform">
          Home
        </NavLink>
        <NavLink
          to="/medicine-store"
          className=" hover:scale-125 transition-transform"
        >
          Medicine store
        </NavLink>
        <NavLink
          to="/medicine"
          className=" hover:scale-125 transition-transform"
        >
          Medicine
        </NavLink>
      </nav>
      <ul className="relative text-[10px] flex gap-x-[21px] gap-y-[10px] flex-wrap before:h-[1px] before:w-[100%]  before:bg-before-color before:absolute before:top-[-20px] md:before:top-[-32px] md:justify-center md:text-[14px] md:leading-[1.29] md:gap-[49px] lg:before:top-[-40px]">
        <li className="item">&#169; E-Pharmacy 2023. All Rights Reserved</li>
        <li className="item">Privacy Policy</li>
        <li>Terms &#38; Conditions</li>
      </ul>
      {size.innerWidth >= 768 && (
        <ul className="absolute right-[32px] top-[93px] flex gap-[12px] lg:top-[40px] lg:right-[128px]">
          <li className=" cursor-pointer h-[44px] w-[44px] rounded-[10px] border-[1px] border-before-color flex justify-center items-center  focus:border-social-media-hover-color hover:border-social-media-hover-color transition-colors">
            <a
              href="https://www.facebook.com/goITclub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                size={28}
                id="facebook"
                className="fill-my-white opacity-80"
              />
            </a>
          </li>
          <li className=" cursor-pointer h-[44px] w-[44px] rounded-[10px] border-[1px] border-before-color flex justify-center items-center  focus:border-social-media-hover-color hover:border-social-media-hover-color transition-colors">
            <a
              href=" https://www.instagram.com/goitclub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                size={28}
                id="instagram"
                className="fill-my-white opacity-80"
              />
            </a>
          </li>
          <li className=" cursor-pointer h-[44px] w-[44px] rounded-[10px] border-[1px] border-before-color flex justify-center items-center  focus:border-social-media-hover-color hover:border-social-media-hover-color transition-colors">
            <a
              href="https://www.youtube.com/c/GoIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                size={28}
                id="youtube"
                className="fill-my-white  opacity-80"
              />
            </a>
          </li>
        </ul>
      )}
    </footer>
  );
};
