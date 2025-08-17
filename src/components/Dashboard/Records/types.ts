import { User } from "@/types/types";

export type MedicalRecord = {
  _id: string;
  title?: string;
  notes?: string;
  fileName: string;
  fileType: string;
  size: number;
  url: string;
  uploadedBy: User;
  patient: User;
  doctor: User;
  uploadedAt: Date;
};

export type AIChatMessage = {
    _id?: string;
    role: "user" | "assistant";
    content: string;
    sources?: string[];
    createdAt?: Date;
}

export const mockAIChatMessages: AIChatMessage[] = [
  {
    _id: "1",
    role: "user",
    content: "What are the symptoms of flu?",
    createdAt: new Date("2024-06-01T10:00:00Z"),
  },
  {
    _id: "2",
    role: "assistant",
    content: "Common symptoms of flu include fever, cough, sore throat, runny nose, body aches, and fatigue.",
    sources: ["https://www.cdc.gov/flu/symptoms/index.html"],
    createdAt: new Date("2024-06-01T10:00:02Z"),
  },
  {
    _id: "3",
    role: "user",
    content: "How can I prevent getting the flu?",
    createdAt: new Date("2024-06-01T10:01:00Z"),
  },
  {
    _id: "4",
    role: "assistant",
    content: "You can help prevent the flu by getting vaccinated annually, washing your hands frequently, and avoiding close contact with sick individuals.",
    sources: ["https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)"],
    createdAt: new Date("2024-06-01T10:01:03Z"),
  }
];

