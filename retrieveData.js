const { MongoClient } = require('mongodb');

//MongoDB - Retrive data
function retrieveData() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'yourDatabaseName';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      client.connect();
      console.log('Connected to the database');
  
      const db = client.db(dbName);
      const collection = db.collection('yourCollectionName');
  
      const result = collection.findOne();
      console.log('Retrieved data:', result);
      
      return result;
    } finally {
        client.close();
    }
  }