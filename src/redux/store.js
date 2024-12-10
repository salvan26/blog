import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducers";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;