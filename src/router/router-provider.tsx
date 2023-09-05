import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { OrderByProvider } from "../context/OrderByContext";
import { SearchProvider } from "../context/SearchContext";
import { WebPlayerProvider } from "../context/WebPlayerContext";

import ErrorLayout from "../layouts/ErrorLayout";

import Home from "../pages/Home";
import PodcastPage from "../pages/PodcastPage";

import { ErrorBoundary } from "../components/ErrorBoundary";
import { TrackProvider } from "../context/TrackContext";

const router = (parentElement: React.ReactNode) =>
  createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: parentElement,
      errorElement: (
        <ErrorLayout>
          <ErrorBoundary />
        </ErrorLayout>
      ),
      children: [
        {
          path: ROUTES.HOME,
          element: <Home />,
        },
        {
          path: ROUTES.PODCAST_DETAIL,
          element: <PodcastPage />,
        },
        {
          path: ROUTES.NOT_FOUND,
          element: <ErrorBoundary />,
        },
      ],
    },
  ]);

export const withProviders = (parentElement: React.ReactNode) => {
  return (
    <StrictMode>
      <WebPlayerProvider>
        <TrackProvider>
          <SearchProvider>
            <OrderByProvider>
              <RouterProvider router={router(parentElement)} />
            </OrderByProvider>
          </SearchProvider>
        </TrackProvider>
      </WebPlayerProvider>
    </StrictMode>
  );
};
