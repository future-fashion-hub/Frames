import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/model/authSlice";
import { themeSlice } from "@/features/theme/model/themeSlice";

export const rootReducer = combineSlices(
  authSlice,
  themeSlice
)