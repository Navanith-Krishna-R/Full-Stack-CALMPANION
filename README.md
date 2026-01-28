<<<<<<< HEAD
# CALMPANION ðŸ§˜â€â™‚ï¸  
_A Full-Stack Mental Health Support Platform_

ðŸŒ **Live App:** https://full-stack-calmpanion.vercel.app/  
ðŸ‘¤ **Portfolio:** https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/

---

## ðŸŒŸ Project Overview

**CALMPANION** is a full-stack web application focused on **mental health awareness, accessibility, and support**.  
It provides a secure and user-friendly platform where individuals can **learn, connect with professionals, donate, and share experiences** in a supportive environment.

The project is designed with **real-world deployment, scalability, and security** in mind.

---

## ðŸš€ Features

- ðŸ“– **Mental Health Resources** â€“ Educational content and awareness materials  
- ðŸ¥ **Appointment Booking** â€“ Schedule consultations with mental health professionals  
- ðŸ’° **Secure Donations** â€“ Support mental health initiatives  
- âœï¸ **Blog Platform** â€“ Users can write and share experiences  
- ðŸ” **Authentication & Security** â€“ JWT-based authentication and protected APIs  
- ðŸŒ **Responsive UI** â€“ Works seamlessly across all devices  

---

## ðŸ› ï¸ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- Node.js
- Prisma ORM

### Database
- PostgreSQL

### Authentication
- JWT / Session-based authentication

### Deployment
- Vercel (Frontend & APIs)
- Cloud-hosted PostgreSQL

---

## âš™ï¸ Getting Started (Local Setup)

### 1ï¸âƒ£ Prerequisites
- Node.js (v18+)
- Git
- PostgreSQL

---

### 2ï¸âƒ£ Clone the Repository

git clone https://github.com/Navanith-Krishna-R/Full-Stack-CALMPANION.git
cd Full-Stack-CALMPANION

---

## Install dependencies
npm install

## Create a .env file in the root directory and add:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/calmpanion

JWT_SECRET=your-jwt-secret

NEXTAUTH_SECRET=your-nextauth-secret

NEXT_PUBLIC_NEWS_API_KEY=your-news-api-key

## Run Prisma migrations
npx prisma migrate dev --name init

## Generate Prisma client
npx prisma generate

## (Optional) Open Prisma Studio
npx prisma studio

## Start the development server
npm run dev

---

## ðŸ’» API Routes

POST /api/register â€“ Register a new user

POST /api/login â€“ Authenticate user

POST /api/appointments â€“ Book an appointment

GET /api/appointments â€“ Get user appointments

POST /api/blogs â€“ Create a blog post

GET /api/blogs â€“ Retrieve blog posts

---

## ðŸ”— Deployment
Push the project to GitHub

Import the repository into Vercel

Add environment variables in Vercel Dashboard

Deploy ðŸš€

Live URL:
ðŸ‘‰ https://full-stack-calmpanion.vercel.app/

---

## ðŸ› ï¸ Contribution Guidelines

1. Fork the repository

2. Create a feature branch:

git checkout -b feature/your-feature


---

## ðŸ“§ Contact
Navanith Krishna R â€“ ðŸ”— Portfolio: https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/

For inquiries or feedback, feel free to reach out via -
ðŸ’» GitHub: https://github.com/Navanith-Krishna-R

ðŸŒ± Your mental well-being matters. CALMPANION is here to help!
=======
# CALMPANION í·˜â€â™‚ï¸  
_A Full-Stack Mental Health Support Platform_

í¼ **Live App:** https://full-stack-calmpanion.vercel.app/  
í±¤ **Portfolio:** https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/

---

## í¼Ÿ Project Overview

**CALMPANION** is a full-stack web application focused on **mental health awareness, accessibility, and support**.  
It provides a secure and user-friendly platform where individuals can learn, connect with professionals, donate, and share experiences.

---

## íº€ Features

- í³– Mental health resources  
- í¿¥ Appointment booking  
- í²° Secure donations  
- âœï¸ Blog platform  
- í´ JWT-based authentication  
- í¼ Responsive UI  

---

## í» ï¸ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui  
- **Backend:** Next.js API Routes, Node.js, Prisma  
- **Database:** PostgreSQL  
- **Deployment:** Vercel  

---

## í²» API Routes

- POST `/api/register`  
- POST `/api/login`  
- POST `/api/appointments`  
- GET `/api/appointments`  
- POST `/api/blogs`  
- GET `/api/blogs`  

---

## í³§ Contact

**Navanith Krishna R**  
í´— Portfolio: https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/  
í²» GitHub: https://github.com/Navanith-Krishna-R  

---

í¼± _Your mental well-being matters. CALMPANION is here to help!_
>>>>>>> 5ef635b (Add final CALMPANION README)
