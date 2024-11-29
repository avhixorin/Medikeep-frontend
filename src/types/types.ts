export type User = {
  _id?: string | null;
  profilePicture?: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  theme?: "light" | "dark";
  role: string;
  medicalLicenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  clinicAffiliation?: string[];
  patients?: string[];
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
