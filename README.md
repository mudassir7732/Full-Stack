# Full Stack Website Project

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)


## Description
This is a full stack web application built with React.js, JavaScript, TailwindCSS for the front-end, and Node.js with Express.js for the back-end. This project demonstrates a modern web development stack with a responsive UI and a RESTful API.


## Technologies

### Front-end
- React.js
- JavaScript
- TailwindCSS

### Back-end
- Node.js
- Express.js


## Features
- Responsive design using TailwindCSS
- RESTful API with CRUD operations
- User authentication
- Data validation and error handling
- Interactive UI components

## Setup and Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Clone the Repository
git clone https://github.com/mudassir7732/Full-Stack.git<br/>
cd Full-Stack

### Environment Variables
Create a .env file in the back-end directory and add the values for following environment variables:

PORT=<br/>
DB_HOST=<br/>
DB_USER=<br/>
DATABASE=<br/>
PASSWORD=''<br/>
SECRET_KEY=


### Install Dependencies

#### Front-end
```bash
cd Front-end

npm install
or
yarn install
```

#### Back-end
```bash
cd Back-end

npm install
or
yarn install
```


### Run the Application

#### Back-end
```bash
cd Back-end
nodemon index.js
```
#### Front-end
```bash
cd Front-end
npm start
```

## Usage
To use the application, navigate to http://localhost:3000 in your web browser. You can interact with the UI and make API requests to the server.

## Project Structure

```bash

├Full-Stack/

├── Back-end/                  # Back-end code
│   ├── config/              # Database credentials configuration
│   ├── middlewares/         # Middleware functions  
│   ├── routes/              # Backend routes
│   ├── uploads/             # Backend directory to store the images uploaded by website admin
│   ├── server.js            # Server entry point
│   └── package.json         # Back-end dependencies

├── Front-end/                  # Front-end code
│   ├── public/              # Public assets
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── pages/           # React pages
│   │   ├── routes/          # React Routes for Front-end
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── tailwind.config.js   # TailwindCSS configuration
│   └── package.json         # Front-end dependencies

├── .gitignore               # Git ignore file
└── README.md                # Project README
```



## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

Fork the repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/YourFeature)
Open a pull request

## Contact
Name: Muhammad Mudassir <br/>
Email: mudassir7732@gmail.com <br/>
GitHub: github.com/mudassir7732
