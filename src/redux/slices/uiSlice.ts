import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  sidebarHover: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  sidebarHover: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarHover: (state, action) => {
      state.sidebarHover = action.payload;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarHover, setSidebarOpen } =
  uiSlice.actions;
export default uiSlice.reducer;
