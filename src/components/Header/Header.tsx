import { useLocation } from "react-router-dom";
import { Icon, Logo } from "../index";
import { useWindowSizeHook } from "../../helpers";

export const Header: React.FC = (): JSX.Element => {
  const location = useLocation();
  const size = useWindowSizeHook();
  return (
    <header
      className={`container h-[84px] flex items-center justify-between md:h-[104px] lg:h-[102px] ${
        location.pathname === "/home" ? "bg-my-green" : ""
      }`}
    >
      <Logo />
      {size.innerWidth >= 1440 ? (
        ""
      ) : (
        <Icon
          size={32}
          id="burger"
          className={`${
            location.pathname === "/home" ? "stroke-white" : "stroke-my-green"
          }`}
        />
      )}
    </header>
  );
};
