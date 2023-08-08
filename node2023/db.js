const { MongoClient } = require('mongodb');
const urlDb = 'mongodb://127.0.0.1:27017/store';

let dbConnection;

module.exports = {
    connectToDb: async (cb) => {
 
        MongoClient.connect(urlDb)
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.error('!Error connecting to MongoDB:', err);
            return cb(err);
        });
    },
    getDb: () => dbConnection
};