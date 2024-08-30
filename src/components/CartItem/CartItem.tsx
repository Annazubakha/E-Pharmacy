import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchUpdateItemThunk } from "../../redux/cart/operations";
import { cartItem } from "../../redux/cart/slice";
import { AppDispatch } from "../../redux/store";
import { Icon } from "../index";

interface ProductProps {
  item: cartItem;
}

export const CartItem: React.FC<ProductProps> = ({ item }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRemoveItem = async (productId: string): Promise<void> => {
    try {
      await dispatch(fetchUpdateItemThunk({ productId, quantity: 0 })).unwrap();
      toast.success("Product was deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  const handleIncreaseQuantity = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    try {
      await dispatch(
        fetchUpdateItemThunk({ productId, quantity: quantity + 1 })
      ).unwrap();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDecreaseQuantity = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    if (quantity > 1) {
      try {
        await dispatch(
          fetchUpdateItemThunk({ productId, quantity: quantity - 1 })
        ).unwrap();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    } else {
      handleRemoveItem(productId);
    }
  };
  return (
    <>
      <li className="flex gap-[12px] relative after:h-[1px] after:w-[100%] after:bg-input-border-color after:absolute after:bottom-[-20px] last:after:hidden md:gap-[20px]">
        <img
          src={item.photo}
          alt="Product photo"
          className="w-[120px] h-[120px] rounded-[27px] border-[1.15px] md:w-[123px] md:h-[123px]"
        />
        <div className="flex gap-[8px] flex-col mb-[8px] md:mb-[40px] lg:mb-0">
          <h2 className="font-semibold leading-[1.4] text-[16px] text-my-black md:text-[18px]">
            {item.name}
          </h2>
          <p className="leading-[1.17]  text-[12px] text-gris-light md:text-[14px] md:leading-[1.29] md:mb-[32px]">
            {item.suppliers}
          </p>
          <p className="font-semibold leading-[1.17] text-[12px] text-my-black md:absolute md:right-0  md:text-[14px] md:leading-[1.29]">
            &#163;{item.price}
          </p>
          <div className="flex gap-[19px] md:justify-between md:gap-[365px] lg:gap-[121px]">
            <div className="h-[32px] w-[95px] flex justify-center items-center gap-[12px] text-[14px] leading-[1.43] rounded-[40px] border-[1px] border-input-border-color md:w-[108px]  ">
              <button
                onClick={() =>
                  handleIncreaseQuantity(item.productId, item.quantity)
                }
              >
                <Icon id="plus" size={18} />
              </button>
              {item.quantity}
              <button
                onClick={() =>
                  handleDecreaseQuantity(item.productId, item.quantity)
                }
              >
                <Icon id="minus" size={18} />
              </button>
            </div>
            <button
              onClick={() => handleRemoveItem(item.productId)}
              className="h-[32px] w-[89px] flex justify-center items-center text-[14px] text-my-red tracking-[-0.05] font-medium rounded-[40px] bg-red-10 hover:bg-my-red hover:text-white focus:bg-my-red focus:text-white"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    </>
  );
};
