import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }): JSX.Element => {
  return (
    <h1 className="font-semibold text-[28px] leading-[1.14] text-my-black  mb-[40px] md:mb-[32px] lg:mb-[40px] lg:mt-[70px]">
      {children}
    </h1>
  );
};
