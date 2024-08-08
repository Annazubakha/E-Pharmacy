import { useLocation } from "react-router-dom";
import { useWindowSizeHook } from "../../helpers";

export const LogOutBtn = (): JSX.Element => {
  const location = useLocation();
  const size = useWindowSizeHook().innerWidth;
  return (
    <button
      className={`flex items-center justify-center w-[119px] h-[40px]  border-[1px] rounded-[60px] navlink lg:h-[46px] ${
        location.pathname !== "/home" && size >= 1400
          ? "border-my-green text-my-green navlinkgreen"
          : "border-border-color-50  text-my-white navlink"
      }`}
    >
      Log out
    </button>
  );
};
