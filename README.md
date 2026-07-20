# Barely Brewing

Barely Brewing is a full-stack web application for homebrewers who use extract kits or tinned wort. It provides a straightforward way to plan and record brews, track their progress, discover new ingredients and styles, and take inspiration from brews shared by other users.

This project was developed as a capstone MVP. Its scope deliberately focuses on the core brewing and community features rather than the additional complexity of an all-grain brewing platform.

## Features

- Register, log in and log out securely
- View a personal profile and brew collection
- Create and update brew records
- Track active and completed brews
- Record beer style, batch size, temperature, gravity readings and notes
- Add multiple extracts, fermentables, hops, yeasts and adjuncts to a brew
- Calculate alcohol by volume (ABV) from original and final gravity
- Search brews shared by other users
- Save interesting brews to a favourites list
- Copy a shared or completed brew as the starting point for a new batch
- Responsive interface built with React Bootstrap

## Technology

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- React Bootstrap
- Axios
- Zod

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- Zod

### Development environment

- Docker and Docker Compose
- WSL 2

## Project structure

.
├── backend/           # Express API, services, repositories and Prisma files
├── frontend/          # React application
├── docker-compose.yml # Local application and database services
└── README.md

## Getting started

### Prerequisites

Install the following before running the project:

- Git
- Docker with Docker Compose support
- Node.js

### 1. Clone and open the project

```bash
git clone https://github.com/mooooseproductions/IOD_Capstone.git
cd IOD_Capstone
```
### 2. Configure environment variables

Create a `.env` file for the backend using the variables expected by the application. A typical local configuration is:

```env
DATABASE_URL="postgresql://root:root@postgres:5432/capstone_portal"
ACCESS_TOKEN_SECRET="replace-with-a-long-random-value"
REFRESH_TOKEN_SECRET="replace-with-a-different-long-random-value"
PORT=3000
```

Create a `.env` file in the frontend directory and point it at the locally exposed backend:

```env
VITE_BARLEY_BREWING_PORTAL_API="http://localhost:5001"
```

### 3. Start the containers

From the directory containing `docker-compose.yml`, run:

```bash
docker compose up --build
```

The current development configuration exposes the backend on port `5001` and PostgreSQL on port `5433`. Start the frontend from its directory.

```bash
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`.

### 4. Prepare the database

Run Prisma commands inside the backend container so the database hostname matches the Docker network configuration:

```bash
docker compose exec backend npx prisma generate
docker compose exec backend npx prisma migrate dev
docker compose exec backend npx prisma db seed
```

If the service has a custom container name, replace `backend` with that name. You can confirm the running services with:

```bash
docker compose ps
```

## Authentication

Barely Brewing uses short-lived access tokens and refresh tokens. The frontend sends the access token with authenticated API requests, while the refresh token is held in an HTTP-only cookie. Axios is configured with credentials enabled so the browser can send that cookie to the API.

## Main data models

- **User** – account, profile and authentication information
- **BrewRecord** – brew details, status, measurements and ownership
- **BrewIngredient** – ingredients and their quantities for a particular brew
- **Ingredient** – reusable extract, fermentable, hop, yeast and adjunct entries
- **BrewStyle** – reusable beer-style entries
- **BrewNote** – dated notes attached to a brew
- **ToBrewList** – saved or favourited brews
- **RefreshTokens** – refresh-token records used by authentication

## Useful commands

Run these from the appropriate project directory:

```bash
npm run dev                 # Start a development server
npx prisma studio           # Inspect the database in a browser
npx prisma generate         # Regenerate the Prisma client
npx prisma migrate dev      # Create or apply a development migration
docker compose logs -f      # Follow container logs
docker compose down         # Stop the local containers
```

## MVP scope and future development

The current version prioritises the complete core user journey: account creation, authentication, brew creation, progress tracking, discovery and saving brews. Possible future improvements include:

- Account detail updates and account deactivation
- Administration and moderation tools
- Ratings and comments
- More advanced search and filtering
- Brew photos
- Recipe scaling and unit conversion
- Password reset and email verification
- Automated tests and deployment workflows

## Author

Created by Aaron Orr as a software-development capstone project.
