import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas";
import { useState } from "react";
import { Icon } from "../Icon/Icon";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export const RegisterForm = (): JSX.Element => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const passVisibility = (): void => {
    setShowPass((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(registerSchema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
        className="mt-[118px] btn_form_submit md:mt-[48px] md:w-[280px]"
      >
        Register
      </button>
    </form>
  );
};
