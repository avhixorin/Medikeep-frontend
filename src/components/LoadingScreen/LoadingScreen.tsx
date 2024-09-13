import React from 'react';
import './Loading.css'

const LoadingScreen: React.FC = () => {
  return (
    <div className='w-full h-screen grid place-items-center bg-tertiary'> 
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>

    </div>
    
  );
};

export default LoadingScreen;
