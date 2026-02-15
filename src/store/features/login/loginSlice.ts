import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CredentialState {
  user_name: string;
  password: string;
  is_logged_in: boolean;
  show_profile: boolean;
  error_info: Record<string, string>;
  settings_data: any;
  session_expiry: any;
  is_sidebar: boolean;
  is_dark_mode: boolean;
}

const CredentialInitialState: CredentialState = {
  user_name: "",
  password: "",
  is_logged_in: false,
  error_info: {},
  show_profile: false,
  settings_data: {
    email: "",
    mob_verify: true,
    mobile: "",
  },
  session_expiry: { time: 0 },
  is_dark_mode: false,
  is_sidebar: true,
};

export const LoginReducer = createSlice({
  name: "login",
  initialState: CredentialInitialState,
  reducers: {
    loginSetCredentials: (
      state: any,
      action: PayloadAction<{ name: string; value: any }>,
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload.name] = action.payload.value;
      console.log("reducer", state);
    },
    loginSetErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.error_info = action.payload;
    },
    loginDeleteError: (state, action: PayloadAction<{ name: string }>) => {
      delete state.error_info[action.payload.name];
    },
    loginSettingsData: (state, action: any) => {
      state.settings_data = action.payload;
    },
    setSideBar: (state, action: PayloadAction<boolean>) => {
      state.is_sidebar = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.is_dark_mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginSetCredentials,
  loginSetErrors,
  loginDeleteError,
  loginSettingsData,
  setSideBar,
  setDarkMode,
} = LoginReducer.actions;

export default LoginReducer.reducer;
