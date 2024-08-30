import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CartForm, Loader, Title, CartList } from "../../components";
import { selectCart, selectIsLoading } from "../../redux/cart/slice";
import { AppDispatch } from "../../redux/store";
import { fetchCartThunk } from "../../redux/cart/operations";

const CartPage = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(fetchCartThunk()).unwrap();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader size={45} />}
      <section className="container section">
        <Title>Cart</Title>
        {cart.length === 0 && !isLoading ? (
          <h2 className="text-[20px] text-center md:text-[24px]">
            There are no items in the cart.
          </h2>
        ) : (
          <div className="lg:flex lg:gap-[96px]">
            <CartForm cart={cart} />
            <CartList items={cart} />
          </div>
        )}
      </section>
    </>
  );
};
export default CartPage;
