# BizBook — Online Booking System for Barbershops

BizBook is a web-based online booking system designed for barbershops.  
The project automates the appointment booking process and replaces manual methods (phone calls, messages, notebooks) with a centralized digital solution.

This project was created as a **university project** and demonstrates how modern web technologies can be applied to solve real business problems.

---

## 🔗 Live Design & Prototype

**Client-side website (booking flow):**  
https://bizbook.figma.site

**Admin panel:**  
https://bizbook.figma.site/admin

- **Login:** `admin@bizbook.com`  
- **Password:** `admin2026`

- **Demo Video:** -  https://www.youtube.com/watch?v=XFAAYHqnwnM

---

## ✨ Key Features

### Client Side
- Choose booking method (by service or by barber)
- Browse services with transparent pricing and duration
- Select a preferred barber with profiles
- Real-time date and time selection
- Simple booking confirmation using name and phone number
- No registration required

### Admin Panel
- Manage bookings (confirm, cancel, view history)
- Manage services (pricing and duration)
- Manage barbers (profiles and activation status)
- Configure working schedules and breaks
- Block specific dates (holidays or maintenance)
- View booking statistics and analytics
- Manage cosmetics marketplace items (demo)

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS (custom UI components)

### Backend & Database
- Supabase (PostgreSQL, Authentication, Edge Functions)

### Design
- Figma (UI/UX Design)
- Figma Make (design-to-code workflow)

---

## 📁 Project Structure

├── src/
│   ├── components/
│   ├── styles/
│   ├── utils/
│   ├── supabase/
│   └── main.tsx
├── docs/
│   ├── Design_Spec_BizBook.pdf
│   └── TechnicalSpecBook.pdf
├── index.html
├── package.json
├── vite.config.ts
└── README.md

## ▶️ Running the Project Locally

1. Install dependencies:
```bash
npm install
npm run dev


Note

Some files related to Supabase Edge Functions use the Deno environment.
Editor warnings may appear locally — this is expected and does not affect the project logic or structure.

⚠️ Limitations
	•	Demo / prototype version
	•	No online payments implemented
	•	Marketplace is informational only
	•	Some data may be mock data
	•	Supabase free-tier limitations may apply

👩‍💻 Author
  Nuskaiym Sabitalieva
  University Project — Online Booking System
