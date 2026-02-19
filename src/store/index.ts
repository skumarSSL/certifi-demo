import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./login/loginSlice";
import SentReducer from "./sent-mails/sent-mails-reducer";
import ComposeReducer from "./compose/composeSlice";
import CommonReducer from "./common/commonSlice";
import ProfileReducer from "./profile/profile-reducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      login_store: LoginReducer,
      common_store: CommonReducer,
      compose_store: ComposeReducer,
      profile_store: ProfileReducer,
      sent_store: SentReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
