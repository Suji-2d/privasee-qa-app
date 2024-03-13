# Question and Answer App

## Overview
- [Express.js CRUD Application](#expressjs-crud-application)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [TF-IDF Usage Explanation](#tf-idf-usage-explanation)
- [Code Usage](#code-usage)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Database](#database)
  - [Table Structure](#table-structure)
- [Front End](#front-end)
- [Features](#features)

# Express.js CRUD Application
This Express.js application is designed to provide APIs for performing CRUD operations (Create, Read, Update, Delete) on questions and answers. It utilizes a service like Airtable to store the data and implements an API capable of fuzzy searching within the question:answer pairs available.

## Tech Stack
- **Express.js**: A web application framework for Node.js, used to build the server and define API endpoints.
- **Body-parser**: Middleware for parsing incoming request bodies, particularly useful for handling JSON payloads.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing the server to accept requests from different origins.
- **Natural**: A natural language processing library for Node.js, used for TF-IDF (Term Frequency-Inverse Document Frequency) calculations.
- **Airtable**: A cloud service for creating, managing, and sharing databases, used as a storage service for the application's data.

## Architecture
![Architecture](images/architecture.jpg)

## TF-IDF Usage Explanation
TF-IDF (Term Frequency-Inverse Document Frequency) is employed for its technical advantages such as memory efficiency and computational lightness. It utilizes sparse matrix representations and does not require training data, making it versatile across different domains.

From a non-technical perspective, TF-IDF efficiently analyzes keyword and phrase frequencies. While more complex language models could be considered for future endeavors such as AI-driven question and answer completion, TF-IDF is deemed suitable for the current requirements, allowing flexibility for advanced techniques in the future.


## Code Usage

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
    ```
2. Install dependencies:
    ```
    npm install
    ```
### Running the Server
1. To start the Express.js server, use the following command:
    ```
    npm start
    ```
The server will be running on port 5121 by default.

### API Endpoints
1. Get all records - Retrieve all records stored in the database.
    ```
    GET /records
    ```

2. Get a single record by ID - Retrieve a single record based on the provided ID.
    ```
    GET /records/:id
    ```

3. Get top 5 semantically similar records - Retrieve the top 5 semantically similar records based on the provided search word.
    ```
    GET /records/:search-word
    ```

4. Insert a single record into the database - Create a new record in the database.
    ```
    POST /create-records
    ```

5. Update the desired values of a single record - Update the desired values of a single record identified by its ID.
    ```
    PUT /update-records/:id
    ```

6. Update multiple records - Update multiple records based on the provided data.
    ```
    PUT /update-records
    ```
## Database
### Table Structure

| Property        | Type               | Description                                                                                            |
|-----------------|--------------------|--------------------------------------------------------------------------------------------------------|
| _recordId       | int                | The ID of the question, incremental integer                                                           |
| Company Name    | string             | Name of the company. For this exercise we’ll assume there is only one company (of which we’re part of) called “Test Company” |
| _companyId      | int                | The ID of the company, we can use a random set of numbers                                             |
| Question        | string             | Question being asked                                                                                   |
| Answer          | string             | Answer provided by the user                                                                           |
| Created At      | date               | ISO date in which it was created                                                                      |
| Created By      | string (email)     | Email of the user who created the question                                                            |
| Updated At      | date               | ISO date in which it was last updated                                                                 |
| Updated By      | string (email)     | Email of the user who last created the question                                                       |
| Assigned To     | string (email)     | Email of the person to whom the question is assigned. This can be null if never assigned to anyone or if answered on creation. |
| Properties      | list of comma separated key:value | e.g. section:Vendor Information,vendor:IB                                                            |


## Front End

## Features
