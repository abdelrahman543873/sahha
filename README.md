# Application Setup Guide

## Running the Application

### Option 1: Using Docker

Run the application using Docker Compose:

```bash
docker compose up
```

Once the application is up, visit http://localhost:3000. You will find the Swagger UI with available API requests.

Option 2: Without Docker
Install dependencies using Yarn:

```bash
yarn
```

```bash
yarn start
```

Note: Ensure that you have Node.js installed before running these commands.

Important Notes
This application was built with a primary focus on speed. As such, design, architecture, and code quality can be further improved in a production-level environment.
The application assumes a pre-seeded user on the Sahha side, which you can find details about in the Swagger documentation.
