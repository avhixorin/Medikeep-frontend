import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { user } = useSelector((state: RootState) => state.auth);
  const cards = [
    {
      title: "Upcoming Appointments",
      description:
        user?.role === "Doctor"
          ? "View and prepare for your upcoming consultations."
          : "Check your scheduled appointments with your doctors.",
      action: "View Appointments",
    },
    {
      title: "Prescriptions",
      description:
        user?.role === "Doctor"
          ? "Manage and send prescriptions to your patients."
          : "Access your recent and saved prescriptions.",
      action: "View Prescriptions",
    },
    {
      title: "Messages",
      description:
        user?.role === "Doctor"
          ? "Communicate with your patients effectively."
          : "Check messages from your doctors and clinics.",
      action: "View Messages",
    },
    {
      title: "Health Overview",
      description:
        user?.role === "Doctor"
          ? "Monitor patient health trends and stats at a glance."
          : "Get a quick overview of your health status.",
      action: "View Overview",
    },
  ];
  const navigate = useNavigate();
  const handleNavigation = (title:string) => {
    if(title === "Upcoming Appointments"){
      navigate('/dashboard/appointments')
    }else if(title === "Prescriptions"){
      navigate('/dashboard/medical-records')
    }else if(title === "Messages"){
      navigate('/dashboard/chats')
    }else{
      navigate('/dashboard/vitals')
    }
  }

  return (
    <div className="w-full h-full bg-transparent pt-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Hello,
            <br />
            {user?.fullName}! 👋
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-base sm:text-lg md:text-xl">
            {user?.role === "Doctor"
              ? "Ready to manage your patients and appointments efficiently? Let's make healthcare seamless!"
              : "Your health is our priority. Track appointments, prescriptions, and more with ease."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between bg-card/50 backdrop-blur-sm hover:bg-card/75 transition-all duration-300 rounded-lg shadow-md h-60 md:h-64
               p-1"
            >
              <div className="flex flex-col h-full space-y-2">
                <CardHeader className="">
                  <CardTitle className="text-lg font-semibold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm text-gray-500">
                    {card.description}
                  </CardDescription>
                </CardContent>
              <CardFooter>
                <Button className="w-full py-2"
                onClick={() => handleNavigation(card.title)}
                >{card.action}</Button>
              </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
