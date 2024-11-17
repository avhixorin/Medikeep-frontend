import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"

export default function Welcome() {
  const { user } = useSelector((state: RootState) => state.auth)
  const cards = [
    {
      title: "Upcoming Appointments",
      description: user?.role === 'Doctor'
        ? 'View and prepare for your upcoming consultations.'
        : 'Check your scheduled appointments with your doctors.',
      action: "View Appointments"
    },
    {
      title: "Prescriptions",
      description: user?.role === 'Doctor'
        ? 'Manage and send prescriptions to your patients.'
        : 'Access your recent and saved prescriptions.',
      action: "View Prescriptions"
    },
    {
      title: "Messages",
      description: user?.role === 'Doctor'
        ? 'Communicate with your patients effectively.'
        : 'Check messages from your doctors and clinics.',
      action: "View Messages"
    },
    {
      title: "Health Overview",
      description: user?.role === 'Doctor'
        ? 'Monitor patient health trends and stats at a glance.'
        : 'Get a quick overview of your health status.',
      action: "View Overview"
    }
  ]

  return (
    <div className="w-full min-h-screen p-6 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Hello, {user?.fullName}! 👋
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg sm:text-xl">
            {user?.role === 'Doctor'
              ? 'Ready to manage your patients and appointments efficiently? Let\'s make healthcare seamless!'
              : 'Your health is our priority. Track appointments, prescriptions, and more with ease.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm hover:bg-card/75 transition-all duration-300">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{card.action}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}