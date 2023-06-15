import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const routeParamsSlice = createSlice({
  name: "routeParams",
  initialState: {
    id: "",
  },
  reducers: {
    getParams: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { getParams } = routeParamsSlice.actions;
export default routeParamsSlice.reducer;
