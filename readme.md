# Report Management System (MERN Stack)

This project is a Report Management System developed using the MERN (MongoDB, Express, React, Node.js) stack. It provides functionalities for user registration and authentication, report management, and token-based authentication.

## .env files

DATABASE=mongodb+srv://golamanik192:nodejs1234@cluster0.bnbngdt.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=anik
REFRESH_JWT_SECRET=anik
JWT_EXPIRES_IN=1h
REFRESH_JWT_EXPIRES_IN=50d
JWT_COOKIE_EXPIRES_IN=50d

### Installation

Navigate to the project directory:
cd your-project
Install the project dependencies: npm install

Usage
Describe how to use/run the project after it's been set up. Include any configuration, environment variables, or other relevant information.

Development
To start a development server and run the project locally:

npm run dev

## Project Overview

The Report Management System allows two types of users:

1. Admins: Users with elevated privileges to manage reports, including creating, editing, and deleting them.
2. Regular Users: Users can register an account, log in, and view reports.

## User Registration and Authentication

### Registration

- Both Admins and Regular Users can register using their details: name, address, phone, email, profession, and favorite colors.
- Registration is handled through API endpoints.
- Validation is in place to ensure data accuracy.

### Authentication

- Users can log in using their email and password.
- Upon successful login, a JWT (JSON Web Token)  is issued with an expiration time of one hour.
- JWT tokens are used for user authentication for accessing protected routes.

## Accessing Report Data

- Authenticated users (both Admins and Regular Users) can access the report table, displaying data such as ID, name, address, phone, email, profession, and favorite colors.
- The report data is retrieved from the backend and displayed in the frontend.

## Admin Actions

### Admin Privileges

- Admins have elevated privileges and can perform the following actions:
  - Create new reports.
  - Edit existing reports.
  - Delete reports.
- Admin functionalities are protected and accessible only to users with admin roles.

## JWT Token Expiry

- JWT tokens issued upon login have a one-hour expiration time.
- If a session is active and the token expires, the system automatically refreshes the token to allow uninterrupted access.

## Code Organization

- The project is organized into separate directories for the backend and frontend.
- The backend uses Node.js and Express for API development.
- The frontend is built using React for user interface development.
- Code organization follows best practices, separating routes, controllers, models, and components.
- Comments and docstrings are added to the code for clarity and documentation.


Creating API documentation involves providing detailed information about each API endpoint, including its purpose, HTTP methods, request parameters, request and response examples, and any additional details developers might need to understand and use the API effectively. Below is an example of API documentation for the endpoints you provided:

# API Documentation
# Authentication Endpoints
# Report Endpoints

4. **Create a Report**
   - **Endpoint**: `{{URL}}/api/v1/report`
   - **HTTP Method**: POST
   - **Description**: Create a new report.
   - **Request Parameters**: Report data in the request body as needed.

5. **Get All Reports**
   - **Endpoint**: `{{URL}}/api/v1/report`
   - **HTTP Method**: GET
   - **Description**: Retrieve a list of all reports.

6. **Update a Report**
   - **Endpoint**: `{{URL}}/api/v1/report/{report_id}`
   - **HTTP Method**: PUT
   - **Description**: Update an existing report.
   - **Request Parameters**:
     - `report_id` (string): The unique ID of the report to be updated.
     - Report data in the request body as needed.

7. **Get a Single Report**
   - **Endpoint**: `{{URL}}/api/v1/report/{report_id}`
   - **HTTP Method**: GET
   - **Description**: Retrieve a single report by its unique ID.
   - **Request Parameters**:
     - `report_id` (string): The unique ID of the report to be retrieved.

8. **Delete a Report**
   - **Endpoint**: `{{URL}}/api/v1/report/{report_id}`
   - **HTTP Method**: DELETE
   - **Description**: Delete a report by its unique ID.
   - **Request Parameters**:
     - `report_id` (string): The unique ID of the report to be deleted.
