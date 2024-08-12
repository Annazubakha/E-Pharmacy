import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSizeHook } from "../../helpers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logoutThunk } from "../../redux/auth/operations";

export const LogOutBtn = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const size = useWindowSizeHook().innerWidth;
  const handleLogOut = async (): Promise<void> => {
    try {
      await dispatch(logoutThunk()).unwrap();
      toast.success("Log out success.");
      navigate("/home");
    } catch (error) {
      toast.error("Something went wrong. Please, try again.");
    }
  };
  return (
    <button
      className={`flex items-center justify-center w-[119px] h-[40px]  border-[1px] rounded-[60px] navlink lg:h-[46px] ${
        location.pathname !== "/home" && size >= 1400
          ? "border-my-green text-my-green navlinkgreen"
          : "border-border-color-50  text-my-white navlink"
      }`}
      onClick={handleLogOut}
    >
      Log out
    </button>
  );
};
