import React from 'react';
import Testimonials from './Testemonials/Testemonials'; // Adjust the path as needed
// import Reasons from './Reasons/Reasons';

const Benefits: React.FC = () => {
  return (
    <section className="pb-20 bg-blue-50">
      {/* <Reasons /> */}
      <div className="w-full">
        <Testimonials />
      </div>
    </section>
  );
};

export default Benefits;
