# 🛒 Footcap - E-Commerce Web Application

A full-stack E-Commerce web application built using **Java Spring Boot**, **PostgreSQL (Neon)**, **Spring Security OAuth2**, **HTML**, **CSS**, and **JavaScript**.

The application provides a complete online shopping experience including Google Authentication, Wishlist, Shopping Cart, Checkout, Order Management, and Responsive UI.

---

## 🚀 Live Demo

🌐 https://footcap-e-commerce.onrender.com

---

## ✨ Features

- 🔐 Google OAuth 2.0 Login
- 🛍️ Product Listing
- ❤️ Wishlist Management
- 🛒 Shopping Cart
- 📦 Checkout System
- 📍 Address Management
- 💳 Cash on Delivery
- 📄 Order Placement
- 📜 Order History
- 🗄️ PostgreSQL Database (Neon)
- 📱 Responsive Design
- ☁️ Cloud Deployment using Render
- 🔄 Automatic Deployment via GitHub

---

## 🛠️ Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Security OAuth2 Client
- Spring Data JPA
- Hibernate

### Frontend

- HTML5
- CSS3
- JavaScript

### Database

- PostgreSQL (Neon)

### Deployment

- Render (Docker)
- GitHub

---

## 📂 Project Structure

```
Footcap
│
├── src
│   ├── main
│   │   ├── java
│   │   ├── resources
│   │   │   ├── static
│   │   │   └── application.properties
│   │
│   └── test
│
├── Dockerfile
├── .dockerignore
├── pom.xml
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/JyotirmayBhattacharjee/Footcap_E_Commerce.git
```

```bash
cd Footcap_E_Commerce
```

---

### Configure Environment Variables

Create the following environment variables:

```
DB_URL
DB_USERNAME
DB_PASSWORD

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

---

### Build

```bash
./mvnw clean package
```

---

### Run

```bash
java -jar target/Footcap-0.0.1-SNAPSHOT.jar
```

The application will start on

```
http://localhost:8080
```

---

## 🔑 Google OAuth Configuration

Add the following Authorized JavaScript Origins:

```
http://localhost:8080
https://footcap-e-commerce.onrender.com
```

Authorized Redirect URIs:

```
http://localhost:8080/login/oauth2/code/google

https://footcap-e-commerce.onrender.com/login/oauth2/code/google
```

---

## 📸 Screenshots

> Add screenshots of:

- Home Page
- Google Login
- Wishlist
- Shopping Cart
- Checkout
- Order Success
- Mobile Responsive View

---

## 📌 Future Improvements

- Razorpay / Stripe Payment Integration
- Admin Dashboard
- Product Search
- Product Filters
- Order Tracking
- Email Notifications
- User Profile
- Product Reviews
- Inventory Management

---

## 👨‍💻 Author

**Jyotirmay Bhattacharjee**

GitHub:
https://github.com/JyotirmayBhattacharjee

LinkedIn:
https://www.linkedin.com/in/jyotirmaybhattacharjee/

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
