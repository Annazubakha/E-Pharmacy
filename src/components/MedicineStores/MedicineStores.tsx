import { Store } from "../../redux/storesNear/slice";
import { StoresList } from "../index";

export interface StoresProps {
  stores: Store[];
}

export const MedicineStores: React.FC<StoresProps> = ({
  stores,
}): JSX.Element => {
  return (
    <section className="container section ">
      <h2 className="text-[28px] text-center leading-[1.14] text-my-black font-semibold mb-[14px] md:text-[40px]  md:leading-[1.2] ">
        Your Nearest <br className="md:hidden" /> Medicine Store
      </h2>
      <p className="mb-[40px] text-[14px] text-center leading-[1.29] text-gris-dark md:text-[16px]  md:leading-[1.25] md:mb-[64px]">
        Search for Medicine, Filter by your location
      </p>
      <StoresList stores={stores} />
    </section>
  );
};
