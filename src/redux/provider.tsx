"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/sonner";
import AuthInitializer from "@/providers/AuthInitializer";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children} <Toaster />
      </AuthInitializer>
    </Provider>
  );
};

export default ReduxProvider;
