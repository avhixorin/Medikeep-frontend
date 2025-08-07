import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { User } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchIcon, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DoctorDetailsCard from "./DoctorCard";
import usePartialUserData from "@/hooks/usePartialUserData";

const Doctors: React.FC = () => {
  const [isViewingDetails, setIsViewingDetails] = React.useState(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState<User | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  const calcAge = (birthDate: string) => {
    const today = new Date();
    const dateOfBirth = new Date(birthDate);
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  };
  const { fetchPartialUserData } = usePartialUserData();
  useEffect(() => {
    if (!user?.doctors) {
      fetchPartialUserData("doctors");
    }
  }, [fetchPartialUserData, user?.doctors]);
  return (
    <div className="w-full h-full bg-transparent flex flex-col items-center px-6 py-4 dark:bg-background">
      {isViewingDetails && selectedDoctor && (
        <DoctorDetailsCard
          doctor={selectedDoctor}
          setIsViewingDetails={setIsViewingDetails}
          calcAge={calcAge}
        />
      )}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold text-foreground">Doctors</h1>
          <Users size={28} className="text-muted-foreground" />
        </div>
      </div>
      <div className="relative w-full mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-12 py-3 text-lg bg-background border border-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary text-foreground"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      {user?.doctors && user.doctors.length > 0 ? (
        user.doctors.map((doctor, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            <Card className="flex flex-col bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarImage
                      src={doctor.profilePicture}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                    />
                    <AvatarFallback>
                      {doctor.firstName[0]}
                      {doctor.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {doctor.firstName} {doctor.lastName}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Email: {doctor.email}
                </p>
                <p className="text-muted-foreground">Phone: {doctor.phone}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={() =>
                    doctor &&
                    (setSelectedDoctor(doctor), setIsViewingDetails(true))
                  }
                >
                  View Full Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-center text-muted-foreground text-xl font-semibold">
          No doctors found.
        </div>
      )}
    </div>
  );
};

export default Doctors;
