import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from './reducers'
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore(
  {
    reducer: rootReducer
  }
)

type RootState = ReturnType<typeof rootReducer>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch


export default store;