### Project Structure

##### The project is divided into three main parts:

#### Node.js Backend (/backend):

Contains the server-side code written in Node.js using Express framework.
Handles API endpoints and interacts with the MongoDB database.
The main entry point is server.js.
#### MongoDB Database:

This is where the data is stored.
The connection to the MongoDB database is established in the Node.js backend.

#### React Frontend (/frontend):

Contains the client-side code written in React.
Renders the user interface and interacts with the Node.js backend through API calls.
The main entry point is index.js.

## How to Run Each Piece

##### node server:
`cd node2023`:
- `npm run start:mongo`  
- `npm run start:nodeServer`

##### React frontend:
`cd node-with-react2023`
- `npm run start`