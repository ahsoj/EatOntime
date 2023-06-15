import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerStore";
import routeParamsReducer from "./routeParams";
import cartReducer from "./cart";
import { productApi } from "./customer/product";
import addressReducer from "./address";

export const store = configureStore({
  reducer: {
    formData: registerReducer,
    routeParams: routeParamsReducer,
    cartAction: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
