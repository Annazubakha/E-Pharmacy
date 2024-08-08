import { NavLink } from "react-router-dom";

export const Nav = (): JSX.Element => {
  return (
    <nav className="flex flex-col gap-[5px] justify-center items-center text-[14px] lg:flex-row">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `decoration w-[96px] h-[46px] rounded-[60px] border-[7px] border-my-white flex justify-center items-center  shadow shadow-[#D9D9D9]  ${
            isActive
              ? " text-my-white bg-my-green "
              : " bg-my-white text-gris-dark "
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/medicine-store"
        className={({ isActive }) =>
          ` decoration_one w-[134px] h-[46px] rounded-[60px] border-[7px] border-my-white flex justify-center items-center  shadow shadow-[#D9D9D9] ${
            isActive
              ? " text-my-white bg-my-green  border-my-white"
              : " bg-my-white text-gris-dark "
          }`
        }
      >
        Medicine store
      </NavLink>
      <NavLink
        to="/medicine"
        className={({ isActive }) =>
          `  w-[112px] h-[46px] rounded-[60px]  border-[7px] border-my-white flex justify-center items-center  shadow shadow-[#D9D9D9]  ${
            isActive
              ? " text-my-white bg-my-green border-[7px] border-my-white"
              : " bg-my-white text-gris-dark "
          }`
        }
      >
        Medicine
      </NavLink>
    </nav>
  );
};
