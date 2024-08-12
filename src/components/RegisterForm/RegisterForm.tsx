import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerSchema } from "../../schemas";
import { Icon, Loader } from "../index";
import { AppDispatch } from "../../redux/store";
import { registerThunk } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/slice";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export const RegisterForm = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const [showPass, setShowPass] = useState<boolean>(false);
  const passVisibility = (): void => {
    setShowPass((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(registerSchema) });
  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      toast.success("User was registered successfully. Please, log in.");
      navigate("/login");
    } catch (error) {
      toast.error("Email is already in use.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[10px] mb-[14px] md:gap-[14px] md:flex-row md:flex-wrap lg:w-[574px] lg:pt-[198px]"
    >
      <div className="relative">
        <input
          {...register("name")}
          placeholder="User Name"
          className={`input_auth md:w-[280px] ${
            errors.name ? "border-my-red" : "border-input-border-color"
          }`}
        />
        <p className="input_error ">{errors.name?.message}</p>
      </div>
      <div className="relative">
        <input
          {...register("email")}
          placeholder="Email address"
          className={`input_auth md:w-[280px] ${
            errors.email ? "border-my-red" : "border-input-border-color"
          }`}
        />
        <p className="input_error ">{errors.email?.message}</p>
      </div>
      <div className="relative">
        <input
          {...register("phone")}
          placeholder="Phone number"
          className={`input_auth md:w-[280px] ${
            errors.phone ? "border-my-red" : "border-input-border-color"
          }`}
        />
        <p className="input_error ">{errors.phone?.message}</p>
      </div>

      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
          className={`input_auth md:w-[280px] ${
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
        className="mt-[118px] btn_form_submit md:mt-[48px] md:w-[280px] relative"
      >
        Register
        {isLoading && <Loader size={12} />}
      </button>
    </form>
  );
};
