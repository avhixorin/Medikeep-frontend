import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon } from 'lucide-react'

interface AppointmentCardProps {
  profilePicture: string
  fullName: string
  age: number
  appointmentDate: string
  appointmentTime: string
  onReschedule: () => void
  onCancel: () => void
  onStartSession: () => void
}

export default function AppointmentCardMobile({
  profilePicture,
  fullName,
  age,
  appointmentDate,
  appointmentTime,
  onReschedule,
  onCancel,
  onStartSession
}: AppointmentCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage src={profilePicture} alt={fullName} />
            <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{fullName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Age: {age}</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">Date:</span>
            <span className="ml-2">{appointmentDate}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <ClockIcon className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">Time:</span>
            <span className="ml-2">{appointmentTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
        <Button 
          onClick={onReschedule}
          className=" bg-primary hover:bg-primary/90 text-white transition-colors duration-300"
        >
          Reschedule
        </Button>
        <Button 
          onClick={onStartSession}
          className=" bg-primary hover:bg-primary/90 text-white transition-colors duration-300"
        >
          Start online session
        </Button>
        <Button 
          onClick={onCancel}
          variant="destructive"
          className="hover:bg-destructive/90 transition-colors duration-300"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}

