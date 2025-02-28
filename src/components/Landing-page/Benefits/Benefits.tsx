import React from 'react';
import Testimonials from './Testemonials/Testemonials';

const Benefits: React.FC = () => {
  return (
    <section className="pb-20 bg-blue-50 min-h-screen flex justify-center items-center" id="benefits">
      <div className="w-full">
        <Testimonials />
      </div>
    </section>
  );
};

export default Benefits;
