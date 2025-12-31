import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../shared/constants/types";

interface State {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: State = {
  isLoggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;