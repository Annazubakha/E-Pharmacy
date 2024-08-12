import { useNavigate } from "react-router-dom";

export const ModalAttention = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/login");
  };
  const handleRegistration = () => {
    navigate("/register");
  };

  return (
    <div className="px-[20px] py-[40px] flex flex-col items-center w-[335px] md:w-[466px] md:px-[60px] md:py-[60px]">
      <p className="font-bold text-my-green text-[20px] leading-[1] tracking-[-0.03em] mb-[20px] md:text-[24px] md:leading-[1.17]">
        Attention
      </p>
      <p className="text-[16px] leading-[1.29] tracking-[-0.02em] text-center mb-[24px] md:text-[20px]">
        Please, log in to your accound to add product to the cart.
      </p>
      <div className="flex gap-[8px]">
        <button
          onClick={handleLogIn}
          className="font-medium bg-my-green h-[40px] w-[137px] rounded-[30px] text-white text-[14px] leading-[1.29] tracking-[-0.03em] hover:bg-green-dark  focus:bg-green-dark
          md:h-[48px] md:w-[140px] md:text-[16px] md:leading-[1.25] "
        >
          Log In
        </button>
        <button
          onClick={handleRegistration}
          className="font-medium h-[40px] w-[137px] rounded-[30px]  text-[14px] text-my-green leading-[1.29] tracking-[-0.03em] hover:bg-my-green hover:text-white md:h-[48px] md:w-[140px] md:text-[16px] md:leading-[1.25]"
        >
          Registration
        </button>
      </div>
    </div>
  );
};
