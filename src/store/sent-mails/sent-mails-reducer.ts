import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SentState {
  sent_data: any[];
}

const initialState: SentState = {
  sent_data: [],
};

type SetFieldPayload<K extends keyof SentState> = {
  name: K;
  value: SentState[K];
};

export const sentSlice = createSlice({
  name: "sent",
  initialState,
  reducers: {
    sentSetFields<K extends keyof SentState>(
      state: any,
      action: PayloadAction<SetFieldPayload<K>>,
    ) {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { sentSetFields } = sentSlice.actions;
export default sentSlice.reducer;
