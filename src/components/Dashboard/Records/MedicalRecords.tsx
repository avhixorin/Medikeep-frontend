import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const MedicalRecords = () => {
  const medicalHistory = useSelector((state: RootState) => state.auth.user?.medicalHistory);
  return (
    <Card className="w-full h-full p-6 shadow-md bg-transparent">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Patient Medical Records</CardTitle>
      </CardHeader>
    {
      medicalHistory ? (
        <ScrollArea className="h-[70vh]">
        <CardContent>
          <div className="mb-6">
            <Label className="font-bold text-secondary">Emergency Contact</Label>
            <div className="mt-2 space-y-1">
              <p>
                <strong>Name:</strong> {medicalHistory.emergencyContact.name || "N/A"}
              </p>
              <p>
                <strong>Relationship:</strong> {medicalHistory.emergencyContact.relationship || "N/A"}
              </p>
              <p>
                <strong>Phone Number:</strong> {medicalHistory.emergencyContact.phoneNumber || "N/A"}
              </p>
            </div>
          </div>
          <Separator />

          {/* Medical Conditions */}
          <div className="mb-6">
            <Label className="font-bold text-secondary">Medical Conditions</Label>
            {medicalHistory.medicalConditions.length > 0 ? (
              medicalHistory.medicalConditions.map((condition, index) => (
                <div key={index} className="mt-2 space-y-1">
                  <p><strong>Condition:</strong> {condition.name || "Unknown"}</p>
                  <p><strong>Diagnosis Date:</strong> {condition.diagnosisDate || "Unknown"}</p>
                  <p><strong>Status:</strong> {condition.status || "Unknown"}</p>
                </div>
              ))
            ) : (
              <p>No recorded medical conditions.</p>
            )}
          </div>
          <Separator />

          {/* Medications */}
          <div className="mb-6">
            <Label className="font-bold text-secondary">Medications</Label>
            {medicalHistory.medications.length > 0 ? (
              medicalHistory.medications.map((medication, index) => (
                <div key={index} className="mt-2 space-y-1">
                  <p><strong>Medication:</strong> {medication.name || "Unknown"}</p>
                  <p><strong>Dosage:</strong> {medication.dosage || "Unknown"}</p>
                  <p><strong>Frequency:</strong> {medication.frequency || "Unknown"}</p>
                  <p><strong>Start Date:</strong> {medication.startDate || "Unknown"}</p>
                  <p><strong>End Date:</strong> {medication.endDate || "Ongoing"}</p>
                </div>
              ))
            ) : (
              <p>No medication records available.</p>
            )}
          </div>
          <Separator />

          {/* Surgeries */}
          <div className="mb-6">
            <Label className="font-bold text-secondary">Surgeries</Label>
            {medicalHistory.surgeries.length > 0 ? (
              medicalHistory.surgeries.map((surgery, index) => (
                <div key={index} className="mt-2 space-y-1">
                  <p><strong>Procedure:</strong> {surgery.procedure || "Unknown"}</p>
                  <p><strong>Date:</strong> {surgery.date || "Unknown"}</p>
                  <p><strong>Outcome:</strong> {surgery.outcome || "Unknown"}</p>
                </div>
              ))
            ) : (
              <p>No surgical history available.</p>
            )}
          </div>
          <Separator />

          {/* Immunizations */}
          <div className="mb-6">
            <Label className="font-bold text-secondary">Immunizations</Label>
            {medicalHistory.immunizations.length > 0 ? (
              medicalHistory.immunizations.map((immunization, index) => (
                <div key={index} className="mt-2 space-y-1">
                  <p><strong>Vaccine:</strong> {immunization.vaccine || "Unknown"}</p>
                  <p><strong>Date:</strong> {immunization.date || "Unknown"}</p>
                  <p><strong>Booster Date:</strong> {immunization.boosterDate || "N/A"}</p>
                </div>
              ))
            ) : (
              <p>No immunization records available.</p>
            )}
          </div>
          <Separator />

          {/* Repeat similar structure for remaining fields */}
          {/* Example: Family History */}
          <div className="mb-6">
            <Label className="font-bold text-secondary">Family History</Label>
            {medicalHistory.familyHistory.length > 0 ? (
              medicalHistory.familyHistory.map((history, index) => (
                <div key={index} className="mt-2 space-y-1">
                  <p><strong>Relationship:</strong> {history.relationship || "Unknown"}</p>
                  <p><strong>Conditions:</strong> {history.conditions?.join(", ") || "None"}</p>
                  <p><strong>Age of Onset:</strong> {history.ageOnset || "Unknown"}</p>
                </div>
              ))
            ) : (
              <p>No family history available.</p>
            )}
          </div>
          <Separator />
        </CardContent>
      </ScrollArea>
      ) : (
        <CardContent>
          <p className="text-center text-lg text-gray-500">No medical records available.</p>
        </CardContent>
      )
    }
      
    </Card>
  );
};

export default MedicalRecords;
