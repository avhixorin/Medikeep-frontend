import React from 'react';

interface TestimonialCardProps {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
}

const Card: React.FC<TestimonialCardProps> = ({ testimonial, name, designation, company, image }) => {
  return (
    <div className="max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col space-y-4">
      <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial}"</p>
      <div className="flex items-center space-x-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{designation}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
