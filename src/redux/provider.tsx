"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/sonner";
import AuthInitializer from "@/providers/AuthInitializer";
import { ThemeProvider } from "@/providers/ThemeProvider";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children} <Toaster />
        </ThemeProvider>
      </AuthInitializer>
    </Provider>
  );
};

export default ReduxProvider;
