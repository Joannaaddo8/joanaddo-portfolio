> This project demonstrates my ability to design and deploy a full-stack application with authentication, RESTful APIs, and cloud deployment.
# Joan Addo Portfolio – Full Stack Web Application

## 📌 Overview
This is a full-stack portfolio web application built using the MERN stack.  
It allows users to view projects and services, while providing an admin dashboard for managing content through secure authentication.

The application demonstrates backend API development, frontend integration, and deployment to live environments.

---

## 🚀 Live Links

Frontend (Netlify):  
https://joanna-addo-portfolio.netlify.app  

Backend (Render):  
https://portfolio-backend-o3cd.onrender.com  

---

## 🛠️ Technologies Used

### Frontend
- React (Vite)
- React Router
- CSS (Custom styling)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Middleware (Protected routes)

### Deployment
- Netlify (Frontend)
- Render (Backend)

---

## 🔐 Features

### Authentication
- User registration
- User login
- JWT token generation
- Protected routes (update & delete)

### Users
- Create user
- View users
- Update user (protected)
- Delete user (protected)

### Projects
- Add project
- View projects
- Update project
- Delete project

### Services
- Add service
- View services
- Update service
- Delete service

---

## 📂 Project Structure

### Frontend
client/
├── src/
├── public/
├── index.html
└── package.json

---

## ⚙️ Environment Variables

### Frontend (.env)
VITE_API_URL=https://portfolio-backend-o3cd.onrender.com

---

## ▶️ Running Locally

### Frontend
cd client
npm install
npm run dev

---

## ⚠️ Notes

- `.env` files are not included for security reasons
- Authentication is required for update and delete operations
- Live deployment may take a few seconds to wake up (Render free tier)

---

## 👩🏽‍💻 Author

**Joan Addo**  
Software Engineering Technology – AI Student  
Centennial College  

---

## ⭐ Highlights

- Full CRUD API implementation  
- Secure authentication with JWT  
- Protected backend routes  
- Frontend connected to live backend  
- Deployed full-stack application  
