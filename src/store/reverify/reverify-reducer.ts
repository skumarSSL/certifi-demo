import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReverifyState {
  is_form66: boolean;
  email: string;
  file: any;
  scan_file_error: string;
}

const ReverifyInitialState: ReverifyState = {
  is_form66: false,
  email: "",
  file: null,
  scan_file_error: "",
};

export const reverifySlice = createSlice({
  name: "reverify",
  initialState: ReverifyInitialState,
  reducers: {
    reverifySetFields: (
      state,
      action: PayloadAction<{
        name: keyof ReverifyState;
        value: ReverifyState[keyof ReverifyState];
      }>,
    ) => {
      state[action.payload.name] = action.payload.value;
    },

    reverifyResetFields: (state) => {
      state.email = "";
      state.file = null;
      state.is_form66 = false;
      state.scan_file_error = "";
    },
  },
});

export const { reverifySetFields, reverifyResetFields } = reverifySlice.actions;
export default reverifySlice.reducer;
