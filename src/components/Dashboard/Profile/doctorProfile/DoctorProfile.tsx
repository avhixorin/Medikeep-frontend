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
import { User } from "@/types/types";
import Upload from "@/utils/Upload";

interface DoctorProfileProps {
  user: User | null;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false);

  const cancelUpload = () => {
    setUploadClicked(false);
  };

  const clinicAffiliation = user?.clinicAffiliation?.join(", ");

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-8">
      {uploadClicked && <Upload cancelUpload={cancelUpload} setUploadClicked={setUploadClicked} />}
      
      {/* Profile Card */}
      <Card className="rounded-lg shadow-md">
        <CardHeader className="p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <Avatar
              className="w-20 h-20 border border-gray-200 shadow-sm cursor-pointer"
              onClick={() => setUploadClicked(true)}
            >
              <AvatarImage
                src={user?.profilePicture || "https://i.pravatar.cc/192?img=36"}
                alt="User Profile Picture"
              />
              <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">
                {user?.firstName || "No User"} {user?.lastName}
              </CardTitle>
              <p className="text-sm text-gray-500">{user?.specialization || "Specialization Not Set"}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithIcon
              icon={<UserIcon className="text-gray-500" />}
              label="First Name"
              id="firstName"
              defaultValue={user?.firstName || ""}
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<UserIcon className="text-gray-500" />}
              label="Last Name"
              id="lastName"
              defaultValue={user?.lastName || ""}
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<CalendarIcon className="text-gray-500" />}
              label="Date of Birth"
              id="dob"
              type="date"
              defaultValue={
                user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                  : ""
              }
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<UserIcon className="text-gray-500" />}
              label="Gender"
              id="gender"
              defaultValue={user?.gender || ""}
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<PhoneIcon className="text-gray-500" />}
              label="Phone"
              id="phone"
              defaultValue={user?.phone || ""}
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<MailIcon className="text-gray-500" />}
              label="Email"
              id="email"
              type="email"
              defaultValue={user?.email || ""}
              isEditing={isEditing}
            />
            <InputWithIcon
              icon={<MapPinIcon className="text-gray-500" />}
              label="Address"
              id="address"
              defaultValue={"City, Country"}
              isEditing={isEditing}
              isTextarea
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-4 bg-gray-50">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardFooter>
      </Card>

      {/* Tabs Section */}
      <Card className="rounded-lg shadow-md">
        <CardContent className="p-6">
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="medical">Credentials</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
            </TabsList>
            <TabsContent value="medical">
              <div className="grid grid-cols-1 gap-4">
                <InputWithIcon
                  icon={<HospitalIcon className="text-gray-500" />}
                  label="Medical License Number"
                  id="license"
                  defaultValue={user?.medicalLicenseNumber || ""}
                  isEditing={isEditing}
                />
                <InputWithIcon
                  icon={<HeartPulseIcon className="text-gray-500" />}
                  label="Specialization"
                  id="specialization"
                  defaultValue={user?.specialization || ""}
                  isEditing={isEditing}
                />
                <InputWithIcon
                  icon={<CalendarIcon className="text-gray-500" />}
                  label="Years of Experience"
                  id="experience"
                  type="number"
                  defaultValue={user?.yearsOfExperience?.toString() || ""}
                  isEditing={isEditing}
                />
                <InputWithIcon
                  icon={<HospitalIcon className="text-gray-500" />}
                  label="Affiliated Clinics"
                  id="affiliations"
                  defaultValue={clinicAffiliation || ""}
                  isEditing={isEditing}
                  isTextarea
                />
              </div>
            </TabsContent>
            <TabsContent value="professional">
              <div className="grid grid-cols-1 gap-4">
                <InputWithIcon
                  icon={<UserIcon className="text-gray-500" />}
                  label="Biography"
                  id="bio"
                  defaultValue={
                    "Dr. Jane Smith is a cardiologist with over 10 years of experience."
                  }
                  isEditing={isEditing}
                  isTextarea
                />
                <InputWithIcon
                  icon={<GraduationCapIcon className="text-gray-500" />}
                  label="Educational Background"
                  id="education"
                  defaultValue={"MD, Cardiology, University of California"}
                  isEditing={isEditing}
                  isTextarea
                />
                <InputWithIcon
                  icon={<UserIcon className="text-gray-500" />}
                  label="Professional Associations"
                  id="associations"
                  defaultValue={
                    "American College of Cardiology, American Medical Association"
                  }
                  isEditing={isEditing}
                  isTextarea
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;

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
  id,
  defaultValue,
  isEditing,
  isTextarea = false,
  ...props
}: InputWithIconProps) {
  const InputComponent = isTextarea ? Textarea : Input;
  return (
    <div className="space-y-1">
      <Label
        htmlFor={id}
        className="flex items-center text-sm font-medium text-gray-600"
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
