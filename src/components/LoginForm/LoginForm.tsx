import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../../schemas";
import { Icon, Loader } from "../index";
import { AppDispatch } from "../../redux/store";
import { loginThunk } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/slice";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = (): JSX.Element => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const passVisibility = (): void => {
    setShowPass((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      toast.success("Log in success.");
      navigate("/medicine");
    } catch (error) {
      toast.error("Email or password is incorrect. Please, try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[10px] mb-[14px] md:gap-[14px] md:w-[323px] lg:pt-[198px]"
    >
      <div className="relative">
        <input
          {...register("email")}
          placeholder="Email address"
          className={`input_auth ${
            errors.email ? "border-my-red" : "border-input-border-color"
          }`}
        />
        <p className="input_error ">{errors.email?.message}</p>
      </div>

      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
          className={`input_auth ${
            errors.password ? "border-my-red" : "border-input-border-color"
          }`}
        />
        <p className="input_error ">{errors.password?.message}</p>
        <button
          type="button"
          className="absolute top-[12px] right-[12px] flex items-center justify-center  "
          onClick={passVisibility}
        >
          {showPass ? (
            <Icon id="open-eye" size={22} />
          ) : (
            <Icon id="close-eye" size={22} />
          )}
        </button>
      </div>

      <button
        type="submit"
        className="mt-[118px] btn_form_submit md:mt-[48px] relative"
      >
        Log in
        {isLoading && <Loader size={12} />}
      </button>
    </form>
  );
};
