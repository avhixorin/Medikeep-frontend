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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { User } from "@/types/types";

interface DoctorProfileProps {
  user: User | null;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="w-full h-full md:p-8 bg-transparent shadow-md">
      <CardHeader className="border-b pb-4 mb-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user?.profilePicture || "/placeholder-doctor.jpg"}
              alt={user?.username || "Doctor"}
            />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{user?.username || "Dr. John Doe"}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {user?.specialization || "General Practitioner"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent >
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="max-sm:flex-wrap mb-4 border-b flex w-full">
            <TabsTrigger value="info">Basic Info</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid gap-6 md:grid-cols-2 overflow-y-auto">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user?.firstName || ""} readOnly={!isEditing} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user?.lastName || ""} readOnly={!isEditing} />
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
                <Label htmlFor="address">Clinic Address</Label>
                <Textarea id="address" defaultValue={typeof user?.clinicalAddress === 'string' ? user.clinicalAddress : "City, Country"} readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="credentials">
            <div className="grid gap-6">
              <div>
                <Label htmlFor="license">Medical License Number</Label>
                <Input id="license" defaultValue={user?.medicalLicenseNumber || "N/A"} readOnly />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" defaultValue={user?.specialization || "N/A"} readOnly />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" defaultValue={user?.yearsOfExperience?.toString() || "0"} readOnly />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="space-y-4">
              <div>
                <Label>Upcoming Appointments</Label>
                <ul className="list-disc list-inside text-sm">
                  <li>May 20, 2023 - Consultation with John Doe</li>
                  <li>June 5, 2023 - Follow-up with Jane Smith</li>
                </ul>
              </div>
              <div>
                <Label>Past Appointments</Label>
                <ul className="list-disc list-inside text-sm">
                  <li>April 10, 2023 - Check-up with Anna Brown</li>
                  <li>March 1, 2023 - Surgery follow-up with Mark Lee</li>
                </ul>
              </div>
              <Button variant="outline">Schedule New Appointment</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end mt-6">
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Save Changes" : "Edit Profile"}</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorProfile;
