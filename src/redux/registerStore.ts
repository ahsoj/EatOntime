import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RegisterFormData {
  email?: string;
  phone?: string;
  res_name?: string;
  res_owner?: string;
  password?: string;
  street?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
}
const registerFormState: RegisterFormData = {
  email: "",
  phone: "",
  res_name: "",
  res_owner: "",
  password: "",
  street: "",
  state: "",
  city: "",
  zip_code: "",
  country: "",
  longitude: 0.0,
  latitude: 0.0,
};

const registerSlice = createSlice({
  name: "merchant",
  initialState: registerFormState,
  reducers: {
    saveAccountForm: (state, action: PayloadAction<RegisterFormData>) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.res_name = action.payload.res_name;
      state.res_owner = action.payload.res_owner;
      state.password = action.payload.password;
    },
    saveAccountAddress: (state, action: PayloadAction<RegisterFormData>) => {
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.street = action.payload.street;
      state.zip_code = action.payload.zip_code;
      state.country = action.payload.country;
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
  },
});

export const { saveAccountForm, saveAccountAddress } = registerSlice.actions;
export default registerSlice.reducer;
