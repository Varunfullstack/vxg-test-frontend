# React Project with Firebase Authentication

This project is a role-based management system built using React and Firebase for authentication. It supports three roles: **Admin**, **Dealers**, and **Customers**. Each role has specific permissions and functionalities:

- **Admin**: Can add, update, and remove dealers.
- **Dealers**: Can add, update, and remove customers.
- **Customers**: Have access to customer-specific features.

## Features

- **Role-Based Access Control**: Authentication and authorization are handled via Firebase.
- **Admin Dashboard**: Admin users can manage dealers (add, update, remove).
- **Dealer Dashboard**: Dealers can manage customers (add, update, remove).
- **Firebase Authentication**: Secure login system.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Firebase Project](https://firebase.google.com/)

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up Firebase**:

   - Create a project on [Firebase](https://firebase.google.com/).
   - Enable Firebase Authentication (Email/Password).
   - Copy your Firebase config details.

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your Firebase credentials and backend url:

   ```env
   VITE_BASEURL=your backend url (for example : http://127.0.0.1:3000)

   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. **Run the project**:
   ```bash
   npm start
   ```
