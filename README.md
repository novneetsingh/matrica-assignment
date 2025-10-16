# Matrica Assignment

A full-stack web application for handling submissions, built with a React frontend and a Node.js backend. This project appears to be designed for managing assignment submissions, including file uploads and data processing.

## Live Demo :

https://matrica-assignment.onrender.com

## Features

- **Frontend**: Modern React application with Vite for fast development
- **Backend**: Node.js server with Express for API handling
- **Database Integration**: MongoDB connection for data storage
- **File Uploads**: Cloudinary integration for media management
- **Submission Management**: Structured models for handling user submissions
- **Responsive Design**: Clean and user-friendly interface

## Folder Structure

```
matrica-assignment/
│
├── server/                    # Backend server directory
│   ├── config/               # Configuration files
│   │   ├── cloudinary.js     # Cloudinary configuration for file uploads
│   │   └── db.js             # Database connection setup
│   ├── models/               # Data models
│   │   └── Submission.js     # Submission model definition
│   ├── routes/               # API routes
│   │   └── submission.routes.js # Routes for submission handling
│   ├── templates/            # Template files
│   │   └── Matrica_Intern_Assignment_Template.docx # Assignment template
│   ├── .gitignore           # Git ignore rules for server
│   ├── package.json         # Server dependencies
│   └── server.js            # Main server file
│
├── src/                      # Frontend source directory
│   ├── App.jsx              # Main React component
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
│
├── .gitignore               # Global git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── Matrica_Intern_Assignment.pdf # Project documentation
├── package.json             # Frontend dependencies
├── package-lock.json        # Dependency lock file
├── README.md                # Project documentation (this file)
└── vite.config.js           # Vite configuration
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/novneetsingh/matrica-assignment.git
   cd matrica-assignment
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `server` directory with the following variables:

   ```env
   # Backend environment variables
   PORT = 3000
   FRONTEND_URL = http://localhost:5173
   DATABASE_URL =
   CLOUD_NAME =
   CLOUD_API_KEY =
   CLOUD_API_SECRET =
   FOLDER_NAME =

   # Frontend environment variables
   VITE_BACKEND_URL = http://localhost:3000/api/v1
   ```

## Usage

1. **Start the backend server and frontend server concurrently:**

```bash
  npm start
```
