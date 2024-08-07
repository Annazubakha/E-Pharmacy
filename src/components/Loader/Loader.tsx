import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

interface LoaderProps {
  size: number;
}
export const Loader: React.FC<LoaderProps> = ({ size }): JSX.Element => {
  const location = useLocation();
  return (
    <div
      className={`${"  transform-translate-y-1/2  flex items-center justify-center  z-[1001] "} ${
        location.pathname === "/register" || location.pathname === "login"
          ? "right-[10px] top-[33%] md:top-[35%] md:right-[12px]  absolute"
          : "top-0 bg-loader-bg w-full h-full fixed right-0"
      }`}
    >
      <BeatLoader color={"#fff"} size={size} />
    </div>
  );
};
