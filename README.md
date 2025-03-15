# Imagify - AI Image Generation Platform

## Project Overview

Imagify is a full-stack web application that allows users to generate AI-powered images. The project consists of a React-based frontend (client) and an Express.js backend (server) with MongoDB for data storage.It is designed as a SaaS (Software as a Service) platform, offering scalable and reliable image generation capabilities.

## Client Setup

The client is a React application built with Vite and uses TailwindCSS for styling. It includes features like routing (React Router), HTTP requests (Axios), and notifications (React Toastify).

### Technologies Used

- React
- Vite
- TailwindCSS
- Axios
- React Router
- React Toastify

### Features

- User authentication
- Image generation
- Payment integration
- Responsive design

## Server Setup

The server is built with Express.js and uses MongoDB for data storage. It includes authentication (JWT, bcrypt), payment integration (Razorpay), and CORS handling.

### Technologies Used

- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcrypt
- Razorpay
- CORS

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone < repository-url >
   cd imagify
   ```

2. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

3. Install server dependencies:
   ```bash
   cd ../server
   npm install
   ```

## Running the Application

1. Start the client:

   ```bash
   cd client
   npm run dev
   ```

2. Start the server:
   ```bash
   cd ../server
   npm start
   ```

## Key Features
- **AI-Powered Image Generation**: Create unique images using advanced AI algorithms
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Payment Integration**: Secure payment processing via Razorpay
- **Responsive Design**: Optimized for all devices and screen sizes
- **Scalable Architecture**: Built for high performance and scalability
- **User Management**: Secure user registration and profile management
- **API Integration**: Seamless communication between frontend and backend
- **Environment Management**: Secure configuration using dotenv

## Developer Section
### Developed By
- Kabir Khan

### Follow the Developer
- GitHub: [Kabir Khan](https://github.com/weirdshxt)
- LinkedIn: [Kabir Khan](https://www.linkedin.com/in/weirdsht)

### Architecture Overview
The application follows a modern MERN stack architecture with additional technologies:
- **Frontend**: React with Vite for fast development and TailwindCSS for utility-first styling
- **Backend**: Express.js with MongoDB for data persistence
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **Payments**: Razorpay integration for secure transactions
- **API Communication**: Axios for making HTTP requests between client and server

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeatureName`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeatureName`)
5. Open a pull request

## License

This project is licensed under the ISC License.
