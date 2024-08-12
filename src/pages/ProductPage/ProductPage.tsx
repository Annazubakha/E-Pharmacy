import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../redux/products/slice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { fetchOneProductThunk } from "../../redux/products/operation";
import { toast } from "react-toastify";
import { Icon } from "../../components";

const ProductPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const productDetails = useSelector(selectProduct);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("description");
  useEffect(() => {
    const loadProductDetails = async (): Promise<void> => {
      if (id) {
        try {
          await dispatch(fetchOneProductThunk(id)).unwrap();
        } catch (error) {
          toast.error("Failed to load product details.");
        }
      }
    };

    loadProductDetails();
  }, [dispatch, navigate, id]);
  return (
    <section className="container section lg:flex lg:gap-[20px] lg:mt-[70px]">
      <div className="md:flex gap-[16px] relative lg:flex-col lg:gap-[20px]">
        <img
          src={productDetails?.photo}
          alt="Product photo"
          className="w-[335px] h-[337px] rounded-[27px] border-[1.15px] border-my-green mb-[8px] md:w-[364px] md:h-[284px] "
        />
        <div className="mb-[8px] bg-white rounded-[20px] p-[20px] md:w-[324px]  lg:w-[364px]">
          <div className="flex justify-between font-semibold leading-[1.4] text-[16px] text-my-black mb-[4px] md:mb-0">
            <h2 className="md:text-[20px] md:leading-[1.4]">
              {productDetails?.name}
            </h2>{" "}
            <p className="md:text-[20px] md:leading-[1.4] md:absolute md:top-[114px] lg:relative lg:top-0">
              {" "}
              &#163;{productDetails?.price}
            </p>
          </div>
          <p className="leading-[1.5]  text-[12px] text-gris-light mb-[32px] md:mb-[126px]  lg:mb-[40px]">
            Brand: {productDetails?.suppliers}
          </p>
          <div className="flex justify-between items-center">
            <button className="bg-my-green w-[140px] h-[44px] flex justify-center items-center rounded-[60px] text-[14px] leading-[1.29] font-medium text-white hover:bg-green-dark  focus:bg-green-dark">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[27px] p-[20px] md:p-[32px] lg:w-[800px] ">
        <div className="flex gap-[8px] mb-[20px]">
          <button
            className={` w-[120px] h-[33px] flex justify-center items-center rounded-[40px] text-[14px] tracking-[-0.03em] font-medium hover:bg-my-green  focus:bg-my-green hover:text-white  focus:text-white  ${
              tab === "description"
                ? "bg-my-green text-white"
                : "bg-green-10 text-my-green"
            }`}
            onClick={() => setTab("description")}
          >
            Description
          </button>
          <button
            className={` w-[120px] h-[33px] flex justify-center items-center rounded-[40px] text-[14px] tracking-[-0.03em] font-medium hover:bg-my-green  focus:bg-my-green hover:text-white  focus:text-white  ${
              tab === "reviews"
                ? "bg-my-green text-white"
                : "bg-green-10 text-my-green"
            }`}
            onClick={() => setTab("reviews")}
          >
            Reviews
          </button>
        </div>
        {tab === "description" &&
          (productDetails?.description ? (
            <div>
              <ul className="flex gap-[20px] flex-col">
                {productDetails?.description?.map((description, index) => (
                  <li
                    key={index}
                    className="flex flex-col text-[14px] leading-[1.29] text-my-black gap-[20px] md:text-[16px] md:leading-[1.5]"
                  >
                    <p className="text-comment-color">{description.main}</p>
                    <p>
                      <span className="text-comment-color">
                        Medicinal Uses: Antioxidant Properties:{" "}
                      </span>
                      {description.uses}
                    </p>
                    <p>
                      <span className="text-comment-color">
                        Anti-Diabetic Effects:{" "}
                      </span>
                      {description.effects}
                    </p>
                    <p>
                      <span className="text-comment-color">Heart Health: </span>
                      {description.heart_health}
                    </p>
                    <p>
                      <span className="text-comment-color">
                        Anti-Cancer Properties:{" "}
                      </span>
                      {description.cancer}
                    </p>
                    <p>
                      <span className="text-comment-color">
                        Immune Support:
                      </span>
                      {description.support}
                    </p>
                    <p>
                      <span className="text-comment-color">Digestive Aid:</span>
                      {description.digestive_aid}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-[12px] md:text-[14px]">
              There is no description.
            </p>
          ))}

        {tab === "reviews" &&
          (productDetails?.reviews ? (
            <ul className="flex gap-[20px] flex-col ">
              {productDetails?.reviews?.map((review, index) => (
                <li
                  key={index}
                  className="relative border-[1px] border-white-text rounded-[20px] px-[28px] py-[14px]"
                >
                  <div className="flex gap-[20px] items-center mb-[20px] md:mb-[14px]">
                    <img
                      src={review.imgUrl}
                      alt="photo of review's owner"
                      className="w-[44px] h-[44px] rounded-full"
                    />
                    <div>
                      <p className="text-[16px] leading-[1.4] text-my-black font-semibold">
                        {review.name}
                      </p>
                      <p className="text-[12px] leading-[1.5] text-gris-light">
                        {review.time} days ago
                      </p>
                    </div>
                  </div>
                  <div className="absolute flex items-center gap-[6px] top-[15px] right-[28px] text-[14px] leading-[1.29] text-my-black font-medium">
                    <Icon id="star" size={16} className="fill-my-yellow" />
                    {review.rating}
                  </div>
                  <p className="text-[14px] leading-[1.29] text-comment-color">
                    {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12px] md:text-[14px]">There are no reviews.</p>
          ))}
      </div>
    </section>
  );
};

export default ProductPage;
