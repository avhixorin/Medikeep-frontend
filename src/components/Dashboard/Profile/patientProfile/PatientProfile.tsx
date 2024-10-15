import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder-patient.jpg" alt="Patient" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Patient ID: P123456</CardDescription>
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
                  <Input id="firstName" defaultValue="John" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" readOnly={!isEditing} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1985-05-15" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" defaultValue="Male" readOnly={!isEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 987-6543" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="456 Patient St, Healthville, HC 54321" readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="medical">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input id="bloodType" defaultValue="A+" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea id="allergies" defaultValue="Penicillin, Peanuts" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Pre-existing Conditions</Label>
                <Textarea id="conditions" defaultValue="Asthma, Hypertension" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea id="medications" defaultValue="Lisinopril 10mg daily, Albuterol inhaler as needed" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyHistory">Family History</Label>
                <Textarea id="familyHistory" defaultValue="Father: Heart Disease, Mother: Breast Cancer" readOnly={!isEditing} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="health">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" defaultValue="175" readOnly={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" defaultValue="70" readOnly={!isEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input id="bmi" defaultValue="22.9" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input id="bloodPressure" defaultValue="120/80" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodSugar">Blood Sugar Level (mg/dL)</Label>
                <Input id="bloodSugar" defaultValue="95" readOnly={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input id="heartRate" defaultValue="72" readOnly={!isEditing} />
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
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
        <div className="space-y-2">
          <Label>Emergency Contact</Label>
          <p className="text-sm">Jane Doe (Spouse) - +1 (555) 789-0123</p>
        </div>
      </CardFooter>
    </Card>
  )
}