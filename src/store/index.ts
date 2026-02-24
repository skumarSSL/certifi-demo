import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./login/loginSlice";
import InboxReducer from "./inbox/inbox-reducer";
import CommonReducer from "./common/commonSlice";
import ComposeReducer from "./compose/composeSlice";
import ProfileReducer from "./profile/profile-reducer";
import ReverifyReducer from "./reverify/reverify-reducer";
import SentReducer from "./sent-mails/sent-mails-reducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sent_store: SentReducer,
      login_store: LoginReducer,
      inbox_store: InboxReducer,
      common_store: CommonReducer,
      compose_store: ComposeReducer,
      profile_store: ProfileReducer,
      reverify_store: ReverifyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
