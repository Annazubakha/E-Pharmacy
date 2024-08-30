import { NavLink } from "react-router-dom";
import { Product } from "../../redux/products/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchOneProductThunk } from "../../redux/products/operation";
import { toast } from "react-toastify";
import { selectIsLoggedIn } from "../../redux/auth/slice";
import { useModal } from "../../helpers";
import { Modal } from "../Modal/Modal";
import { ModalAttention } from "../ModalAttention/ModalAttention";
import { fetchUpdateItemThunk } from "../../redux/cart/operations";

interface ProductProps {
  product: Product;
}

export const ProductsItem: React.FC<ProductProps> = ({
  product,
}): JSX.Element => {
  const [isModalAttention, toggleIsModalAttention] = useModal();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const handleItemDetails = async (id: string): Promise<void> => {
    try {
      await dispatch(fetchOneProductThunk(id)).unwrap();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  const handleAddtoCart = async (id: string): Promise<void> => {
    try {
      await dispatch(
        fetchUpdateItemThunk({ productId: id, quantity: 1 })
      ).unwrap();
      toast.success("Product was added to cart.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <li>
        <img
          src={product.photo}
          alt="Product photo"
          className="w-[335px] h-[300px] rounded-[20px] border-[1.15px] border-my-green mb-[8px] md:w-[226px] md:h-[260px] lg:w-[280px] lg:h-[280px]"
        />
        <div className="w-[335px] rounded-[24px] p-[20px] bg-white md:w-[226px] lg:w-[280px]">
          <div className="flex justify-between font-semibold leading-[1.4] text-[16px] text-my-black mb-[4px]">
            <h2>{product.name}</h2> <p> &#163;{product.price}</p>
          </div>
          <p className="leading-[1.5]  text-[14px] text-gris-light mb-[17px]">
            {product.suppliers}
          </p>
          <div className="flex justify-between items-center">
            <button
              className="bg-my-green w-[108px] h-[34px] flex justify-center items-center rounded-[24px] text-[14px] font-medium text-white hover:bg-green-dark  focus:bg-green-dark"
              onClick={
                isLoggedIn
                  ? () => handleAddtoCart(product._id)
                  : toggleIsModalAttention
              }
            >
              Add to cart
            </button>
            <NavLink
              to={`/product/${product._id}`}
              onClick={() => handleItemDetails(product._id)}
              className="text-[12px] leading-[1.5] underline decoration-solid text-my-black"
            >
              Details
            </NavLink>
          </div>
        </div>
      </li>
      {isModalAttention && (
        <Modal toggleModal={toggleIsModalAttention}>
          <ModalAttention />
        </Modal>
      )}
    </>
  );
};
