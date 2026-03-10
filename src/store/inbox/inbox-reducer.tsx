import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SentState {
  inbox_data: any;
}

const initialState: SentState = {
  inbox_data: {},
};

type SetFieldPayload<K extends keyof SentState> = {
  name: K;
  value: SentState[K];
};

export const sentSlice = createSlice({
  name: "sent",
  initialState,
  reducers: {
    inboxSetFields<K extends keyof SentState>(
      state: any,
      action: PayloadAction<SetFieldPayload<K>>,
    ) {
      state[action.payload.name] = action.payload.value;
    },
    inboxResetFields: (state) => {
      state.inbox_data = {};
    },
  },
});

export const { inboxSetFields, inboxResetFields } = sentSlice.actions;
export default sentSlice.reducer;
