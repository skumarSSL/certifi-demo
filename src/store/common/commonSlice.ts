import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ActiveState {
  session_token: string;
}

const CommonInitialState: ActiveState = {
  session_token: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState: CommonInitialState,
  reducers: {
    commonSetFields: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.session_token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { commonSetFields } = commonSlice.actions;

export default commonSlice.reducer;
