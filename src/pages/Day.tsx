import { Event } from '@/types/event';

interface DayProps {
  date: Date | null
  isCurrentMonth: boolean
  isToday: boolean
  isWeekEnd: boolean
  events: Event[]
  onClick: () => void
  onEditEvent: (event: Event) => void
  onMovement: (id: string, oldDate: string, newDate: string) => void
}

function Day({ date, isCurrentMonth, isToday, isWeekEnd, events, onClick, onEditEvent, onMovement }: DayProps) {
  if (!date) {
    return <div className="h-24 bg-gray-100"></div>
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, currentDate: Date) => {
    e.dataTransfer.setData("id", id)
    e.dataTransfer.setData("fromDate", currentDate.toISOString().split("T")[0]);
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>, newDate: Date) => {
    const id = e.dataTransfer.getData("id");
    const currentDate = e.dataTransfer.getData("fromDate");
    onMovement(id, currentDate, newDate.toISOString().split("T")[0]);
  }

  return (
    <div
      className={`h-24 border p-1 ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'} ${isToday ? 'border-blue-500 border-2' : ''
        }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, date)}
      onClick={onClick}
    >
      <div className={`font-semibold ${isWeekEnd ? 'text-red-500' : ''}`}>{date.getDate()}</div>
      <div className="text-xs">
        {events.slice(0, 2).map((event,) => (
          < div
            draggable
            onDragStart={(e) => onDragStart(e, event.id, date)}
            key={event.id}
            className="truncate cursor-pointer hover:text-blue-500"
            style={{
              color: event.tag,
              backgroundColor: `hsl(from ${event.tag} h s calc(l + 40))`
            }}
            onClick={(e) => {
              e.stopPropagation()
              onEditEvent(event)
            }}
          >
            {event.name}
          </div>
        ))}
        {events.length > 2 && <div className="text-gray-500">+{events.length - 2} more</div>}
      </div>
    </div >
  )
}

export default Day;
