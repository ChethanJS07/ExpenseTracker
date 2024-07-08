# Expense Tracker

Expense Tracker is a web application designed to help users manage their income and expenses. The application allows users to add, view, and delete expenses and incomes, providing a graphical representation of their financial data.

## Project Partners:

- [Ananda Sri Kaushal B](https://github.com/AnandaSriKaushalB)
- [Rituarna R](https://github.com/ritzpurr)
- [Pathik yadav](https://github.com/pathik705)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- User authentication (registration and login)
- Add, view, and delete expenses and incomes
- Graphical representation of income and expense data
- Filter expenses and incomes by date and category
- Responsive design

## Demo

You can see a live demo of the app [here](https://example.com).

## Technologies Used

### Frontend

- React
- React Router
- Chart.js
- Styled Components
- Bootstrap

### Backend

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB and MongoDB compass installed and running

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ChethanJS07/ExpenseTracker.git
    cd ExpenseTracker
    ```

2. Navigate to the backend directory:

    ```bash
    cd BACK
    ```

3. Install backend dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT=3000
    MONGO_URI="mongodb://localhost:27017/expense-tracker"
    JWT_SECRET=<your_secret_key>
    ```

5. Start the backend server:

    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../front
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000`.

## Usage

1. Register for a new account or log in with your existing account.
2. Add new expenses and incomes through the dashboard.
3. View the graphical representation of your financial data.
4. Filter transactions by date or category to get specific insights.

## API Endpoints

### User Routes

- `POST /api/v1/user/register`: Register a new user
- `POST /api/v1/user/login`: Login a user

### Expense Routes

- `POST /api/v1/expenses`: Add a new expense
- `GET /api/v1/expenses`: Get all expenses
- `DELETE /api/v1/expenses/:id`: Delete an expense

### Income Routes

- `POST /api/v1/incomes`: Add a new income
- `GET /api/v1/incomes`: Get all incomes
- `DELETE /api/v1/incomes/:id`: Delete an income

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

