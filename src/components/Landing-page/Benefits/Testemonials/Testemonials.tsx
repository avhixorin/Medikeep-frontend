import React from 'react';
import Marquee from 'react-fast-marquee';
import Card from '../Cards/Card';
import { testimonials } from './testimonials';

const TestimonialCarousel: React.FC = () => {
  return (
    <section className="py-12 dark:bg-gray-900 w-full">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-[2.7rem] md:text-5xl font-helmet font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          What Our Users Say
        </h2>

        <div>

          <Marquee
            gradient={true}
            speed={50}
            pauseOnHover={false}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mx-4">
                <Card
                  testimonial={testimonial.testimonial}
                  name={testimonial.name}
                  designation={testimonial.designation}
                  company={testimonial.company}
                  image={testimonial.image}
                />
              </div>
            ))}
          </Marquee>

          {/* Second Marquee moving in opposite direction */}
          <Marquee
            gradient={true}
            speed={50}
            pauseOnHover={false}
            direction="right"
            className="mt-8"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mx-4">
                <Card
                  testimonial={testimonial.testimonial}
                  name={testimonial.name}
                  designation={testimonial.designation}
                  company={testimonial.company}
                  image={testimonial.image}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
