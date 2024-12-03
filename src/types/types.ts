export type User = {
  role: string;
  _id?: string | null;
  profilePicture?: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  theme?: "light" | "dark";
  medicalLicenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  clinicAffiliation?: string[];
  patients?: string[];
  acceptedTerms?: boolean;
  consultations?: {
    patientId: string;
    date: Date;
    notes: string;
    prescription: string;
  }[];

  availability?: {
    days: string[];
    timeSlots: string[];
  };

  clinicalAddress?: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

// Define a type for dayData
export type DayData = number[];

export type Activity = {
  month: string;
  dayData: DayData;
};
