# CALMPANION 🧘‍♂️  
_A Full-Stack Mental Health Support Platform_

🌐 **Live App:** https://full-stack-calmpanion.vercel.app/  
👤 **Portfolio:** https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/

---

## 🌟 Project Overview

**CALMPANION** is a full-stack web application focused on **mental health awareness, accessibility, and support**.  
It provides a secure and user-friendly platform where individuals can **learn, connect with professionals, donate, and share experiences** in a supportive environment.

The project is designed with **real-world deployment, scalability, and security** in mind.

---

## 🚀 Features

- 📖 **Mental Health Resources** – Educational content and awareness materials  
- 🏥 **Appointment Booking** – Schedule consultations with mental health professionals  
- 💰 **Secure Donations** – Support mental health initiatives  
- ✍️ **Blog Platform** – Users can write and share experiences  
- 🔐 **Authentication & Security** – JWT-based authentication and protected APIs  
- 🌐 **Responsive UI** – Works seamlessly across all devices  

---

## 🛠️ Tech Stack

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

## ⚙️ Getting Started (Local Setup)

### 1️⃣ Prerequisites
- Node.js (v18+)
- Git
- PostgreSQL

---

### 2️⃣ Clone the Repository

git clone https://github.com/Navanith-Krishna-R/Full-Stack-CALMPANION.git
cd Full-Stack-CALMPANION

---
### 3️⃣ Install Dependencies
# Install dependencies
npm install

### Create a .env file in the root directory and add:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/calmpanion
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_NEWS_API_KEY=your-news-api-key

### Run Prisma migrations
npx prisma migrate dev --name init

### Generate Prisma client
npx prisma generate

### (Optional) Open Prisma Studio
npx prisma studio

### Start the development server
npm run dev

##📦 Project Structure

CALMPANION/
├── app/                  # Next.js pages & API routes
├── components/           # Reusable React components
├── context/              # Global state
├── hooks/                # Custom hooks
├── lib/                  # Prisma, auth, utilities
├── prisma/               # Prisma schema & migrations
├── public/               # Static assets
├── package.json
└── README.md

---

##💻 API Routes

POST /api/register – Register a new user

POST /api/login – Authenticate user

POST /api/appointments – Book an appointment

GET /api/appointments – Get user appointments

POST /api/blogs – Create a blog post

GET /api/blogs – Retrieve blog posts

---

###🔗 Deployment
Push the project to GitHub

Import the repository into Vercel

Add environment variables in Vercel Dashboard

Deploy 🚀

Live URL:
👉 https://full-stack-calmpanion.vercel.app/

---

## 🛠️ Contribution Guidelines

1. Fork the repository

2. Create a feature branch:

git checkout -b feature/your-feature


---

## 📧 Contact
Navanith Krishna R – 🔗 Portfolio: https://portfolio-bim74nzsl-navanith-krishna-rs-projects.vercel.app/

For inquiries or feedback, feel free to reach out via -
💻 GitHub: https://github.com/Navanith-Krishna-R

🌱 Your mental well-being matters. CALMPANION is here to help!