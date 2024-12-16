export interface Event {
  id: string,
  date: string,
  name: string,
  startTime: string,
  endTime: string,
  description?: string,
  tag?: string
}

export interface tagPickerInterface {
  name: string,
  color: string,
}
