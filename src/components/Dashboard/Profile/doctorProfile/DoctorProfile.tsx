import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  HospitalIcon,
  GraduationCapIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  HeartPulseIcon,
} from "lucide-react";

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-r from-blue-500 to-green-300 p-6 md:p-10">
      {/* Left Profile Section */}
      <Card className="shadow-2xl rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-t-lg">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage
                src="https://i.pravatar.cc/192?img=36"
                alt="Dr. Jane Smith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Dr. Jane Smith
              </CardTitle>
              <span className="text-white text-lg">Cardiologist</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWithIcon
              icon={<UserIcon className="text-gray-400" />}
              label="First Name"
              id="firstName"
              defaultValue="Jane"
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<UserIcon className="text-gray-400" />}
              label="Last Name"
              id="lastName"
              defaultValue="Smith"
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<CalendarIcon className="text-gray-400" />}
              label="Date of Birth"
              id="dob"
              type="date"
              defaultValue="1980-01-01"
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<UserIcon className="text-gray-400" />}
              label="Gender"
              id="gender"
              defaultValue="Female"
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<PhoneIcon className="text-gray-400" />}
              label="Phone"
              id="phone"
              defaultValue="+1 (555) 123-4567"
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<MailIcon className="text-gray-400" />}
              label="Email"
              id="email"
              type="email"
              defaultValue="jane.smith@example.com"
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<MapPinIcon className="text-gray-400" />}
              label="Address"
              id="address"
              defaultValue="123 Medical Center Dr, Healthville, HC 12345"
              isEditing={isEditing}
              isTextarea
            />
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 rounded-b-lg">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardFooter>
      </Card>

      {/* Right Profile Section (Professional and Medical Information) */}
      <Card className="shadow-2xl rounded-lg">
        <CardContent className="p-6">

          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="medical">Credentials</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
            </TabsList>
            <TabsContent value="medical">
              <div className="space-y-6">
                <InputWithIcon
                  icon={<HospitalIcon className="text-gray-400" />}
                  label="Medical License Number"
                  id="license"
                  defaultValue="ML123456"
                  isEditing={isEditing}
                />
                <InputWithIcon
                  icon={<HeartPulseIcon className="text-gray-400" />}
                  label="Specialization"
                  id="specialization"
                  defaultValue="Cardiology"
                  isEditing={isEditing}
                />
                <InputWithIcon
                  icon={<CalendarIcon className="text-gray-400" />}
                  label="Years of Experience"
                  id="experience"
                  type="number"
                  defaultValue="15"
                  isEditing={isEditing}
                />
                <InputWithIcon
                  icon={<HospitalIcon className="text-gray-400" />}
                  label="Affiliated Hospitals/Clinics"
                  id="affiliations"
                  defaultValue="City General Hospital, Heart Care Clinic"
                  isEditing={isEditing}
                  isTextarea
                />
                <InputWithIcon
                  icon={<CalendarIcon className="text-gray-400" />}
                  label="Consultation Hours"
                  id="hours"
                  defaultValue="Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
                  isEditing={isEditing}
                  isTextarea
                />
              </div>
            </TabsContent>
            <TabsContent value="professional">
              <div className="space-y-6">
                <InputWithIcon
                  icon={<UserIcon className="text-gray-400" />}
                  label="Biography/Introduction"
                  id="bio"
                  defaultValue="Dr. Jane Smith is a board-certified cardiologist with over 15 years of experience."
                  isEditing={isEditing}
                  isTextarea
                />
                <InputWithIcon
                  icon={<GraduationCapIcon className="text-gray-400" />}
                  label="Educational Background"
                  id="education"
                  defaultValue="MD from Harvard Medical School"
                  isEditing={isEditing}
                  isTextarea
                />
                <InputWithIcon
                  icon={<UserIcon className="text-gray-400" />}
                  label="Professional Associations"
                  id="associations"
                  defaultValue="American College of Cardiology"
                  isEditing={isEditing}
                  isTextarea
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-gray-50 rounded-b-lg">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Reusable InputWithIcon component
interface InputWithIconProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  defaultValue: string;
  isEditing: boolean;
  isTextarea?: boolean;
  type?: string;
}
function InputWithIcon({
  icon,
  label,
  type,
  id,
  defaultValue,
  isEditing,
  isTextarea = false,
  ...props
}: InputWithIconProps) {
  const InputComponent = isTextarea ? Textarea : type ? Input : Input;
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="flex items-center text-sm font-medium text-gray-700"
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Label>
      <InputComponent
        id={id}
        defaultValue={defaultValue}
        readOnly={!isEditing}
        className={`w-full ${!isEditing ? "bg-gray-100" : ""}`}
        {...props}
      />
    </div>
  );
}
