import { createStore } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  auth: {
    isLoggedIn: false,
    isSubscribed: false,
    token: "",
    email: "",
    subscription_ends_at: "",
    isSubscriptionCanceled: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "isLoggedIn":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoggedIn: action.payload,
        },
      };
    case "isSubscribed":
      return {
        ...state,
        auth: {
          ...state.auth,
          isSubscribed: action.payload,
        },
      };
    case "token":
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload,
        },
      };
    case "email":
      return {
        ...state,
        auth: {
          ...state.auth,
          email: action.payload,
        },
      };
    case "subscription_ends_at":
      return {
        ...state,
        auth: {
          ...state.auth,
          subscription_ends_at: action.payload,
        },
      };
    case "isSubscriptionCanceled":
      return {
        ...state,
        auth: {
          ...state.auth,
          isSubscriptionCanceled: action.payload,
        },
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
