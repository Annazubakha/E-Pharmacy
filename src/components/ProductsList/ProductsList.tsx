import { Product } from "../../redux/products/slice";
import { ProductsItem } from "../index";

interface ProductsListProps {
  products: Product[];
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
}): JSX.Element => {
  return (
    <ul className="flex flex-col gap-[20px] mb-[40px] md:flex-row md:flex-wrap md:gap-x-[13px] md:gap-y-[32px] md:mb-[80px] lg:gap-x-[21px] lg:gap-y-[40px]">
      {products?.map((product) => (
        <ProductsItem product={product} key={product._id} />
      ))}
    </ul>
  );
};
