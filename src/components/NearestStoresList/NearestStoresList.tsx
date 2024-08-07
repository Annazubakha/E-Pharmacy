import { NearestStoresItem, StoresNearProps } from "../index";

export const NearestStoresList: React.FC<StoresNearProps> = ({
  stores,
}): JSX.Element => {
  return (
    <ul className="flex flex-col gap-[20px] md:flex-row md:flex-wrap md:gap-x-[16px] md:gap-y-[32px] lg:justify-center lg:gap-x-[36px] lg:gap-y-[38px]">
      {stores?.map((store) => (
        <NearestStoresItem store={store} key={store._id} />
      ))}
    </ul>
  );
};
