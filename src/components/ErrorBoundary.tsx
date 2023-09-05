import {
  Link,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

type componentError = {
  message: string;
};

export const ErrorBoundary = () => {
  const error = useRouteError() as Error | componentError;
  const location = useLocation();

  console.log(error);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-2xl">Oops!</h1>
      {location.pathname === ROUTES.NOT_FOUND ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl text-indigo-500">404</h2>
          <code className="text-slate-400">Resource not found</code>
        </div>
      ) : (
        <p className="text-slate-200 text-lg">
          Something went wrong. Please try again.
        </p>
      )}
      {isRouteErrorResponse(error) && (
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl text-indigo-500">404</h2>
          <code className="text-slate-400">{error.data}</code>
        </div>
      )}
      {error instanceof Error && (
        <code className="text-slate-400"> Error: {error.message}</code>
      )}
      <Link
        to={ROUTES.HOME}
        className="w-fit text-lg text-indigo-500 outline-none hover:underline focus:underline underline-offset-4"
      >
        ← Back to home
      </Link>
    </div>
  );
};
