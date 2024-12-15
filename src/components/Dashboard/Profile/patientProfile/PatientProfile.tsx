import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/types";
import Upload from "@/utils/Upload";

interface PatientProfileProps {
  user: User | null;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false);

  const cancelUpload = () => {
    setUploadClicked(false);
  };

  return (
    <Card className="w-full p-6 md:p-8 bg-transparent shadow-md">
      {uploadClicked && <Upload cancelUpload={cancelUpload} setUploadClicked={setUploadClicked} />}

      <CardHeader className="border-b pb-4 mb-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user?.profilePicture || "/placeholder-patient.jpg"}
              alt="Patient"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{user?.firstName || "John Doe"}</CardTitle>
            <CardDescription className="text-sm text-gray-500">Patient ID: {user?._id || "N/A"}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4 border-b">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="health">Health Metrics</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user?.firstName || ""} readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user?.lastName || ""} readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  defaultValue={
                    user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                      : ""
                  }
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" defaultValue={user?.gender || ""} readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={user?.phone || ""} readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} readOnly={!isEditing} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="City, Country" readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>

          {/* Medical Information */}
          <TabsContent value="medical">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input id="bloodType" defaultValue="O+" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea id="allergies" defaultValue="Peanuts, Penicillin" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="conditions">Pre-existing Conditions</Label>
                <Textarea id="conditions" defaultValue="Asthma, Hypertension" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea id="medications" defaultValue="Albuterol, Lisinopril" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="familyHistory">Family History</Label>
                <Textarea id="familyHistory" defaultValue="Diabetes, Heart Disease" readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>

          {/* Health Metrics */}
          <TabsContent value="health">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" defaultValue="175" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" defaultValue="70" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input id="bmi" defaultValue="22.9" readOnly />
              </div>
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input id="bloodPressure" defaultValue="120/80" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="bloodSugar">Blood Sugar Level (mg/dL)</Label>
                <Input id="bloodSugar" defaultValue="90" readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input id="heartRate" defaultValue="70" readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>

          {/* Appointments */}
          <TabsContent value="appointments">
            <div className="space-y-4">
              <div>
                <Label>Upcoming Appointments</Label>
                <ul className="list-disc list-inside text-sm">
                  <li>May 20, 2023 - Annual Check-up with Dr. Smith</li>
                  <li>June 5, 2023 - Dental Cleaning with Dr. Johnson</li>
                </ul>
              </div>
              <div>
                <Label>Past Appointments</Label>
                <ul className="list-disc list-inside text-sm">
                  <li>April 10, 2023 - Follow-up with Dr. Brown</li>
                  <li>March 1, 2023 - Eye Exam with Dr. Lee</li>
                </ul>
              </div>
              <Button variant="outline">Book New Appointment</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between items-center mt-6">
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Save Changes" : "Edit Profile"}</Button>
        <div className="text-sm">
          <Label className="font-semibold">Emergency Contact</Label>
          <p>Jane Doe (Spouse) - +1 (555) 789-0123</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientProfile;