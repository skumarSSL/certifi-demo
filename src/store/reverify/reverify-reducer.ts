import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReverifyFile {
  name: string;
  size: string;
  type: string;
  url: string;
  file_data: string;
  data: string;
}

export interface ReverifyState {
  is_form66: boolean;
  email: string;
  file: ReverifyFile;
  scan_file_error: string;
}

const ReverifyInitialState: ReverifyState = {
  is_form66: false,
  email: "",
  file: {
    name: "",
    size: "",
    type: "",
    url: "",
    file_data: "",
    data: "",
  },
  scan_file_error: "",
};

export const reverifySlice = createSlice({
  name: "reverify",
  initialState: ReverifyInitialState,
  reducers: {
    reverifySetFields: <K extends keyof ReverifyState>(
      state: ReverifyState,
      action: PayloadAction<{
        name: K;
        value: ReverifyState[K];
      }>,
    ) => {
      state[action.payload.name] = action.payload.value;
    },

    reverifyResetFields: (state) => {
      state.email = "";
      state.file = {
        name: "",
        size: "",
        type: "",
        url: "",
        file_data: "",
        data: "",
      };
      state.is_form66 = false;
      state.scan_file_error = "";
    },
  },
});

export const { reverifySetFields, reverifyResetFields } = reverifySlice.actions;
export default reverifySlice.reducer;
