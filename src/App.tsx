import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Outlet } from "react-router-dom";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

const App: React.FC = () => {
  // useEffect(() => {
  //   const lenis = new Lenis();
    
  
  //   let animationFrameId: number;
  
  //   function raf(time: number) {
  //     lenis.raf(time);
  //     animationFrameId = requestAnimationFrame(raf);
  //   }
  
  //   animationFrameId = requestAnimationFrame(raf);
  
  //   // Handle pausing Lenis on scrollable areas
  //   const handleMouseEnter = (e: Event) => {
  //     if ((e.target as HTMLElement).closest(".scroll-exclude")) {
  //       lenis.stop(); // Pause Lenis scrolling
  //     }
  //   };
  
  //   const handleMouseLeave = (e: Event) => {
  //     if ((e.target as HTMLElement).closest(".scroll-exclude")) {
  //       lenis.start(); // Resume Lenis scrolling
  //     }
  //   };
  
  //   document.addEventListener("mouseenter", handleMouseEnter, true);
  //   document.addEventListener("mouseleave", handleMouseLeave, true);
  
  //   return () => {
  //     cancelAnimationFrame(animationFrameId);
  //     document.removeEventListener("mouseenter", handleMouseEnter, true);
  //     document.removeEventListener("mouseleave", handleMouseLeave, true);
  //   };
  // }, []);
  

  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 dark:from-blue-800 dark:via-blue-700 dark:to-blue-900">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Outlet />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
