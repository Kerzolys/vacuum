import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import userReducer from '../../features/userSlice.ts/userSlice'
import { eventsApi } from '../../features/events/events';

export const rootReducer = combineReducers({
  user: userReducer,
  [eventsApi.reducerPath]: eventsApi.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook<AppDispatch>
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store;