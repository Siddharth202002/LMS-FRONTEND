import { configurestore } from "@reactjs/toolkit";

import { authSliceReducer } from "./Slices/AuthSlice";

const store = configurestore({
  reducer: {
    auth: authSliceReducer,
  },
  devTools: true,
});

export default store;
