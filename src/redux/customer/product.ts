import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, Order } from "../../types/type";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8888/api/" }),
  tagTypes: ["Products", "Orders"],
  endpoints: (builder) => ({
    // get menu items
    getProducts: builder.query<Product[], void>({
      query: () => `menu_items/`,
    }),

    //retrieve products
    retrieveProducts: builder.query<Product[], object>({
      query: (itemId) => `menu_items/?=item${itemId}`,
    }),

    // create orders
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (body) => ({
        url: `order/`,
        method: "POST",
        body,
      }),
    }),

    // remove
    removeOrder: builder.mutation<Order, Partial<Order>>({
      query: (body) => ({
        url: `order/`,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
