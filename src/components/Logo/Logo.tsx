import { NavLink, useLocation } from "react-router-dom";

import Img1 from "../../assets/images/logo/logowhite_mobile@1x.png";
import Img2 from "../../assets/images/logo/logowhite_mobile@2x.png";
import Img3 from "../../assets/images/logo/logowhite_tablet@1x.png";
import Img4 from "../../assets/images/logo/logowhite_tablet@2x.png";

import Img5 from "../../assets/images/logo/logogreen_mobile@1x.png";
import Img6 from "../../assets/images/logo/logogreen_mobile@2x.png";
import Img7 from "../../assets/images/logo/logogreen_tablet@1x.png";
import Img8 from "../../assets/images/logo/logogreen_tablet@2x.png";

export const Logo = (): JSX.Element => {
  const location = useLocation();
  return (
    <NavLink to="/home" className=" flex gap-[12px] items-center md:gap-[14px]">
      {location.pathname === "/home" ? (
        <>
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={`${Img3} 1x, ${Img4} 2x`}
              type="image/png"
            />
            <img srcSet={`${Img1} 1x, ${Img2} 2x`} alt="Logo" />
          </picture>
          <p className="text-[16px] tracking-[-0.03em] font-semibold text-white md:text-[20px]">
            E-Pharmacy
          </p>
        </>
      ) : (
        <>
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={`${Img7} 1x, ${Img8} 2x`}
              type="image/png"
            />
            <img srcSet={`${Img5} 1x, ${Img6} 2x`} alt="Logo" />
          </picture>
          <p className="text-[16px] tracking-[-0.03em] font-semibold text-my-black md:text-[20px]">
            E-Pharmacy
          </p>
        </>
      )}
    </NavLink>
  );
};
