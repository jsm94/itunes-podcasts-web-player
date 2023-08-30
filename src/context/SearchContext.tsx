import { createContext, useContext, useState } from "react";

export enum SearchActionTypes {
  SET = "set",
}

const initialState: string = "";

const SearchContext = createContext(initialState);

const SearchDispatchContext = createContext((() => {}) as React.Dispatch<
  React.SetStateAction<string>
>);

type SearchProviderProps = {
  children: React.ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [state, dispatch] = useState(initialState);
  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

export const useSearchDispatch = () => {
  return useContext(SearchDispatchContext);
};
