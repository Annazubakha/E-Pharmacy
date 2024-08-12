import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader, StoresList, Title } from "../../components";
import { AppDispatch } from "../../redux/store";
import { fetchStoresThunk } from "../../redux/stores/operation";
import { selectIsLoading, selectStores } from "../../redux/stores/slice";

const MedicineStorePage = () => {
  const stores = useSelector(selectStores);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(fetchStoresThunk()).unwrap();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader size={45} />}
      <section className="container section mt-[37px] md:mt-[46px] lg::mt-[70px]">
        <Title>Medicine store</Title>
        <StoresList stores={stores} />
      </section>
    </>
  );
};

export default MedicineStorePage;
