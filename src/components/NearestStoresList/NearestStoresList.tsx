import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchStoresNearThunk } from "../../redux/storesNear/operation";
import { selectStores } from "../../redux/storesNear/slice";
import { AppDispatch } from "../../redux/store";
import { NearestStoresItem } from "../index";

export const NearestStoresList: React.FC = (): JSX.Element => {
  const stores = useSelector(selectStores);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchStoresNearThunk()).unwrap();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <ul className="flex flex-col gap-[20px] md:flex-row md:flex-wrap md:gap-x-[16px] md:gap-y-[32px] lg:justify-center">
      {stores?.map((store) => (
        <NearestStoresItem store={store} key={store._id} />
      ))}
    </ul>
  );
};
