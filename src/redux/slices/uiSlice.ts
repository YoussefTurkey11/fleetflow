import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  sidebarHover: boolean;
  sidebarMobile: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  sidebarHover: false,
  sidebarMobile: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleSidebarMobile: (state) => {
      state.sidebarMobile = !state.sidebarMobile;
    },
    setSidebarHover: (state, action) => {
      state.sidebarHover = action.payload;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    closeSidebarMobile: (state) => {
      state.sidebarMobile = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarHover,
  setSidebarOpen,
  toggleSidebarMobile,
  closeSidebarMobile,
} = uiSlice.actions;
export default uiSlice.reducer;
