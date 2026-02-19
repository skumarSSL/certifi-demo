import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  profile_data: any;
  state_list: any;
  profile_pic: string;
}

const CommonInitialState: ProfileState = {
  profile_data: null,
  profile_pic: "",
  state_list: [
    { state: "Jammu & Kashmir", stateValue: "01" },
    { state: "Himachal Pradesh", stateValue: "02" },
    { state: "Punjab", stateValue: "03" },
    { state: "Chandigarh", stateValue: "04" },
    { state: "Uttarakhand", stateValue: "05" },
    { state: "Haryana", stateValue: "06" },
    { state: "Delhi", stateValue: "07" },
    { state: "Rajasthan", stateValue: "08" },
    { state: "Uttar Pradesh", stateValue: "09" },
    { state: "Bihar", stateValue: "10" },
    { state: "Sikkim", stateValue: "11" },
    { state: "Arunachal Pradesh", stateValue: "12" },
    { state: "Nagaland", stateValue: "13" },
    { state: "Manipur", stateValue: "14" },
    { state: "Mizoram", stateValue: "15" },
    { state: "Tripura", stateValue: "16" },
    { state: "Meghalaya", stateValue: "17" },
    { state: "Assam", stateValue: "18" },
    { state: "West Bengal", stateValue: "19" },
    { state: "Jharkhand", stateValue: "20" },
    { state: "Odisha", stateValue: "21" },
    { state: "Chhattisgarh", stateValue: "22" },
    { state: "Madhya Pradesh", stateValue: "23" },
    { state: "Gujarat", stateValue: "24" },
    { state: "Daman & Diu", stateValue: "25" },
    { state: "Dadra & Nagar Haveli & Daman & Diu", stateValue: "26" },
    { state: "Maharashtra", stateValue: "27" },
    { state: "Karnataka", stateValue: "29" },
    { state: "Goa", stateValue: "30" },
    { state: "Lakshdweep", stateValue: "31" },
    { state: "Kerala", stateValue: "32" },
    { state: "Tamil Nadu", stateValue: "33" },
    { state: "Puducherry", stateValue: "34" },
    { state: "Andaman & Nicobar Islands", stateValue: "35" },
    { state: "Telangana", stateValue: "36" },
    { state: "Andhra Pradesh", stateValue: "37" },
    { state: "Ladakh", stateValue: "38" },
    { state: "Other Territory", stateValue: "97" },
  ],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: CommonInitialState,
  reducers: {
    profileGetData: (state, action: any) => {
      state.profile_data = action.payload;
    },
    profileSetFields: (
      state,
      action: PayloadAction<{ name: string; value: any }>,
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.profile_data[action.payload.name] = action.payload.value;
    },
    profileSetPic: (state, action: PayloadAction<string>) => {
      state.profile_pic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { profileGetData, profileSetFields, profileSetPic } =
  profileSlice.actions;

export default profileSlice.reducer;
