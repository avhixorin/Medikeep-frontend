import React from 'react'
import { CheckCircle } from 'lucide-react'

interface Plan {
  name: string
  price: string
  description: string
  features: string[]
}

interface PricingCardProps {
  plan: Plan
  isPopular?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isPopular = false }) => (
  <div className={`relative cursor-pointer flex flex-col justify-between p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${isPopular ? 'border-2 border-blue-500' : ''}`}>
    {isPopular && (
      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
        Most Popular
      </div>
    )}
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-4">{plan.description}</p>
      <div className="text-4xl font-bold text-blue-600 mb-6">
        {plan.price}<span className="text-lg font-normal text-gray-600">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out transform">
      Subscribe to {plan.name}
    </button>
  </div>
)

const Pricing: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Basic",
      price: "$10",
      description: "Perfect for individuals just starting out",
      features: [
        "Consultation scheduling",
        "Access to 10 health records",
      ],
    },
    {
      name: "Standard",
      price: "$25",
      description: "Great for regular users with growing needs",
      features: [
        "All Basic features",
        "Unlimited health records",
        "Priority support",
      ],
    },
    {
      name: "Premium",
      price: "$50",
      description: "For those who need comprehensive care",
      features: [
        "All Standard features",
        "24/7 doctor access",
        "Advanced health tracking tools",
      ],
    },
  ]

  return (
    <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
        <h2 className="text-[2.6rem] font-helmet font-bold text-center text-gray-800 mb-10">Pricing Plans</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Choose the perfect plan for your healthcare needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} isPopular={index === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
