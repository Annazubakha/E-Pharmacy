import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  MainBanner,
  MedicineStores,
  PromoBanners,
  PharmacyPromoSection,
  ReviewsSection,
  Loader,
  GoUpBtn,
} from "../../components";

import {
  selectIsLoadingReviews,
  selectReviews,
} from "../../redux/reviews/slice";
import { AppDispatch } from "../../redux/store";
import { fetchReviewsThunk } from "../../redux/reviews/operation";
import { selectIsLoading, selectStores } from "../../redux/storesNear/slice";
import { fetchStoresNearThunk } from "../../redux/storesNear/operation";

const HomePage = (): JSX.Element => {
  const reviews = useSelector(selectReviews);
  const stores = useSelector(selectStores);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingReviews = useSelector(selectIsLoadingReviews);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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
      {(isLoading || isLoadingReviews) && <Loader size={45} />}
      <MainBanner />
      <PromoBanners />
      <MedicineStores stores={stores} />
      <PharmacyPromoSection />
      <ReviewsSection reviews={reviews} />
      <GoUpBtn />
    </>
  );
};
export default HomePage;
