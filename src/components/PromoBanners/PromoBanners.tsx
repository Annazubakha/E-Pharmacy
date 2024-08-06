import { NavLink } from "react-router-dom";

interface Banner {
  name: string;
  discount: string;
}

const banners: Banner[] = [
  { name: "Huge Sale", discount: "70" },
  { name: "Secure delivery", discount: "100" },
  { name: "Off", discount: "35" },
];

export const PromoBanners: React.FC = (): JSX.Element => {
  return (
    <section className="container section">
      <ul className="flex flex-col gap-[16px] md:flex-row md:flex-wrap md:gap-[28px] lg:justify-center">
        {banners.map(({ name, discount }, index) => (
          <li
            key={index}
            className="bg-white-second rounded-[27px] py-[14px] px-[18px] flex flex-col gap-[14px] md:w-[338px] "
          >
            <div className="flex gap-[14px] items-center">
              {" "}
              <div className="h-[54px] w-[54px] text-my-green flex justify-center items-center text-[24px] bg-green-super-light rounded-full md:h-[74px] md:w-[74px] md:text-[28px]">
                {index + 1}
              </div>
              <h3 className="font-medium text-[16px] leading-[1.4] md:text-[20px]">
                {name}
              </h3>
            </div>
            <div className="flex gap-[30px] md:gap-[28px]">
              <p className="font-medium text-[24px] leading-[1.4] md:text-[36px]">
                {discount}%
              </p>

              <NavLink
                to="/medicine"
                className="text-[13px] leading-[1.4] text-gris-dark hover:text-my-green focus:text-my-green mt-[13px] md:mt-[24px]"
              >
                Shop now
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
