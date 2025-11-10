import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/model/authSlice";

export const rootReducer = combineSlices(
  authSlice
)