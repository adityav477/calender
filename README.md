
# Dynamic Event Calendar Application

## Overview

The **Dynamic Event Calendar Application** is a React-based project designed to showcase a modern calendar interface with event management features. This application allows users to add, edit, and delete events, ensuring an intuitive and seamless experience. The app emphasizes clean UI, robust logic, and data persistence.

## Features

### Calendar View

- Displays a grid view of the current month with proper alignment for days.
- Allows navigation between months using **Previous** and **Next** buttons.
- Highlights the current day and visually distinguishes the selected day.

### Event Management

- **Add Events**: Users can click on a specific day to add events.
- **Edit/Delete Events**: Users can modify or remove events from a selected day.
- Event details include:
  - Name
  - Start and end times
  - Optional description

### Event List

- Displays all events for a selected day in a modal or side panel for easy management.

### Data Persistence

- Events are stored using **localStorage**, ensuring they persist across page refreshes.

### Advanced Logic

- Handles month transitions (e.g., switching from January 31 to February 1).
- Prevents overlapping events by validating time ranges.
- Supports event filtering by keyword.

### Bonus Features

- Drag-and-drop functionality for rescheduling events.
- Color coding for events based on categories (e.g., work, personal, others).

## Tech Stack

- **Frontend**: React.js with functional components and hooks.
- **UI Framework**: ShadCN for modern and accessible components.
- **State Management**: Local state and **localStorage** for data persistence.
- **Styling**: Tailwind CSS.

## Installation and Setup

### Prerequisites

- Node.js (>=16.0)
- npm or yarn

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the application in your browser at `http://localhost:3000`.

## Deployment

The application is deployed and accessible at:
[**Deployed Application Link**](<deployment-url>)

The source code is available at:
[**GitHub Repository**](<https://github.com/adityav477/calender>)

## Usage Instructions

1. Navigate through the calendar using the **Previous** and **Next** buttons.
2. Click on a day to view, add, or manage events.
3. Add event details, ensuring no overlapping times.
4. Use the search bar to filter events by keywords (if implemented).
5. Drag and drop events to reschedule (if implemented).

## File Structure

- `src/components`: Contains reusable components such as Calendar Grid, Day, and Modal.
- `src/utils`: Utility functions for date handling and event validation.

## Future Enhancements

- Add authentication to sync events across devices.
- Integrate external calendar APIs like Google Calendar.
- Implement weekly and daily views for finer granularity.

## Screenshots

## License

This project is licensed under the MIT License. See the LICENSE file for details.
