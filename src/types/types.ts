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
    read: boolean;
  }[];
  messages? : Messages;
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