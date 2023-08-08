const express = require('express');
const {connectToDb, getDb} = require('./db');
const {ObjectId} = require('mongodb');
const app = express();
const cors = require('cors');
const port = 3002;
let db;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectToDb((err) => {
    if(!err){
        console.log("APP LISTENING ", getDb());
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}/`);
        }); 
        db = getDb();
    }
});

// Route
    app.get('/store', (req, res) => {
        const items = [];
      // Access the "store" collection
    //   res.setHeader('Content-Type', 'application/json');
      db.collection('merch')
      .find()
      .forEach((item) => items.push(item))
      .then(() => {
        res.status(200).json({"data":items});
      })
      .catch(() => {
        res.status(500).json({error: "wtf!"}).end('Error reading the file')
        return cb(err);
      });
  });

  app.use(express.json());

  app.post('/addItem', (req, res) => {
    if(res.status(200))

  // Access the "store" collection
  res.setHeader('Content-Type', 'application/json');
  db.collection('merch').insertOne(req.body)
  .then(results => {
    res.status(201).json(results);
  })
  .catch(() => {    
    res.status(500).json({error: "wtf!"}).end('Error reading the file')
  });

});

app.delete('/deleteItem/:id', (req, res) => {

    if(res.status(200) && new ObjectId(req.params.id))

      // Access the "store" collection
      res.setHeader('Content-Type', 'application/json');
       db.collection('merch').deleteOne({_id: new ObjectId(req.params.id)})
      .then(results => {
        res.status(201).json(results);
      })
      .catch(() => {    
     res.status(500).json({error: "wtf!"}).end('Error reading the file')
      });
    
    });
  
  
  
  