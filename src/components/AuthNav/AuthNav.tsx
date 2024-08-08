import { NavLink, useLocation } from "react-router-dom";
import { useWindowSizeHook } from "../../helpers";

export const AuthNav = (): JSX.Element => {
  const location = useLocation();
  const size = useWindowSizeHook().innerWidth;
  return (
    <nav className="flex flex-col gap-[8px] text-[14px]  md:flex-row ">
      <NavLink
        to="/register"
        className={`flex items-center justify-center w-[119px] h-[40px]  border-[1px] rounded-[60px] navlink lg:h-[46px] ${
          location.pathname !== "/home" && size >= 1400
            ? "border-my-green text-my-green navlinkgreen"
            : "border-border-color-50  text-my-white navlink"
        }`}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={`flex items-center justify-center w-[119px] h-[40px]   rounded-[60px] underline decoration-solid navlink lg:h-[46px] ${
          location.pathname !== "/home" && size >= 1400
            ? " text-my-green navlinkgreen"
            : " text-my-white navlink"
        }`}
      >
        Login
      </NavLink>
    </nav>
  );
};
