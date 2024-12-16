import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Day from './Day';
import EventModal from "./EventModal";
import { Event } from '@/types/event';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [transitionDirection, setTransicitonDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const handlePrevMonth = () => {
    setTransicitonDirection("left");
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setTimeout(() => {
      setTransicitonDirection(null);
    }, 50)
  }

  const handleNextMonth = () => {
    setTransicitonDirection("right");
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setTimeout(() => {
      setTransicitonDirection(null);
    }, 50)
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleAddEvent = (newEvent: Event) => {
    // Check for overlapping events
    const isOverlapping = events.some(event =>
      event.date === newEvent.date &&
      ((newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
        (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime) ||
        (newEvent.startTime <= event.startTime && newEvent.endTime >= event.endTime))
    )

    if (isOverlapping) {
      alert('This event overlaps with an existing event. Please choose a different time.')
      return
    }

    if (editingEvent) {
      setEvents(events.map(event => event.id === editingEvent.id ? newEvent : event))
    } else {
      setEvents([...events, newEvent])
    }
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  const handleMovement = (id: string, prevDate: string, newDate: string) => {

    if (prevDate === newDate) {
      return;
    };

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        return event.id === id ? { ...event, date: newDate } : event;
      })
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)

  return (
    <div className="container mx-auto p-4">

      {/*Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div>
          <Button onClick={handlePrevMonth} className="mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calender Grid */}
      <div
        className={`absolute w-full transition-transform duration-300 ${transitionDirection === 'left' ? '-translate-x-full' : ''
          } ${transitionDirection === 'right' ? 'translate-x-full' : ''}`}
      >
        <div className="grid grid-cols-7 gap-2">
          {DAYS_OF_WEEK.map(day => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {daysInMonth.map((date, index) => (
            <Day
              key={index}
              date={date}
              isCurrentMonth={date?.getMonth() === currentDate.getMonth()}
              isToday={date?.toDateString() === new Date().toDateString()}
              isWeekEnd={date?.getDay() === 0 || date?.getDay() === 6 ? true : false}
              events={events.filter(event => event.date === date?.toISOString().split('T')[0])}
              onClick={() => date && handleDayClick(date)}
              onEditEvent={handleEditEvent}
              onMovement={handleMovement}
            />
          ))}
        </div>
      </div>
      {
        isModalOpen && selectedDate && (
          <EventModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setEditingEvent(null)
            }}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            selectedDate={selectedDate}
            editingEvent={editingEvent}
            events={events.filter(event => event.date === selectedDate.toISOString().split('T')[0])}
          />
        )
      }
    </div >
  )
}

