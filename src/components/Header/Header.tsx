import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BurgerMenu, Icon, Logo, Nav } from "../index";
import { useWindowSizeHook } from "../../helpers";

export const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const size = useWindowSizeHook();
  const toggleBurgerMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`px-[20px] w-full  max-w-[375px] mx-auto h-[84px] flex items-center justify-between md:max-w-[768px] md:px-[32px] md:h-[104px] lg:h-[102px] lg:max-w-[1440px] lg:px-[128px]  ${
        location.pathname === "/home" && "bg-my-green"
      }`}
    >
      <Logo />
      {size.innerWidth < 1440 && (
        <button onClick={toggleBurgerMenu} className="lg:hidden">
          <Icon
            size={32}
            id="burger"
            className={`${
              location.pathname === "/home" ? "stroke-white" : "stroke-my-green"
            }`}
          />
        </button>
      )}
      {size.innerWidth >= 1440 && <Nav />}
      {/* {size.innerWidth >= 1440 && !isLoggenIn && <AuthNav />} */}
      {/* {size.innerWidth >= 1440 && isLoggenIn && <LogOutBtn />} */}
      {isMobileMenuOpen && <BurgerMenu toggleBurgerMenu={toggleBurgerMenu} />}
    </header>
  );
};
