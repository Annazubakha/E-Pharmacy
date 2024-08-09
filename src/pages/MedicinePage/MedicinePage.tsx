import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Filters,
  Loader,
  Pagination,
  ProductsList,
  Title,
} from "../../components";
import { AppDispatch } from "../../redux/store";
import {
  selectCategories,
  selectIsLoading,
  selectPage,
  selectProducts,
  selectTotalPages,
  setPage,
} from "../../redux/products/slice";
import {
  fetchCategoriesThunk,
  fetchProductsThunk,
} from "../../redux/products/operation";

const MedicinePage = (): JSX.Element => {
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategoriesThunk()).unwrap();
        await dispatch(
          fetchProductsThunk({ page, category: category, name: keyword })
        ).unwrap();
      } catch (error) {
        toast.error("Something went wrong.");
      }
    };
    fetchData();
  }, [dispatch, page, category, keyword]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage({ page: newPage }));
  };

  return (
    <>
      {isLoading && <Loader size={45} />}
      <section className="container section">
        <Title>Medicine</Title>
        <Filters
          categories={categories}
          setCategory={setCategory}
          setPage={setPage}
          setKeyword={setKeyword}
        />
        {products?.length > 0 ? (
          <>
            <ProductsList products={products} />
            {totalPages !== 1 && (
              <Pagination
                page={page}
                setPage={handlePageChange}
                totalPages={totalPages}
              />
            )}
          </>
        ) : !isLoading ? (
          <p className="text-[35px] text-center text-my-green">
            Sorry, we didn't find anything. Please try another filter.
          </p>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default MedicinePage;
