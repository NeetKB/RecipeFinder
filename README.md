## Recipe Finder Website

This repository aims to recommend recipes to the users bsed on their search filters.

Built with MERN

## 🌟 Features

- User Authentication: Users can create an account and log in. Passwords are encrypted in the database.

## 🔧 Prerequisites

Ensure you have Node.js and MongoDB installed.

## Project set-up

Install dependencies for both the `frontend` and `api` applications:

```
cd frontend
npm install
cd ../api
npm install
```

Install an ESLint plugin for your editor, for example
[ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Setting up environment variables.

You need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend

Create a file `api/.env` with the following contents:

```
MONGODB_URL="mongodb://0.0.0.0/recipes"
NODE_ENV="development"
JWT_SECRET= [YOUR CHOICE OF PASSWORD]
```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npx vite
```

You should now be able to open your browser and go to
`http://localhost:5174/signup` to create a new user.
