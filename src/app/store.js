import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice";
import authReducer from "../features/authSlice"

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    app: userDetail,
    auth: persistedReducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  
});
export const persistor = persistStore(store);
export default store;