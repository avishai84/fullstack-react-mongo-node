const express = require('express');
const fs = require('fs');
const path = require('path');
const jsonData = require('./data.json');
const albumData = require('./albums.json');

const app = express();

// Define middleware to enable CORS for images
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// Route to serve the index.html page
// app.get('/', (req, res) => {
//   // Read the index.html file
//   const filePath = path.join(__dirname, 'index.html');
//   fs.readFile(filePath, 'utf8', (err, content) => {
//     if (err) {
//       // Handle file read error
//       res.status(500).end('Error reading the file');
//     } else {
//       // Set the content type to HTML
//       res.setHeader('Content-Type', 'text/html');
//       // Send the index.html content as the response
//       res.end(content);
//     }
//   });
// });

// Route to serve the JSON data
app.get('/api/data', (req, res) => {
  // Set the content type to JSON
  res.setHeader('Content-Type', 'application/json');
  // Create the data object
  const data = JSON.stringify(jsonData);
  // Send the JSON data as the response
  res.end(data);
});

// Route to serve the Album JSON data
app.get('/api/albums', (req, res) => {
  // Set the content type to JSON
  res.setHeader('Content-Type', 'application/json');
  // Create the data object
  const data = JSON.stringify(albumData);
  // Send the JSON data as the response
  res.end(data);
});
// Define the port on which the server will listen
const port = 3002;

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
