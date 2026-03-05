import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* 1️⃣ Define State Type */
export interface ComposeState {
  mobile_number: string;
  subject: string;
  to_sent: string;
  to_mail: any[];
  certified_cc: any[];
  cc: any[];
  is_bsa: boolean;
  is_logs: boolean;
  is_copy_mail: boolean;
  is_whatsApp: boolean;
  mail_body: string;
  attachments: any[];
  scan_file_error: string;
  links_file_error: string;
  compose_fields_error: {
    to_sent: string;
    subject: string;
    mail_body: string;
  };
  scan_attachments: any[];
  error_info: Record<string, string>;
}

/* 2️⃣ Initial State */
const initialState: ComposeState = {
  mobile_number: "",
  subject: "",
  to_sent: "",
  to_mail: [],
  certified_cc: [],
  cc: [],
  is_bsa: false,
  is_logs: false,
  is_copy_mail: false,
  is_whatsApp: false,
  mail_body: "",
  attachments: [],
  scan_file_error: "",
  links_file_error: "",
  compose_fields_error: {
    to_sent: "",
    subject: "",
    mail_body: "",
  },
  scan_attachments: [],
  error_info: {},
};

/* 3️⃣ Payload type using keyof */
type ComposeFieldPayload<K extends keyof ComposeState = keyof ComposeState> = {
  name: K;
  value: ComposeState[K];
};

/* 4️⃣ Slice */
export const composeSlice = createSlice({
  name: "compose",
  initialState,
  reducers: {
    composeSetFields: <K extends keyof ComposeState>(
      state: ComposeState,
      action: PayloadAction<ComposeFieldPayload<K>>,
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    composeResetFields: (state) => {
      state.mobile_number = "";
      state.subject = "";
      state.to_sent = "";
      state.is_bsa = false;
      state.is_logs = false;
      state.is_whatsApp = false;
      state.is_copy_mail = false;
      state.mail_body = "";
      state.attachments = [];
      state.is_whatsApp = false;
    },

    composeSetErrors: (
      state,
      action: PayloadAction<Record<string, string>>,
    ) => {
      state.error_info = action.payload;
    },
  },
});

export const { composeSetFields, composeResetFields, composeSetErrors } =
  composeSlice.actions;

export default composeSlice.reducer;
