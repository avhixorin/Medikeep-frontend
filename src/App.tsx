import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Outlet } from "react-router-dom";
import { persistStore } from "redux-persist";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; 

const persistor = persistStore(store);

const App: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <Outlet />
            <Toaster position="top-center" />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
