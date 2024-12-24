# E-Commerce Application

An end-to-end e-commerce platform featuring a React frontend and an ASP.NET Core backend, designed to provide a seamless shopping experience.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

---

## Features

- **Product Browsing**: Search, filter, and sort products with ease.
- **Shopping Cart**: Add, update, and remove items from the cart.
- **Order Management**: Place orders and view order history.
- **Admin Panel**: Manage products, categories, and inventory.

---

## Technologies Used

- **Frontend**: React, TypeScript, Framer Motion
- **Backend**: ASP.NET Core, C#, Entity Framework Core
- **Database**: SQLite
- **Styling**: CSS Modules

---

## Installation

### Backend Setup

1. **Clone the repository**:
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app/backend
2. **Run the backend server**: dotnet run

### Frontend Setup
1. **Navigate to the frontend directory**: cd ../frontend
2. **Install dependencies**: npm install
3. **Start the development server**: npm start

### Usage
- Access the React frontend at http://localhost:3000.
- The backend API is available at http://localhost:5246.

### API Endpoints
## Product Management
1. Get All Products
    Endpoint: GET /api/products
    Description: Retrieves a list of all products.
2. Delist Product
    Endpoint: POST /api/products/delist
    Request Body:
    {
      "productId": 1
    }
    Description: Sets the product's StockQuantity to 0.
3. Purchase Products
    Endpoint: POST /api/products/purchase
    Request Body:
    [
      {
        "id": 1,
        "quantity": 2
      },
      {
        "id": 2,
        "quantity": 1
      }
    ]
    Description: Processes the purchase of specified products.


   
