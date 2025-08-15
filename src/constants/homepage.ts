const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

const testimonials = [
  {
    quote:
      "MediKeep’s AI assistant has completely changed how I manage my patients’ health records. I can retrieve the exact document I need in seconds, even during consultations.",
    author: "Dr. Ananya Mehta",
    role: "Cardiologist, CityCare Hospital",
    rating: 5,
  },
  {
    quote:
      "The secure video consultation feature has allowed me to reach patients in rural areas without compromising on quality or privacy.",
    author: "Dr. Rajesh Verma",
    role: "General Practitioner, RuralHealth Network",
    rating: 5,
  },
  {
    quote:
      "MediKeep’s RAG-based search is a lifesaver. It helps me quickly find relevant past reports, lab results, and prescriptions for accurate diagnosis.",
    author: "Dr. Claire Thompson",
    role: "Oncologist, GlobalMed Clinic",
    rating: 5,
  },
  {
    quote:
      "As a patient, I finally feel in control of my medical history. I can chat with my doctor, share my records instantly, and track my treatments all in one place.",
    author: "Ravi Kumar",
    role: "Patient, MediKeep User",
    rating: 5,
  },
  {
    quote:
      "The AI-powered chat and collaboration tools have streamlined our multidisciplinary meetings. We’re more aligned than ever on patient care.",
    author: "Dr. Sofia Williams",
    role: "Head of Neurology, MedAlliance",
    rating: 5,
  },
  {
    quote:
      "Implementation was effortless, and the impact was immediate. We’ve cut down record retrieval time by over 60% and improved patient satisfaction scores.",
    author: "Dr. Mark Anderson",
    role: "Medical Director, PrimeCare Group",
    rating: 5,
  },
];

const monthlyPlans = [
  {
    name: "Basic Care",
    price: "$29",
    description: "Perfect for individual practitioners or small clinics.",
    features: [
      "Up to 50 patient records",
      "AI-powered medical search",
      "Secure chat & file sharing",
      "2GB encrypted storage",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Pro Care",
    price: "$79",
    description: "Ideal for growing practices and multi-specialty teams.",
    features: [
      "Up to 500 patient records",
      "Advanced AI insights & recommendations",
      "HD video consultations",
      "20GB encrypted storage",
      "Priority email support",
      "EHR API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise Health",
    price: "$199",
    description: "For hospitals, networks, and large healthcare organizations.",
    features: [
      "Unlimited patient records",
      "Custom AI model integration",
      "Unlimited HD video calls",
      "Unlimited encrypted storage",
      "24/7 phone & email support",
      "Advanced API access & custom workflows",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
  },
];

const annualPlans = [
  {
    name: "Basic Care",
    price: "$23",
    description: "Perfect for individual practitioners or small clinics.",
    features: [
      "Up to 50 patient records",
      "AI-powered medical search",
      "Secure chat & file sharing",
      "2GB encrypted storage",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Pro Care",
    price: "$63",
    description: "Ideal for growing practices and multi-specialty teams.",
    features: [
      "Up to 500 patient records",
      "Advanced AI insights & recommendations",
      "HD video consultations",
      "20GB encrypted storage",
      "Priority email support",
      "EHR API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise Health",
    price: "$159",
    description: "For hospitals, networks, and large healthcare organizations.",
    features: [
      "Unlimited patient records",
      "Custom AI model integration",
      "Unlimited HD video calls",
      "Unlimited encrypted storage",
      "24/7 phone & email support",
      "Advanced API access & custom workflows",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
  },
];



export { monthlyPlans, annualPlans, testimonials, navLinks };