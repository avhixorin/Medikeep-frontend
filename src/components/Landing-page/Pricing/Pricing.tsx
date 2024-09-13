import React from "react";

const plans = [
  { name: "Basic", price: "Free", features: ["Feature 1", "Feature 2", "Feature 3"] },
  { name: "Pro", price: "$9.99/month", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
  { name: "Premium", price: "$19.99/month", features: ["All Features", "Priority Support"] }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="pricing">
      <h2 className="text-3xl font-bold text-center text-gray-800">Choose Your Plan</h2>
      <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
            <p className="mt-4 text-3xl font-bold text-gray-800">{plan.price}</p>
            <ul className="mt-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600">{feature}</li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Get Started</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
