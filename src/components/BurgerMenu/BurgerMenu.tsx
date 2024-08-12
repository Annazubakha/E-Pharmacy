import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/slice";

import { AuthNav, Icon, LogOutBtn, Nav } from "../index";

export interface BurgerMenuProps {
  toggleBurgerMenu: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  toggleBurgerMenu,
}): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="bg-burger-menu-bg fixed w-full top-0 right-0 h-screen z-[1000] ">
      <div className=" bg-my-green fixed w-[210px] top-0 right-0 h-screen  px-[20px] pb-[20px] flex flex-col items-center  pt-[260px]  md:w-[334px] md:pb-[64px]  md:pt-[350px]  justify-between">
        <button
          onClick={toggleBurgerMenu}
          className="absolute top-[31px] right-[20px] flex items-center justify-center "
        >
          <Icon id="close" size={32} />
        </button>
        <Nav />
        {!isLoggedIn && <AuthNav />}
        {isLoggedIn && <LogOutBtn />}
      </div>
    </div>
  );
};
