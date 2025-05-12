// import storage from "redux-persist/lib/storage";
// import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";

// import AuthReducer from "./reducers/AuthReducer";
// import CartReducer from "./reducers/CartReducer";

// const persistConfig = {
//   key: "vietpro",
//   storage,
//   // whitelist: ["cart", "auth"], // Đảm bảo chỉ lưu trữ reducer cần thiết
// };

// const persistCartReducer = persistReducer(persistConfig, CartReducer);
// const persistAuthReducer = persistReducer(persistConfig, AuthReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistAuthReducer,
//     cart: persistCartReducer,
//   },
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware({
//   //     serializableCheck: {
//   //       // Bỏ qua các hành động từ redux-persist
//   //       ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//   //     },
//   //   }),
// });

// export const persistor = persistStore(store);

import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import AuthReducer from "./reducers/AuthReducer";
import CartReducer from "./reducers/CartReducer";

const persistConfig = {
  key: "vietpro",
  storage,
  // whitelist: ["cart", "auth"], // Tùy chọn nếu bạn chỉ muốn lưu 1 số reducer
};

const persistCartReducer = persistReducer(persistConfig, CartReducer);
const persistAuthReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    cart: persistCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action nội bộ của redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
