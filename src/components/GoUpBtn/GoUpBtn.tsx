import ScrollToTop from "react-scroll-to-top";
import { Icon } from "../index";

export const GoUpBtn = (): JSX.Element => {
  return (
    <>
      <ScrollToTop
        smooth
        component={<Icon id="arrow-top" size={22} className="fill-my-green" />}
      />
    </>
  );
};
