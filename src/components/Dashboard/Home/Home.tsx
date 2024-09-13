import React from 'react';
const Home: React.FC = () => {
  return (
    <div className="bg-[#FFFCF8] w-full h-full flex flex-col md:flex-row">
      <section className="w-full md:w-[65%] min-h-[100dvh]">

      </section>
      
      <section className="relative w-full md:w-[35%] min-h-[100dvh] bg-[#303030] flex-col justify-center items-center">
        <div className="w-full md:h-[35%] h-1/2">
          <div></div>
          <div></div>
        </div>
        
        <div className="w-full md:h-[65%] h-1/2 flex">
          <div className="w-full md:w-1/2 h-full"></div>
          <div className="hidden md:block w-1/2 h-full">
          <img src="https://res.cloudinary.com/avhixorin/image/upload/v1726077267/bmi_u3fqlc.png" className="w-full h-full object-contain p-4" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
