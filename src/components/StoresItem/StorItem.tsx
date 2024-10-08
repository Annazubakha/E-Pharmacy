import { useNavigate } from "react-router-dom";
import { Store } from "../../redux/storesNear/slice";
import { Icon } from "../index";
import { convertWorkingHours } from "../../helpers";

interface StoresItemProps {
  store: Store;
}

export const StoresItem: React.FC<StoresItemProps> = ({
  store,
}): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate("/medicine");
  };

  const currentTime = new Date().getHours();
  const openHour = convertWorkingHours(store.open);
  const closeHour = convertWorkingHours(store.close);

  return (
    <li
      className=" bg-green-bg p-[40px] rounded-[27px] relative hover:scale-105 transition-transform cursor-pointer md:w-[344px] overflow-hidden"
      onClick={handleNavigate}
    >
      <h3 className="text-[16px] leading-[1.4] text-my-black font-semibold w-[123px] truncate mb-[32px] md:text-[20px] md:mb-[40px]">
        {store.name}
      </h3>
      <div className="flex gap-[8px] mb-[18px] md:mb-[14px]">
        <Icon id="location" size={18} />
        <div className="text-[14px] leading-[1.29] text-gris-dark md:text-[16px] md:leading-[1.25] ">
          <p>{store.address}</p>
          <p>{store.city}</p>
        </div>
      </div>
      <div className="flex gap-[8px] text-[14px] leading-[1.29] md:text-[16px] md:leading-[1.25] text-gris-dark">
        <Icon id="phone" size={18} />

        <p>{store.phone}</p>
      </div>
      <div className="absolute top-[41px] right-[111px] flex text-[14px] leading-[1.29] font-medium gap-[6px] md:top-[46px]">
        <Icon id="star" size={16} className="fill-my-yellow" />
        {store.rating}
      </div>
      {currentTime >= openHour && currentTime <= closeHour ? (
        <div className="absolute top-[32px] right-[32px] flex text-[12px] leading-[1.5] font-semibold tracking-[-0.02em] justify-center items-center w-[65px] rounded-[8px] text-my-green h-[34px] bg-green-10 md:w-[71px] md:top-[38px] md:right-[24px]">
          OPEN
        </div>
      ) : (
        <div className="absolute top-[32px] right-[32px] flex text-[12px] leading-[1.5] font-semibold tracking-[-0.02em] justify-center items-center w-[65px] rounded-[8px] text-my-red h-[34px] bg-red-10 md:w-[71px] md:top-[38px] md:right-[24px]">
          CLOSE
        </div>
      )}
      <Icon id="bg" size={168} className="absolute top-[60px] right-[-25px]" />
    </li>
  );
};
