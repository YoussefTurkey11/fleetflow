"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/sonner";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children} <Toaster />
    </Provider>
  );
};

export default ReduxProvider;
