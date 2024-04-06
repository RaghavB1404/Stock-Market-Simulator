const { MongoClient } = require('mongodb');

// MongDB - Insert pdata
portfolio = [
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 3, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 2, qty:100, buyprice:100, sellprice: 0},
    {cname: 1, qty:100, buyprice:100, sellprice: 0},
    {cname: 4, qty:100, buyprice:100, sellprice: 0},
]

async function insertData() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'yourDatabaseName';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Connected to the database');
  
      const db = client.db(dbName);
      const collection = db.collection('yourCollectionName');
  
      const result = await collection.insertOne(portfolio);
      console.log(`Inserted ${result.insertedCount} document into the collection`);
    } finally {
      await client.close();
    }
  }