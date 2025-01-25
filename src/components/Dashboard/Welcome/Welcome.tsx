import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useNavigate } from "react-router-dom";
import { setChatHistory } from "@/redux/features/messageSlice";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const user = useSelector((state: RootState) => state.auth.user);
  const chatHistory = useSelector((state: RootState) => state.messages.chatHistories)
  const keyCount = Object.keys(chatHistory);
  const dispatch = useDispatch();
  if (user && user.messages && keyCount?.length === 0) {
    dispatch(setChatHistory(user.messages));
  }
  const { t } = useTranslation();
  const cards = [
    {
      title: t("welcome.cards.card1.title"),
      description:
        user?.role === "Doctor"
          ? t("welcome.cards.card1.subtitle1")
          : t("welcome.cards.card1.subtitle2"),
      action: t("welcome.cards.card1.button"),
    },
    {
      title: t("welcome.cards.card2.title"),
      description:
        user?.role === "Doctor"
          ? t("welcome.cards.card2.subtitle1")
          : t("welcome.cards.card2.subtitle2"),
      action: t("welcome.cards.card2.button"),
    },
    {
      title: t("welcome.cards.card3.title"),
      description:
        user?.role === "Doctor"
          ? t("welcome.cards.card3.subtitle1")
          : t("welcome.cards.card3.subtitle2"),
      action: t("welcome.cards.card3.button"),
    },
    {
      title: t("welcome.cards.card4.title"),
      description:
        user?.role === "doctor"
          ? t("welcome.cards.card4.subtitle1")
          : t("welcome.cards.card4.subtitle2"),
      action: t("welcome.cards.card4.button"),
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
      if(user?.role === "doctor"){
        navigate('/dashboard/patients')
      }else{
        navigate('/dashboard/vitals')
      }
    }
  }

  return (
    <div className="w-full h-full bg-transparent pt-6 px-4 md:px-6 lg:px-8 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl dark:text-[#fafafa]">
            {user?.role === "doctor" ? t("welcome.title") : "Hello"},
            <br />
            {
              user?.role === "doctor" ? "Dr." : ""
            }
            {user?.firstName}! 👋
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-base sm:text-lg md:text-xl">
            {user?.role === "doctor"
              ? t("welcome.subtitle1")
              : t("welcome.subtitle2")}
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
                <Button 
                className="w-full py-2 dark:bg-zinc-300 dark:hover:bg-white"
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
