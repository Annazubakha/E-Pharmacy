import { NavLink } from "react-router-dom";

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div className="bg-my-green container section text-white rounded-[27px] flex flex-col items-center gap-[20px] py-[40px] mt-[80px]  md:mt-[120px] md:w-[600px] lg:w-[900px]">
      <h1 className="text-[45px]">Ooops...</h1>
      <p className="text-[26px]">We can't find this page</p>
      <NavLink
        to="/home"
        className="font-medium bg-white text-my-green rounded-[8px] w-[150px] h-[42px] flex justify-center items-center text-[20px] hover:bg-green-bg"
      >
        Go home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
