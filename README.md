# Weather Monitoring Application

## Project Description

This project implements a Rule Engine that uses Abstract Syntax Trees (AST) to evaluate complex rules and conditions based on user-defined attributes. This engine allows for dynamic rule creation, combination, modification, and evaluation for various use cases, such as determining user eligibility based on attributes like age, department, income, and experience.  The application follows a 3-tier architecture, comprising a backend API, data storage, and a simple frontend for interaction.

## Features

1. Create rules using simple expressions like ```js(age > 30 && salary > 50000)```.
2. Combine rules logically (e.g., using 'AND' or 'OR').
3. Evaluate rules against user data to check eligibility.
4. Update rules by modifying existing expressions.
5. Validation for valid attributes and handling of invalid rules.

## Data Storage

-  The backend uses Mongoose for defining models and interacting with MongoDB.


## Tech Stacks:

-   Tech stack: MERN stack. 
-   Error handling both on the server and on the client

## Prerequisites
- Ensure you have Node.js and npm installed.

## Dependencies:
   ### Backend:
    -  Node.js (v18.12.1)
    -  Express (v4.x)
    -  Axios (v1.x)
    -  Mongoose (v6.x)
    -  dotenv (v16.x)
    -  Nodemon (v2.x) (for development) 
    
   ### Frontend:
    -  React (v18.x)
    -  Axios (v1.x)

   ### Testing:
    -  Supertest (v7.x)
    -  Jest (v29.x)

Here all the enclosed braces indicate the version of these Tech Stacks used.

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/siddharthgupta5/Rule_Engine_AST.git
```

2. Change Directory:
```bash
cd backend
``` 

4. Install dependencies:
```bash
npm install
```

3. Create the .env file with your values for PORT and USERNAME and PASSWORD for the MONGO_URI (for the MongoDB database or add your MONGODB_URL in the MONGO_URI).
```js
PORT=...
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.lw6c7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

4. Start the development server:
```bash
npm start
```

5. Open another terminal. Navigate into the project directory:
```bash
cd frontend
```

6. Install dependencies:
```bash
npm install
```

7. Start the frontend server:
```bash
npm start
```

## For Testing the suit cases and testcases

1. Navigate back to the backend directory:
```bash
cd backend
```

2. Run tests:
```bash
npm tests
```
   
   




