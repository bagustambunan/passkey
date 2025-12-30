import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WindowInstance {
  id: string;
  windowKey: string;
}

interface State {
  windows: WindowInstance[];
}

const initialState: State = {
  windows: [],
};

export const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openWindow: (state, action: PayloadAction<string>) => {
      const windowId = `${action.payload}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      state.windows.push({
        id: windowId,
        windowKey: action.payload,
      });
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      state.windows = state.windows.filter(window => window.id !== action.payload);
    },
  },
});

export const { openWindow, closeWindow } = windowsSlice.actions;
export default windowsSlice.reducer;