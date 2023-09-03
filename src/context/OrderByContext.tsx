import { createContext, useContext, useReducer } from "react";

export enum OrderByActionTypes {
  SET_PODCASTS_ORDER = "set_podcasts_order",
  SET_EPISODES_ORDER = "set_episodes_order",
}

export enum Orders {
  DEFAULT = "orderBy",
  RELEASE_DATE = "releaseDate",
}

export type OrderByPayload = {
  order: Orders;
};

export type OrderByState = {
  podcastsOrder: Orders;
  episodesOrder: Orders;
};

export type OrderByAction = {
  type: OrderByActionTypes;
  payload?: OrderByPayload;
};

const initialState: OrderByState = {
  podcastsOrder: Orders.DEFAULT,
  episodesOrder: Orders.DEFAULT,
};

const OrderByReducer = (state: OrderByState, action: OrderByAction) => {
  switch (action.type) {
    case OrderByActionTypes.SET_PODCASTS_ORDER: {
      return { ...state, podcastsOrder: action.payload!.order };
    }
    case OrderByActionTypes.SET_EPISODES_ORDER: {
      return { ...state, episodesOrder: action.payload!.order };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const OrderByContext = createContext(initialState);

const OrderByDispatchContext = createContext(
  (() => {}) as React.Dispatch<OrderByAction>
);

type OrderByProviderProps = {
  children: React.ReactNode;
};

export const OrderByProvider = ({ children }: OrderByProviderProps) => {
  const [state, dispatch] = useReducer(OrderByReducer, initialState);

  return (
    <OrderByContext.Provider value={state}>
      <OrderByDispatchContext.Provider value={dispatch}>
        {children}
      </OrderByDispatchContext.Provider>
    </OrderByContext.Provider>
  );
};

export const useOrderByContext = () => {
  return useContext(OrderByContext);
};

export const useOrderByDispatch = () => {
  return useContext(OrderByDispatchContext);
};
