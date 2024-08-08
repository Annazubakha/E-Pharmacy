import { NavLink } from "react-router-dom";
import { MainContentAuth, RegisterForm } from "../../components";

const RegisterPage = (): JSX.Element => {
  return (
    <section className="container section lg:flex lg:justify-center lg:gap-0 lg:items-center  ">
      <MainContentAuth />
      <div>
        <RegisterForm />
        <p className="text-[12px] leading-[1.5] text-gris-dark text-center md:w-[280px]">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-my-green underline decoration-solid"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
