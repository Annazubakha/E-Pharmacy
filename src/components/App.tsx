import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../routes";
import { SharedLayout } from "./index";
import { selectIsLoggedIn, selectToken } from "../redux/auth/slice";
import { AppDispatch } from "../redux/store";
import { fetchRefreshThunk } from "../redux/auth/operations";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const MedicineStorePage = lazy(
  () => import("../pages/MedicineStorePage/MedicineStorePage")
);
const MedicinePage = lazy(() => import("../pages/MedicinePage/MedicinePage"));
const ProductPage = lazy(() => import("../pages/ProductPage/ProductPage"));
const CartPage = lazy(() => import("../pages/CartPage/CartPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export const App = (): JSX.Element => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const link = isLoggedIn ? "/cart" : "/home";
  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(fetchRefreshThunk());
    }
  }, [dispatch, token, isLoggedIn]);
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            path="/home"
            element={
              <PublicRoute restricted={false}>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted={true}>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute restricted={true}>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/medicine-store"
            element={
              <PublicRoute restricted={false}>
                <MedicineStorePage />
              </PublicRoute>
            }
          />
          <Route
            path="/medicine"
            element={
              <PublicRoute restricted={false}>
                <MedicinePage />
              </PublicRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PublicRoute restricted={false}>
                <ProductPage />
              </PublicRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to={link} replace />} />
        </Route>
      </Routes>
    </>
  );
};
