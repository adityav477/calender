import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Event } from '@/types/event';
import Tags from '../components/Tags';

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
  selectedDate: Date
  editingEvent: Event | null
  events: Event[]
}

function EventModal({
  isOpen,
  onClose,
  onAddEvent,
  onDeleteEvent,
  selectedDate,
  editingEvent,
  events
}: EventModalProps) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [tagState, setTag] = useState('');
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (editingEvent) {
      setName(editingEvent.name)
      setStartTime(editingEvent.startTime)
      setEndTime(editingEvent.endTime)
      setDescription(editingEvent.description || '')
    } else {
      setName('')
      setStartTime('')
      setEndTime('')
      setDescription('')
    }
  }, [editingEvent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent: Event = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      date: selectedDate.toISOString().split('T')[0],
      name,
      startTime,
      endTime,
      description,
      tag: tagState || ""
    }
    onAddEvent(newEvent)
    onClose()
  }

  const onTagSubmit = (tagColor: string) => {
    setTag(tagColor);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        </DialogHeader>
        <form id="add event" onSubmit={handleSubmit} className="flex flex-col justify-center gap-3">
          <div>
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div >
            <Tags onTagSubmit={onTagSubmit} />
          </div>
          <div className="flex justify-between">
            <Button type="submit">{editingEvent ? 'Update' : 'Add'} Event</Button>
            {editingEvent && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  onDeleteEvent(editingEvent.id)
                  onClose()
                }}
              >
                Delete Event
              </Button>
            )}
          </div>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Events for {selectedDate.toDateString()}</h3>
          {events.length === 0 ? (
            <p>No events for this day.</p>
          ) : (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="text-sm">
                  <span className="font-medium">{event.name}</span> - {event.startTime} to {event.endTime}
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventModal;
