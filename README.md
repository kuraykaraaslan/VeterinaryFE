![veterinary](/static/logo.png)

# Veterinary Management System

This is a React application for managing a veterinary clinic's operations. The system provides APIs for managing doctors, customers, animals, vaccines, and appointments. The application is developed following a layered architecture pattern, with PostgreSQL as the database and Spring Data JPA for data access. The API endpoints are documented for easy integration and usage.

## Technologies

[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next-dot-js&logoColor=white)](https://nextjs.org/)

## Features

- **Doctor Management**: CRUD operations for doctors and their associated available days.
- **Customer Management**: CRUD operations for customers and their associated animals.
- **Animal Management**: CRUD operations for animals and their associated vaccinations and appointments.
- **Vaccine Management**: CRUD operations for vaccines.
- **Appointment Management**: Creating, updating, viewing, and deleting appointments for animal vaccinations and check-ups.

## Architecture
- **Layered Architecture**: The application is developed following a layered architecture pattern.
- **Dependency Injection**: Constructor injection is used for Inversion of Control (IoC) and Dependency Injection (DI).
- **Exception Handling**: Custom exceptions are used for error handling, ensuring meaningful responses to API users.
- **Data Transfer Objects (DTOs)**: Request and response DTOs are used for API endpoints.
- **Database**: Postgresql is used as the relational database, with Spring Data JPA for data access.
- **API Documentation**: API endpoints are documented for easy integration and usage in swagger.
- **Sample Data**: Sample data is provided in the database for testing and demonstration purposes.

## Running the Application

1. Ensure you have Node.js installed on your machine. If not, download and install Node.js from the [official website](https://nodejs.org/).
2. Clone the repository by running the command `git clone https://github.com/kuraykaraaslan/VeterinaryFE.git`.
3. Navigate to the project directory using the command `cd VeterinaryFE`.
4. Install the project dependencies by running the command `npm install`.
5. Set the environment variables in the `.env` file. You can copy the `.env.example` file and rename it to `.env`.
6. Start the application by running the command `npm run dev`.

## API Documentation

The API documentation is available at backend server. You can access the API documentation by navigating to backend server's root URL in your browser.


## UML Diagram

The UML diagram below shows the class diagram of the Veterinary Management System.

![UML Diagram](/static/uml.png)



## Conclusion

The Veterinary Management System is a React application for managing a veterinary clinic's operations. The system provides APIs for managing doctors, customers, animals, vaccines, and appointments. The application is developed following a layered architecture pattern, with PostgreSQL as the database and Spring Data JPA for data access. The API endpoints are documented for easy integration and usage.

## License

This project has no license. Feel free to use, modify, and distribute the code.

