import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { SearchProvider } from "../context/SearchContext";

import Home from "../pages/Home";

const router = (parentElement: React.ReactNode) =>
  createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: parentElement,
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />,
        },
      ],
    },
  ]);

export const withProviders = (parentElement: React.ReactNode) => {
  return (
    <StrictMode>
      <SearchProvider>
        <RouterProvider router={router(parentElement)} />
      </SearchProvider>
    </StrictMode>
  );
};
