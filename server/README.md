# CrowdFunding API

A secure REST API for managing collaborative funding campaigns, built with Node.js, Express, and MongoDB.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Express-Validator

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/your-username/crowdfunding-api.git
cd crowdfunding-api
npm install
```

### Environment Variables

Create a `.env` file at the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crowdfunding
JWT_SECRET=your_jwt_secret
```

### Run

```bash
# Development
npm run dev

# Production
npm start
```

---

## Project Structure

```
crowdfunding-api/
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Investment.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── investmentController.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── investmentRoutes.js
│   └── adminRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── .env
├── server.js
└── README.md
```

---

## Roles

| Role       | Description                          |
| ---------- | ------------------------------------ |
| `owner`    | Creates and manages funding projects |
| `investor` | Invests in open projects             |
| `admin`    | Supervises all activity              |

---

## API Endpoints

### Auth

| Method | Endpoint         | Access | Description                   |
| ------ | ---------------- | ------ | ----------------------------- |
| POST   | `/auth/register` | Public | Register as owner or investor |
| POST   | `/auth/login`    | Public | Login and receive JWT         |

### Projects (Owner)

| Method | Endpoint                   | Access | Description                  |
| ------ | -------------------------- | ------ | ---------------------------- |
| POST   | `/projects`                | Owner  | Create a project             |
| GET    | `/projects/mine`           | Owner  | Get own projects             |
| PUT    | `/projects/:id`            | Owner  | Edit a project (if open)     |
| DELETE | `/projects/:id`            | Owner  | Delete a project             |
| PUT    | `/projects/:id/close`      | Owner  | Manually close a project     |
| GET    | `/projects/:id/investors`  | Owner  | List investors of a project  |
| GET    | `/investors/:id/portfolio` | Owner  | View an investor's portfolio |

### Projects (Investor)

| Method | Endpoint        | Access   | Description            |
| ------ | --------------- | -------- | ---------------------- |
| GET    | `/projects`     | Investor | List all open projects |
| GET    | `/projects/:id` | Investor | Get project details    |

### Investments

| Method | Endpoint            | Access   | Description          |
| ------ | ------------------- | -------- | -------------------- |
| PUT    | `/investor/balance` | Investor | Top up balance       |
| POST   | `/investments`      | Investor | Invest in a project  |
| GET    | `/investments/mine` | Investor | List own investments |

### Admin

| Method | Endpoint                         | Access | Description             |
| ------ | -------------------------------- | ------ | ----------------------- |
| GET    | `/admin/investors`               | Admin  | List all investors      |
| GET    | `/admin/owners`                  | Admin  | List all project owners |
| GET    | `/admin/investors/:id/portfolio` | Admin  | View investor portfolio |
| GET    | `/admin/owners/:id/portfolio`    | Admin  | View owner portfolio    |

---

## Business Rules

- A project is automatically closed when its capital goal is reached
- A closed project no longer accepts investments
- An investor cannot invest more than **50%** of a project's capital
- An investment cannot exceed the remaining capital
- Investment percentages are calculated dynamically
- Every investment is linked to a user and a project

---

## Response Format

All responses are in JSON format.

**Success:**

```json
{
    "success": true,
    "data": {}
}
```

**Error:**

```json
{
    "success": false,
    "message": "Error description"
}
```

---

## UML Diagrams

- Use Case Diagram — `docs/use-case.png`
- Class Diagram — `docs/class-diagram.png`
- Sequence Diagram — `docs/sequence-diagram.png`

---

## Author

Developed as part of a FinTech backend project.
