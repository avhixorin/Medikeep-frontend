import React, { useState } from "react"
import { format, compareAsc, parseISO } from "date-fns"
import { CalendarIcon, SearchIcon, X } from 'lucide-react'
import { appointments } from "@/constants/appointments"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import AppointmentCard from "./AppointmentCard"

const Appointments: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const formattedDate = date ? format(date, "yyyy-MM-dd") : null

  const filteredAppointments = appointments
    .filter(
      (appt) =>
        (!formattedDate || appt.date === formattedDate) &&
        (!searchQuery || appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    filteredAppointments[0] ? parseISO(filteredAppointments[0].date) : undefined
  )

  const clearFilters = () => {
    setDate(undefined)
    setSearchQuery("")
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#fffcf8] p-6 gap-2 dark:bg-[#121212]">
      <div className="w-full flex flex-col gap-8">
        <h1 className="text-3xl font-semibold text-zinc-700 dark:text-gray-200">Appointments</h1>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                  "dark:bg-[#0A0A0A] dark:text-gray-400 dark:border-gray-700 dark:hover:bg-zinc-800",
                  !date && "text-muted-foreground dark:text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-gray-300 dark:bg-[#0A0A0A] dark:border-gray-700">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(selectedDate) => {
                  setDate(selectedDate)
                  setSelectedDate(selectedDate)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="relative flex-grow bg-white border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 dark:bg-[#0A0A0A] dark:border-gray-700 dark:focus-within:ring-blue-400">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-transparent text-gray-700 placeholder-gray-500 border-none outline-none dark:text-gray-200 dark:placeholder-gray-500"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={clearFilters}
            className={cn(
              "whitespace-nowrap text-gray-700 border-gray-300 hover:bg-gray-100",
              "dark:text-gray-400 dark:border-gray-700 dark:hover:bg-zinc-800 dark:hover:text-gray-200",
              !date && !searchQuery && "text-muted-foreground dark:text-gray-500"
            )}
            disabled={!date && !searchQuery}
          >
            Clear filters
          </Button>
        </div>
      </div>

      <div className="mt-6 flex-grow bg-white dark:bg-[#0A0A0A] rounded-md flex flex-col p-6 gap-3 overflow-y-auto shadow-xl scrollbar-webkit border border-gray-200 dark:border-gray-800">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              Name={appointment.patientName}
              timeSlots={appointment.timeSlot}
              imgSrc={appointment.imgSrc}
              selectedDate={parseISO(appointment.date)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No appointments found.</p>
        )}
      </div>
    </div>
  )
}

export default Appointments
