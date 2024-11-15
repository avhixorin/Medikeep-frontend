export type User = {
    _id: string | null;
    profilePicture?: string;
    username: string;
    fullName: string;
    password: string;
    email: string;
    dateOfBirth: Date | null;
    gender: string;
    phone: string;
    role: string;
    medicalLicenseNumber?: string;
    specialization?: string;
    yearsOfExperience?: number;
    clinicAffiliation?: string[];
    consultationHours?: { start: string; end: string }[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

// Define a type for dayData
export type DayData = number[];




export type Activity = {
    month: string;
    dayData: DayData; 
  }