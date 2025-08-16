import {
  BrainCircuit,
  ChartColumn,
  CreditCard,
  GalleryVerticalEnd,
  House,
  Key,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  title: [
    {
      name: "PhotoGPT Devs",
      logo: GalleryVerticalEnd,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
      isActive: true,
    },
    {
      title: "API Keys",
      url: "/api-keys",
      icon: Key,
    },
    {
      title: "Usage",
      url: "/usage",
      icon: ChartColumn,
    },
    {
      title: "Billings",
      url: "/billing",
      icon: CreditCard,
    },
    {
      title: "Models",
      url: "/models",
      icon: BrainCircuit,
    },
  ],
};
