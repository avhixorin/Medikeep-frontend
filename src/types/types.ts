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
  connections?: User[];
  connectionRequests?: User[];
  notifications?: {
    type: string;
    message: string;
    time: string;
    read: boolean;
  }[];
  messages? : Messages;
  appointments?: Appointment[];
  about?: string;
  medicalHistory?: MedicalHistory;
  appointmentRequests?: Appointment[];
  medicalLicenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  clinicAffiliation?: string[];
  patients?: User[];
  doctors?: User[];
  medicalRecords?: MedicalRecord[];
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
  settingPreferences?: {
    general: {
      firstName: string;
      lastName: string;
      about: string;
      username: string;
      email: string;
      theme: string;
      language: string;
      accountPrivacy: string;
    },
    security: {
      twoFactorAuth: boolean;
      isAccountActive: boolean;
    },
    billing: {
      plan: string;
      creditCard: {
        cardNumber: string;
        expiryDate: string;
        cvv: string;
      },
      billingAddress: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
      },
      billingHistory: {
        date: Date;
        amount: number;
        status: string;
      }
    },
    notifications: {
      isEnabled: boolean;
      emailNotifications: boolean;
      pushNotifications: boolean;
      smsNotifications: boolean;
      promotionalEmails: boolean;
      notificationSound: boolean;
      weeklyDigest: boolean;
    }
  };
  sharingLink?: string;
  lastSeen?: Date;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type MedicalHistory ={
  bloodType: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  medicalConditions: {
    name: string;
    diagnosisDate: string;
    status: "active" | "inactive" | "resolved";
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
  }[];
  surgeries: {
    procedure: string;
    date: string;
    outcome: string;
  }[];
  immunizations: {
    vaccine: string;
    date: string;
    boosterDate: string;
  }[];
  familyHistory: {
    relationship: string;
    conditions: string[];
    ageOnset: number;
  }[];
  lifestyle: {
    smokingStatus: "current" | "former" | "never";
    alcoholConsumption: "none" | "occasional" | "moderate" | "heavy";
    diet: "vegetarian" | "vegan" | "pescatarian" | "omnivore";
    exerciseFrequency: "daily" | "weekly" | "monthly" | "never";
    substanceUse: "yes" | "no";
  };
  allergies: {
    allergen: string;
    reaction: string;
    type: "food" | "drug" | "environmental" | "insect" | "latex" | "mold" | "pet" | "pollen";
  }[];
  screenings: {
    type: string;
    date: string;
    result: string;
  }[];
  mentalHealth: {
    condition: string;
    diagnosisDate: string;
    treatment: string;
  }[];
  reproductiveHealth: {
    pregnencies: number;
    menstrualHistory: string;
    contraceptiveUse: string;
  };
  currentSymptoms: {
    symptom: string;
    painScale: number;
    frequency: string;
  }[];
  physicalMeasurements: {
    height: number;
    weight: number;
    bloodPressure: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    validitiy: string;
  };

}

export type MedicalRecord = {
  _id: string;
  title?: string;
  notes?: string;
  fileName: string;
  fileType: string;
  size: number
  url: string;
  uploadedBy: User;
  patient: User;
  doctor: User;
  uploadedAt: Date;
}

export type DayData = number[];

export type Activity = {
  month: string;
  dayData: DayData;
};

export type connectionResponse = {
  statusCode: number;
  message: string;
  data: {
    to: string;
  }
}

export type notification = {
  type: string;
  message: string;
  read: boolean;
  from?: User;
}

export type acceptConnectionResponse = {
  statusCode: number;
  message: string;
  data: {
    requester: User;
  }
}

export type rejectConnectionResponse = {
  statusCode: number;
  message: string;
  data: {
    requesterId: string;
  }
}

export type AcceptedConnection = {
  message: string;
  accepter: User;
}

export type RejectedConnection = {
  message: string;
  rejecterId: string;
}

export type PrivateMessage = {
  messageId: string;
  message: string;
  sender: User;
}

export type Messages = {
  friendId: string;
  chatHistory: PrivateMessage[];
}[]

export type MessageState = {
  chatHistories: {
    [friendId: string]: PrivateMessage[];
  };
};

export enum AppointmentStatus {
  "IDLE" = "request",
  "REQUESTED" = "requested" ,
  "SCHEDULED" = "scheduled" , 
  "COMPLETED" = "completed" , 
  "RESCHEDULED" = "rescheduled" , 
  "CANCELLED" = "cancelled"
}

export type Appointment = {
  _id: string;
  patient: User;
  doctor: User;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
}

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
  method?: string;
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
}

/**
 * Parameters for the fetchWithAuth function.
 */
export interface FetchWithAuthParams {
  url: string;
  options?: FetchOptions;
}