import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

export const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook<AppDispatch>
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store;