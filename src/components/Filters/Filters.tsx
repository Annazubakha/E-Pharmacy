import { useState } from "react";
import { Category } from "../../redux/products/slice";
import { Icon, SearchField } from "../index";

interface FiltersProps {
  categories: Category[];
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
  setKeyword: (keyword: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  categories,
  setCategory,
  setPage,
  setKeyword,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const toggleDropdown = (dropdown: boolean | null): void => {
    setIsOpen((prev) => (prev === dropdown ? null : dropdown));
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const handleSelectedCategory = (category: string): void => {
    setCategory(category);
    setPage(1);
    setSelectedCategory(category);
    closeDropdown();
  };

  const handleResetFilters = () => {
    setPage(1);
    setCategory("");
    setKeyword("");
    setSelectedCategory("");
    const inputElement = document.querySelector<HTMLInputElement>(
      'input[name="query"]'
    );
    if (inputElement) {
      inputElement.value = "";
    }
  };

  return (
    <div className="mb-[40px]  flex flex-col gap-[12px] md:flex-row md:gap-[14px] md:mb-[32px] lg:mb-[40px]">
      <div className="relative">
        <button
          className="relative w-full h-[44px] bg-white pl-[18px] rounded-[60px] border-[1px] border-input-border-color text-[12px] leading-[1.5] text-burger-menu-bg flex items-center md:w-[214px]"
          onClick={() => toggleDropdown(true)}
        >
          {selectedCategory || "Product category"}
          <Icon
            id="dropdown"
            size={16}
            className="absolute top-[14px] right-[14px]"
          />
        </button>
        {isOpen && (
          <ul className="z-10 bg-white w-full  rounded-[20px] border-[1px] border-input-border-color text-[14px]   absolute top-[46px] p-[18px] flex flex-col gap-[8px]  text-my-black md:w-[214px] ">
            <li
              onClick={() => {
                setCategory(""),
                  setPage(1),
                  setSelectedCategory(""),
                  closeDropdown();
              }}
              className={`${"dropdown_list_item"} ${
                selectedCategory === "" && "active_item"
              }`}
            >
              Show all
            </li>
            {categories.map((category) => (
              <li
                key={category._id}
                className={`${"dropdown_list_item"} ${
                  selectedCategory === category.name && "active_item"
                }`}
                onClick={() => {
                  handleSelectedCategory(category.name);
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <SearchField setKeyword={setKeyword} setPage={setPage} />
      <button
        type="button"
        onClick={handleResetFilters}
        className="bg-my-green text-[14px] text-my-white h-[42px] rounded-[30px] hover:bg-my-yellow-dark  md:w-[125px]"
      >
        Reset all filters
      </button>
    </div>
  );
};
