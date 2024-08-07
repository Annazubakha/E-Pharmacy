import { NavLink } from "react-router-dom";
import { FeaturesSection } from "../index";

import Img1 from "../../assets/images/promo/img_mobile@1x.png";
import Img2 from "../../assets/images/promo/img_mobile@2x.png";
import Img3 from "../../assets/images/promo/img_tablet@1x.png";
import Img4 from "../../assets/images/promo/img_tablet@2x.png";

export const PharmacyPromoSection = (): JSX.Element => {
  return (
    <section className="section container flex flex-col gap-[40px] md:gap-[64px]">
      <div className="px-[20px] pb-[20px] pt-[40px] bg-my-green rounded-[27px] text-white-text md:pb-[40px] md:pt-[104px] md:pr-[48px] md:pl-[50px] lg:p-[40px] lg:flex lg:justify-between md:rounded-[32px]">
        <div className="">
          <h2 className="mb-[20px] font-semibold text-[28px] leading-[1.14] tracking-[-0.01em] md:mb-[28px] md:text-[48px] md:leading-[1.15] lg:pt-[64px] lg:mb-[24px]">
            Add the medicines
            <br className="md:hidden lg:block" /> you{" "}
            <br className="hidden md:block lg:hidden" />
            need online now
          </h2>
          <p className="mb-[40px] text-[14px] leading-[1.29]  md:text-[16px] md:leading-[1.25] md:w-[488px] ">
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through{" "}
            <br className="hidden md:block" />
            our online platform.
          </p>
          <NavLink
            to="/medicine-store"
            className="navlink mb-[40px] text-[14px] leading-[1.29] font-medium w-[154px] h-[44px] flex justify-center items-center rounded-[60px] border-[1px] border-border-color-50 md:mb-[83px] md:w-[190px] lg:mb-0 "
          >
            Buy medicine
          </NavLink>
        </div>
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={`${Img3} 1x, ${Img4} 2x`}
            type="image/png"
          />
          <img srcSet={`${Img1} 1x, ${Img2} 2x`} alt="Logo" />
        </picture>
      </div>
      <FeaturesSection />
    </section>
  );
};
