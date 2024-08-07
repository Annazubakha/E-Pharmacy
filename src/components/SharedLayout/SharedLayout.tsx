import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../index";

export const SharedLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
