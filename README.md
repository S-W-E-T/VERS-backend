# VERS-backend

## Visitor Entries Register System (VERS) Backend

### Overview

The VERS-backend is the server-side application for managing visitor entries, built with Node.js and Express, and connected to a MongoDB database.

### Installation

Follow these steps to set up and run the VERS-backend on your local machine:

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/S-W-E-T/VERS-backend.git backend
   cd backend
   npm install
   ``

   ```

2. Create a `.env` file in the root of the backend directory with the following content:

   ```bash
   PORT=
   MONGO_URL=
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

### Project Structure

- `/config`: Contains configuration files, including database connection settings.
- `/routes`: API route handlers for different endpoints.
- `/middleware`: Middleware will be here
- `/controllers`: Contains the logic for handling requests and responses.
- `/models`: MongoDB models for interacting with the database.
- `/utils`: Helper files will be here
- `/constant`: all the constent will be here
