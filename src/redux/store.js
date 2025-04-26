import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice";  // Make sure this is correct

const store = configureStore({
  reducer: {
    user: userReducer,  // Set app to the userReducer
  },
});

export default store;
