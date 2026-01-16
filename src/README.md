# BizBook — Online Booking System for Barbershops

BizBook is a web-based online booking system designed for barbershops.  
The project automates the appointment booking process and provides a centralized admin panel for managing services, barbers, schedules, and bookings.

This project was created as a university project and demonstrates how modern web technologies can be used to solve real business problems.

---

## Live Design & Prototype

Figma Design (UI/UX):  

https://bizbook.figma.site
## Key Features

### Client Side
- Choose booking method (by service or by barber)
- Browse services with transparent pricing and duration
- Select preferred barber with ratings and profiles
- Real-time date and time selection
- Simple booking confirmation using name and phone number
- No registration required

### Admin Panel
- Manage bookings (confirm, cancel, view history)
- Manage services (price and duration)
- Manage barbers (profiles, activation status)
- Configure working schedules and breaks
- Block specific dates (holidays or maintenance)
- View statistics and booking analytics
- Manage cosmetics marketplace items

---

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- CSS (custom UI components)

**Backend & Database**
- Supabase (PostgreSQL, Auth, Edge Functions)

**Design**
- Figma
- Figma Make (design-to-code workflow)

---

## Project Structure
├── src/
│   ├── components/
│   ├── styles/
│   ├── utils/
│   ├── supabase/
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md


## Running the Project Locally

1. Install dependencies:
```bash
npm install

npm run dev

Note:
Some files related to Supabase Edge Functions use the Deno environment.
Editor warnings may appear locally, which is expected and does not affect the project structure or logic.


Author

Nuskaiym Sabitalieva
University Project — Online Booking System