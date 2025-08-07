import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <div className="w-full h-full">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class">
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Outlet />
              <Toaster position="top-center" />
            </I18nextProvider>
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
