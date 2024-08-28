import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthNav, BurgerMenu, Icon, Logo, LogOutBtn, Nav } from "../index";
import { convertUserName, useWindowSizeHook } from "../../helpers";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/slice";

export const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const location = useLocation();
  const size = useWindowSizeHook();
  const convertedName = convertUserName(user.name ?? "");
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
      {size.innerWidth >= 1440 && <Nav />}
      {size.innerWidth >= 1440 && !isLoggedIn && <AuthNav />}
      <div
        className={`${
          isLoggedIn || size.innerWidth <= 1440
            ? "flex items-center gap-[10px] md:gap-[12px] "
            : "hidden"
        }`}
      >
        {isLoggedIn && (
          <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-green-10 text-[14px] leading-[1.4] uppercase font-semibold text-my-green md:w-[44px] md:h-[44px] md:text-[18px]">
            <p>{convertedName}</p>
          </div>
        )}
        {size.innerWidth >= 1440 && isLoggedIn && <LogOutBtn />}
        {size.innerWidth < 1440 && (
          <button onClick={toggleBurgerMenu} className="lg:hidden">
            <Icon
              size={32}
              id="burger"
              className={`${
                location.pathname === "/home"
                  ? "stroke-white"
                  : "stroke-my-green"
              }`}
            />
          </button>
        )}
      </div>
      {isMobileMenuOpen && <BurgerMenu toggleBurgerMenu={toggleBurgerMenu} />}
    </header>
  );
};
