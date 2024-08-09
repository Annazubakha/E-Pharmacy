import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import { PrivateRoute, PublicRoute } from "../routes";
import { SharedLayout } from "./index";

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

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            path="/home"
            element={
              // <PublicRoute >
              <HomePage />
              // </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              // <PublicRoute >
              <LoginPage />
              // </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              // <PublicRoute >
              <RegisterPage />
              // </PublicRoute>
            }
          />
          <Route
            path="/medicine-store"
            element={
              // <PublicRoute>
              <MedicineStorePage />
              // </PublicRoute>
            }
          />
          <Route
            path="/medicine"
            element={
              // <PublicRoute>
              <MedicinePage />
              // </PublicRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              // <PublicRoute>
              <ProductPage />
              // </PublicRoute>
            }
          />
          <Route
            path="/cart"
            element={
              // <PrivateRoute>
              <CartPage />
              // </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/" element={<Navigate to={link} replace />} /> */}
        </Route>
      </Routes>
    </>
  );
};
