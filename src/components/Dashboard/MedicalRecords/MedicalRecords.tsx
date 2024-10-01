import React from 'react';

const MedicalRecords: React.FC = () => {
  // Example patient data
  const patientData = {
    name: "John Doe",
    dob: "01/01/1980",
    gender: "Male",
    contact: "john.doe@example.com",
    insurance: "XYZ Insurance",
    emergencyContact: "Jane Doe (Wife) - 123-456-7890",
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      bloodSugar: "95 mg/dL",
      height: "175 cm",
      weight: "70 kg",
      bmi: "22.9",
      hip: "38 inches",
      waist: "32 inches",
      chest: "40 inches",
    },
    medicalHistory: {
      conditions: [
        "Diabetes (Type 2) - Diagnosed in 2010",
        "Hypertension - Diagnosed in 2015"
      ],
      surgeries: [
        "Appendectomy - 2005",
        "Knee Surgery - 2018"
      ],
      familyHistory: {
        mother: "Diabetes",
        father: "Heart Disease"
      }
    },
    medications: [
      { name: "Metformin", dose: "500 mg", frequency: "Twice daily" },
      { name: "Amlodipine", dose: "5 mg", frequency: "Once daily" }
    ],
    allergies: [
      "Penicillin - Causes rash"
    ]
  };

  return (
    <div className="w-full h-full p-10 text-secondary">
      {/* Patient Info */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Patient Information</h1>
        <p><strong>Name:</strong> {patientData.name}</p>
        <p><strong>Date of Birth:</strong> {patientData.dob}</p>
        <p><strong>Gender:</strong> {patientData.gender}</p>
        <p><strong>Contact:</strong> {patientData.contact}</p>
        <p><strong>Insurance:</strong> {patientData.insurance}</p>
        <p><strong>Emergency Contact:</strong> {patientData.emergencyContact}</p>
      </section>

      {/* Health Metrics */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Health Metrics</h2>
        <p><strong>Blood Pressure:</strong> {patientData.vitals.bloodPressure}</p>
        <p><strong>Heart Rate:</strong> {patientData.vitals.heartRate}</p>
        <p><strong>Blood Sugar:</strong> {patientData.vitals.bloodSugar}</p>
        <p><strong>Height:</strong> {patientData.vitals.height}</p>
        <p><strong>Weight:</strong> {patientData.vitals.weight}</p>
        <p><strong>BMI:</strong> {patientData.vitals.bmi}</p>
        <p><strong>Hip Circumference:</strong> {patientData.vitals.hip}</p>
        <p><strong>Waist Circumference:</strong> {patientData.vitals.waist}</p>
        <p><strong>Chest Circumference:</strong> {patientData.vitals.chest}</p>
      </section>

      {/* Medical History */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Medical History</h2>
        <h3 className="text-xl font-semibold">Chronic Conditions</h3>
        <ul>
          {patientData.medicalHistory.conditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4">Past Surgeries</h3>
        <ul>
          {patientData.medicalHistory.surgeries.map((surgery, index) => (
            <li key={index}>{surgery}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4">Family Medical History</h3>
        <p><strong>Mother:</strong> {patientData.medicalHistory.familyHistory.mother}</p>
        <p><strong>Father:</strong> {patientData.medicalHistory.familyHistory.father}</p>
      </section>

      {/* Medications */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Medications</h2>
        <ul>
          {patientData.medications.map((med, index) => (
            <li key={index}>
              {med.name} – {med.dose}, {med.frequency}
            </li>
          ))}
        </ul>
      </section>

      {/* Allergies */}
      <section>
        <h2 className="text-3xl font-bold mb-2">Allergies</h2>
        <ul>
          {patientData.allergies.map((allergy, index) => (
            <li key={index}>{allergy}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MedicalRecords;
