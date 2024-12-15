import React from "react";
import { User } from "@/types/types";
import { X } from "lucide-react";


type Props = {
  patient: User;
  setIsViewingDetails: (value: boolean) => void;
  calcAge: (birthDate: string) => number;
};

const PatientDetailsCard: React.FC<Props> = ({ patient, setIsViewingDetails, calcAge }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-[#1e293b] shadow-lg rounded-lg overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Patient Details</h1>
          <button
            onClick={() => setIsViewingDetails(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={patient.profilePicture || "https://via.placeholder.com/150"}
            alt={patient.username || "Patient Avatar"}
            className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {patient.firstName || "First Name"} {patient.lastName || "Last Name"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Age: {calcAge(patient.dateOfBirth)}</p>
            <p className="text-gray-600 dark:text-gray-400">Gender: {patient.gender || "N/A"}</p>
            <p className="text-gray-600 dark:text-gray-400">Blood Type: {patient.medicalHistory?.bloodType || "N/A"}</p>
          </div>
        </div>

        <div>
          {patient.medicalHistory ? (
            <>
              <MedicalHistorySection title="Emergency Contact" content={patient.medicalHistory.emergencyContact} />
              <MedicalHistorySection title="Medical Conditions" content={patient.medicalHistory.medicalConditions} />
              <MedicalHistorySection title="Medications" content={patient.medicalHistory.medications} />
              <MedicalHistorySection title="Surgeries" content={patient.medicalHistory.surgeries} />
              <MedicalHistorySection title="Immunizations" content={patient.medicalHistory.immunizations} />
              <MedicalHistorySection title="Family History" content={patient.medicalHistory.familyHistory} />
              <MedicalHistorySection title="Lifestyle" content={patient.medicalHistory.lifestyle} />
              <MedicalHistorySection title="Allergies" content={patient.medicalHistory.allergies} />
              <MedicalHistorySection title="Screenings" content={patient.medicalHistory.screenings} />
              <MedicalHistorySection title="Mental Health" content={patient.medicalHistory.mentalHealth} />
              <MedicalHistorySection title="Reproductive Health" content={patient.medicalHistory.reproductiveHealth} />
              <MedicalHistorySection title="Current Symptoms" content={patient.medicalHistory.currentSymptoms} />
              <MedicalHistorySection title="Physical Measurements" content={patient.medicalHistory.physicalMeasurements} />
              <MedicalHistorySection title="Insurance" content={patient.medicalHistory.insurance} />
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No medical history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MedicalHistorySection = ({ title, content }: { title: string; content: any }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <div className="text-gray-600 dark:text-gray-400">
        {Array.isArray(content)
          ? content.map((item, index) => (
              <p key={index} className="text-sm">
                {JSON.stringify(item)}
              </p>
            ))
          : typeof content === "object"
          ? Object.entries(content).map(([key, value], index) => (
              <p key={index} className="text-sm capitalize">
                {key}: {String(value)}
              </p>
            ))
          : <p>{content}</p>}
      </div>
    </div>
  );
};

export default PatientDetailsCard;
