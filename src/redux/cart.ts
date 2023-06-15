import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/type";

// interface Items {

// }
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total_price: [],
  } as any,
  reducers: {
    addTocart: (state, action: PayloadAction<Product>) => {
      const product: Product = action.payload;
      const existingItem: any = state.items.find(
        (item: any) => item.id === product.id
      );
      state.total_price.push(Number(product["current_price"]));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromcart: (state, action: PayloadAction<Product>) => {
      const id = action.payload;
      state.items = state.items.filter((item: any) => item.id !== id);
    },
  },
});

export const { addTocart, removeFromcart } = cartSlice.actions;

export default cartSlice.reducer;
