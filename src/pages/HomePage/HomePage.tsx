import { MainBanner, MedicineStores, PromoBanners } from "../../components";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <>
      <MainBanner />
      <PromoBanners />
      <MedicineStores />
    </>
  );
};
export default HomePage;
