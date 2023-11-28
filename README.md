# SecureHelloWorldApp

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
  - [Running the API](#running-the-api)
  - [Running the Frontend](#running-the-frontend)
- [API Endpoints](#api-endpoints)
  - [Signup](#signup)
  - [Login](#login)
- [UI Endpoints](#ui-endpoints)
   - [Signup](#signup)
   - [Login](#login)
   - [Home](#home)


## Prerequisites

Make sure you have the following installed before proceeding:

- Node.js
- npm (Node Package Manager)

## Installation

### Backend

Navigate to the `Backend` folder and run the following command to install dependencies:

```bash
cd Backend
npm install
```


### Frontend
Navigate to the `frontend` folder and run the following command to install dependencies:

```bash
cd frontend
npm install
```
## Usage

### Running the API
Navigate to the `Backend` folder and run the following command to run api

```bash
cd Backend
npm run start
```

### Running the Frontend
Navigate to the `Frontend` folder and run the following command to run ui

```bash
cd Frontend
npm run start
```

## API Endpoints

### Signup

**Endpoint:**
POST http://localhost:9002/api/signup

**Request Body:**
```json
{
    "name": "",
    "email": "",
    "password": ""
}
```

### Login
**Endpoint:**
POST http://localhost:9002/api/login

**Request Body:**
```json
{
    "email": "",
    "password": ""
}
```
## UI Endpoints

### Signup
http://localhost:3000/signup

### Login
http://localhost:3000/login

### Home
http://localhost:3000/home
