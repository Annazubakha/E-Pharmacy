import { SubmitHandler, useForm } from "react-hook-form";
import { Icon } from "../index";

interface SearchFieldProps {
  setPage: (page: number) => void;
  setKeyword: (keyword: string) => void;
}

interface FormValues {
  query: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  setPage,
  setKeyword,
}): JSX.Element => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({ query }) => {
    setKeyword(query.toUpperCase());
    setPage(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        type="text"
        className="w-full h-[44px] bg-white pl-[18px] rounded-[60px] border-[1px] border-input-border-color text-[12px] leading-[1.5] text-my-black flex items-center outline-none focus:border-my-green md:w-[224px]"
        placeholder="Search"
        {...register("query")}
      />
      <button type="submit" className="absolute top-[14px] right-[14px]">
        <Icon id="search" size={16} />
      </button>
    </form>
  );
};
