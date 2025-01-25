import React from "react";
import "./DashboardLoading.css";

const DashboardLoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-screen grid place-items-center bg-tertiary">
      <div className="containerL">
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
      </div>
    </div>
  );
};

export default DashboardLoadingScreen;
