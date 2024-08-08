import { NavLink } from "react-router-dom";
import { MainContentAuth, LoginForm } from "../../components";

const LoginPage = (): JSX.Element => {
  return (
    <section className="container section lg:flex lg:justify-center lg:gap-[169px] lg:items-center ">
      <MainContentAuth />
      <div>
        <LoginForm />
        <p className="text-[12px] leading-[1.5] text-gris-dark text-center md:w-[323px]">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-my-green underline decoration-solid"
          >
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
