
# ✈️ Flights Service - `flights-service`

## Overview
The **Flights Service** is responsible for managing all flight-related data including cities, airports, airplanes, and flight schedules. It is designed as an independent microservice to handle the maximum load typically experienced during flight searches.

This is part of a broader **Airline Booking System**, where this service works in tandem with the [Flight Booking Service](https://github.com/SamVerse/Flights-booking-service) via inter-service communication using **Axios**.

---

## 🚀 Features

- Manage Cities
- Manage Airports
- Manage Airplanes
- Create & Search Flights
- Sequelize ORM integration
- Follows MVC architecture
- Well-structured service-repository pattern
- Inter-service communication ready
- Error handling middleware
- Winston for logging

---

## 📦 Tech Stack

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL / PostgreSQL (SQL-based DB)
- Axios (for API calls between services)
- Winston (Logging)
- MVC Architecture

---

## 📁 Folder Structure

```
flights-service/
├── controllers/
├── services/
├── repositories/
├── models/
├── migrations/
├── seeders/
├── routes/
├── middlewares/
├── utils/
└── config/
```

---

## 🔌 Inter-Service Communication

This service interacts with the [Flight Booking Service](https://github.com/SamVerse/Flights-booking-service) to enable complete flight booking operations. Communication is handled using Axios with proper abstraction.

---

## 📜 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/SamVerse/Airport-service-backend.git

# Install dependencies
cd flights-service
npm install

# Setup .env file
cp .env.example .env

# Run migrations
npx sequelize db:migrate

# Start server
npm start
```

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) to test all API routes. Swagger/OpenAPI documentation can also be added for production use.

---

## 📎 Related Service

👉 Check out the [Flight Booking Service](https://github.com/SamVerse/Flights-booking-service) that handles actual seat bookings and payment transactions.
