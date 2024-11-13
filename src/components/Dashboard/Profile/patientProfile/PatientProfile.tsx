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

import Upload from "../Upload/Upload";
import { User } from "@/types/types";

interface PatientProfileProps {
  user: User | null;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false);

  const cancelUpload = () => {
    setUploadClicked(false);
  }
  const firstName = user?.fullName.split(" ")[0];
  const lastName = user?.fullName.split(" ")[1];

  return (
    <Card className="min-h-screen bg-gradient-to-r from-blue-500 to-green-300 p-6 md:p-10">
      {uploadClicked && <Upload cancelUpload={cancelUpload} setUploadClicked={setUploadClicked} />}
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={user?.profilePicture || "/placeholder-patient.jpg"}
              alt="Patient"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user?.fullName}</CardTitle>
            <CardDescription>Patient ID: {user?._id}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="medical">Medical Information</TabsTrigger>
            <TabsTrigger value="health">Health Metrics</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={firstName || ""}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={lastName || ""}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    defaultValue={user?.dateOfBirth || ""}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    defaultValue={user?.gender || ""}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  defaultValue={user?.phone || ""}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ""}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  defaultValue={"City, Country"}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="medical">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input 
                id="bloodType" 
                defaultValue={"O+"} 
                readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  defaultValue={"Peanuts, Penicillin"}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Pre-existing Conditions</Label>
                <Textarea
                  id="conditions"
                  defaultValue={"Asthma, Hypertension"}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  defaultValue={"Albuterol, Lisinopril"}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyHistory">Family History</Label>
                <Textarea
                  id="familyHistory"
                  defaultValue={"Diabetes, Heart Disease"}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="health">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    defaultValue={"175"}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    defaultValue={"70"}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input 
                id="bmi" 
                defaultValue={"22.9"} 
                readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input
                  id="bloodPressure"
                  defaultValue={"120/80"}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodSugar">Blood Sugar Level (mg/dL)</Label>
                <Input
                  id="bloodSugar"
                  defaultValue={"90"}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input 
                id="heartRate" 
                defaultValue={"70"}
                readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="appointments">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upcoming Appointments</Label>
                <ul className="list-disc list-inside">
                  <li>May 20, 2023 - Annual Check-up with Dr. Smith</li>
                  <li>June 5, 2023 - Dental Cleaning with Dr. Johnson</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Label>Past Appointments</Label>
                <ul className="list-disc list-inside">
                  <li>April 10, 2023 - Follow-up with Dr. Brown</li>
                  <li>March 1, 2023 - Eye Exam with Dr. Lee</li>
                </ul>
              </div>
              <Button>Book New Appointment</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
        <div className="space-y-2">
          <Label>Emergency Contact</Label>
          <p className="text-sm">Jane Doe (Spouse) - +1 (555) 789-0123</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientProfile;
