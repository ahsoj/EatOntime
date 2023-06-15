import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Address } from "../types/type";

const initialState = {
  street_l1: "",
  street_l2: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
  longitude: 0.0,
  latiitude: 0.0,
  fillAddress: false,
} as Address;

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    getAddress: (state, action: PayloadAction<any>) => {
      state.street_l1 = action.payload.address_line1;
      state.street_l2 = action.payload.address_line2;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zip_code = action.payload.postcode;
      state.country = action.payload.country;
      state.longitude = action.payload.lon;
      state.latiitude = action.payload.lat;
    },
    addressPopup: (state, action: PayloadAction<boolean>) => {
      state.fillAddress = action.payload;
    },
  },
});

export const { getAddress, addressPopup } = addressSlice.actions;

export default addressSlice.reducer;
