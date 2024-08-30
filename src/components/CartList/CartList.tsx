import { cartItem } from "../../redux/cart/slice";
import { CartItem } from "../index";

interface CartListProps {
  items: cartItem[];
}

export const CartList: React.FC<CartListProps> = ({ items }): JSX.Element => {
  return (
    <ul className="flex flex-col gap-[40px]">
      {items?.map((item) => (
        <CartItem item={item} key={item.productId} />
      ))}
    </ul>
  );
};
