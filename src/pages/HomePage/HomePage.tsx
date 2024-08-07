import {
  MainBanner,
  MedicineStores,
  PromoBanners,
  PharmacyPromoSection,
  ReviewsSection,
  Loader,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";

import { selectReviews } from "../../redux/reviews/slice";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { fetchReviewsThunk } from "../../redux/reviews/operation";
import { selectIsLoading, selectStores } from "../../redux/storesNear/slice";
import { fetchStoresNearThunk } from "../../redux/storesNear/operation";

const HomePage = (): JSX.Element => {
  const reviews = useSelector(selectReviews);
  const stores = useSelector(selectStores);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchReviewsThunk()).unwrap();
        await dispatch(fetchStoresNearThunk()).unwrap();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader size={45} />}
      <MainBanner />
      <PromoBanners />
      <MedicineStores stores={stores} />
      <PharmacyPromoSection />
      <ReviewsSection reviews={reviews} />
    </>
  );
};
export default HomePage;
