import React from 'react';
import { Provider } from 'react-redux';
import store from './components/Redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Outlet, useLocation } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { AnimatePresence, motion } from 'framer-motion';

const persistor = persistStore(store);

const pageTransition = {
  initial: { opacity: 0, x: '-100vw' },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: '100vw', transition: { duration: 0.5 } },
};

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full h-full">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
