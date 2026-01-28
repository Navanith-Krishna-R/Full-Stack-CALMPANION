# CALMPANION 🧘‍♂️

## 🌟 Project Overview
**CALMPANION** is a comprehensive online platform dedicated to **mental health awareness and support**.  
It empowers users to take control of their mental well-being by providing:

- Educational resources about mental health  
- Scheduling appointments with certified professionals  
- Secure donations to mental health initiatives  
- Sharing experiences via blogs  

The platform emphasizes **security, accessibility, and a supportive environment** for all users.

---

## 🚀 Features

- **📖 Learn About Mental Health** – Access articles, tips, and resources to improve mental well-being.  
- **🏥 Book Appointments** – Schedule consultations with licensed mental health professionals.  
- **💰 Donate** – Support mental health programs through secure contributions.  
- **✍️ Write Blogs** – Share personal stories, experiences, or insights.  
- **🔐 Secure & Private** – User data is protected with modern security standards.  
- **🌐 Responsive Design** – Accessible on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Node.js (API Routes), Prisma ORM  
- **Database:** PostgreSQL  
- **Authentication:** JWT / Session-based login  
- **Deployment:** Vercel (Frontend), PostgreSQL hosted database  

---

## 🎯 Getting Started

Follow these steps to run **CALMPANION** locally:

### 1️⃣ Prerequisites
Install the following tools:

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- [Git](https://git-scm.com/)  
- [PostgreSQL](https://www.postgresql.org/) (for local database setup)

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