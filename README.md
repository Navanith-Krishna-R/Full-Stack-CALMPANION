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

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Navanith-Krishna-R/Full-Stack-CALMPANION.git
cd Full-Stack-CALMPANION
3️⃣ Install Dependencies
bash
Copy
Edit
npm install
4️⃣ Set Up Environment Variables
Create a .env file in the root folder and add your environment variables:

env
Copy
Edit
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/calmpanion
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
Note: Replace USER, PASSWORD, and your-secret-key with your actual credentials.

5️⃣ Set Up the Database
Run Prisma migrations to create the database schema:

bash
Copy
Edit
npx prisma migrate dev --name init
Generate the Prisma client:

bash
Copy
Edit
npx prisma generate
You can also open Prisma Studio to view and manage your database:

bash
Copy
Edit
npx prisma studio
6️⃣ Run the Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser.

📦 Project Structure
bash
Copy
Edit
CALMPANION/
├── app/                  # Next.js pages and API routes
├── components/           # Reusable React components
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets (images, logos, etc.)
├── styles/               # CSS / Tailwind files
├── .env                  # Environment variables
├── package.json
└── README.md
💻 API Routes
POST /api/register – Register a new user

POST /api/login – Authenticate a user

POST /api/appointments – Book an appointment

GET /api/appointments – Get user's appointments

POST /api/blogs – Create a new blog post

GET /api/blogs – Retrieve blog posts

🔗 Deployment
Push your code to GitHub:

bash
Copy
Edit
git add .
git commit -m "Initial commit"
git push origin main
Connect your repository to Vercel for frontend deployment.

Make sure to set environment variables in Vercel Dashboard to match .env.

🛠️ Contribution Guidelines
We welcome contributions! Follow these steps:

Fork the repository

Create a feature branch:

bash
Copy
Edit
git checkout -b feature/your-feature
Make your changes and commit:

bash
Copy
Edit
git commit -m "Add your feature"
Push your branch:

bash
Copy
Edit
git push origin feature/your-feature
Open a Pull Request on GitHub

📧 Contact
Navanith Krishna R – Portfolio
For inquiries or feedback, feel free to reach out via GitHub.

🌱 Your mental well-being matters. CALMPANION is here to help!