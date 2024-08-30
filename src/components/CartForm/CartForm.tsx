import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader, Icon } from "../index";
import { cartSchema } from "../../schemas";
import { cartItem, selectIsLoading } from "../../redux/cart/slice";
import { AppDispatch } from "../../redux/store";
import {
  fetchCartThunk,
  fetchPostOrderThunk,
} from "../../redux/cart/operations";

type InputsCart = {
  email: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
};

interface CartFormProps {
  cart: cartItem[];
}

export const CartForm: React.FC<CartFormProps> = ({ cart }): JSX.Element => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const calculateTotalAmount = useCallback(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);
  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [calculateTotalAmount]);

  const prepareProductsArray = useCallback(() => {
    return cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  }, [cart]);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InputsCart>({ resolver: yupResolver(cartSchema) });
  const onSubmit: SubmitHandler<InputsCart> = async (data): Promise<void> => {
    try {
      const submissionData = {
        ...data,
        products: prepareProductsArray(),
      };
      await dispatch(fetchPostOrderThunk(submissionData)).unwrap();
      toast.success("Order was made successfully.");
      await dispatch(fetchCartThunk()).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please, try again.");
    }
  };
  const handlePaymentMethod = (value: string) => {
    setSelectedPaymentMethod(value);
    setValue("paymentMethod", value);
  };
  useEffect(() => {
    const calculatedTotalAmount = calculateTotalAmount();
    const test = prepareProductsArray();
    setTotalAmount(calculatedTotalAmount);
    setValue("totalAmount", calculatedTotalAmount);
    setValue("products", test);
  }, [cart, setValue, calculateTotalAmount, prepareProductsArray]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[12px] mb-[66px] bg-white p-[20px] rounded-[27px] text-my-black  md:px-[78px] md:py-[40px] md:gap-[14px] md:mb-[64px] lg:w-[628px] lg:px-[40px]"
    >
      <h2 className="text-[16px] leading-[1.4] font-semibold md:text-[20px]">
        Enter shipping info
      </h2>
      <p className="mb-[16px] text-[14px] leading-[1.29] text-comment-color md:text-[16px] md:mb-[26px]">
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>
      <div className="relative after:h-[1px] after:w-[100%] after:bg-input-border-color after:absolute after:bottom-[-40px] mb-[66px] md:flex md:flex-wrap md:gap-x-[14px] md:gap-y-[20px]">
        <div className="relative">
          <p className="cart_input_name"> Name</p>
          <input
            {...register("name")}
            placeholder="Enter name"
            className={`input_cart ${
              errors.email ? "border-my-red" : "border-border-input"
            }`}
          />
          <p className="input_error_cart">{errors.name?.message}</p>
        </div>
        <div className="relative">
          <p className="cart_input_name">Email</p>
          <input
            {...register("email")}
            placeholder="Enter email"
            className={`input_cart ${
              errors.email ? "border-my-red" : "border-border-input"
            }`}
          />
          <p className="input_error_cart">{errors.email?.message}</p>
        </div>
        <div className="relative">
          <p className="cart_input_name">Phone</p>
          <input
            {...register("phone")}
            placeholder="Enter phone"
            className={`input_cart ${
              errors.phone ? "border-my-red" : "border-border-input"
            }`}
          />
          <p className="input_error_cart">{errors.phone?.message}</p>
        </div>
        <div className="relative">
          <p className="cart_input_name">Address</p>
          <input
            {...register("address")}
            placeholder="Enter address"
            className={`input_cart ${
              errors.address ? "border-my-red" : "border-border-input"
            }`}
          />
          <p className="input_error_cart">{errors.address?.message}</p>
        </div>
      </div>
      <div className="relative after:h-[1px] after:w-[100%] after:bg-input-border-color after:absolute after:bottom-[-40px] mb-[66px]">
        <h2 className="text-[16px] leading-[1.4] font-semibold text-my-black mb-[12px] md:text-[20px] md:mb-[14px]">
          Payment method
        </h2>
        <p className="mb-[16px] text-[14px] leading-[1.29] text-comment-color md:text-[16px] md:leading-[1.25] md:mb-[20px]">
          You can pay us in a multiple way in our payment gateway system.
        </p>
        <div className="text-[14px] leading-[1.29] flex flex-col gap-[8px] text-gris-light">
          <p className="input_error_cart">{errors.paymentMethod?.message}</p>
          <div
            className={`flex items-center gap-[12px] cursor-pointer ${
              selectedPaymentMethod === "cash" ? "text-my-black" : "gris-light"
            }`}
            onClick={() => handlePaymentMethod("cash")}
          >
            <Icon
              id={selectedPaymentMethod === "cash" ? "checked" : "unchecked"}
              size={18}
            />
            <label htmlFor="cash" className="cursor-pointer">
              Cash On Delivery
            </label>
            <input
              type="radio"
              id="cash"
              className="hidden"
              value="cash"
              {...register("paymentMethod")}
              checked={selectedPaymentMethod === "cash"}
              onChange={() => handlePaymentMethod("cash")}
            />
          </div>
          <div
            className={`flex items-center gap-[12px] cursor-pointer ${
              selectedPaymentMethod === "bank" ? "text-my-black" : "gris-light"
            }`}
            onClick={() => handlePaymentMethod("bank")}
          >
            <Icon
              id={selectedPaymentMethod === "bank" ? "checked" : "unchecked"}
              size={18}
            />
            <label htmlFor="bank" className="cursor-pointer">
              Bank
            </label>
            <input
              type="radio"
              id="bank"
              className="hidden"
              value="bank"
              {...register("paymentMethod")}
              checked={selectedPaymentMethod === "bank"}
              onChange={() => handlePaymentMethod("bank")}
            />
          </div>
        </div>
      </div>
      <div className="relative mb-[8px]">
        <h2 className="text-[16px] leading-[1.4] font-semibold text-my-black mb-[12px] md:text-[20px] md:mb-[14px]">
          Order details
        </h2>
        <p className="mb-[20px] text-[14px] leading-[1.29] text-comment-color md:text-[16px]">
          Shipping and additionnal costs are calculated based on values you have
          entered.
        </p>
        <div className="w-[100%] h-[50px] rounded-[8px] bg-green-10 flex items-center justify-between px-[18px] md:h-[65px] md:px-[20px] md:mb-[6px]">
          <p className="text-[16px] leading-[1.4] font-semibold text-my-black md:text-[18px]">
            Total:
          </p>
          <p className="text-[16px] leading-[1.4] font-semibold text-my-black md:text-[18px]">
            &#163; {totalAmount}
          </p>
        </div>
      </div>
      <p>{errors.products?.message}</p>
      <p>{errors.totalAmount?.message}</p>
      <button
        type="submit"
        className="w-[141px] h-[44px] rounded-[60px] bg-my-green text-[14px] text-white font-medium leading-[1.29] hover:bg-green-dark focus:bg-green-dark relative"
      >
        Place order
        {isLoading && <Loader size={12} />}
      </button>
    </form>
  );
};
