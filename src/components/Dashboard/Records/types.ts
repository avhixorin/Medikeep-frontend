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
};

export interface AiChatThread {
  _id?: string;
  title: string;
  chatThread: AIChatMessage[];
  createdAt: string;
  updatedAt: string;
}
