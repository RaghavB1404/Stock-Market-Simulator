const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'testdb';
const collectionName = 'example_collection';

// Example JSON object
const exampleData = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
};

const newupdate = {
    name: 'Chasa3',
    age: 50,
    city: 'Bangalore',
}

let newds2 = {
    name: 'Chasa4',
    age: 35,
    city: 'Tirupati',
}

// Function to run MongoDB operations
async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Find one document in the collection
    const document = await collection.findOne();

    if (!document) {
        console.log('Collection is empty.');
        // Insert the JSON object into MongoDB
        const insertResult = await collection.insertOne(exampleData);
        console.log(`Inserted document id: ${insertResult.insertedId}`);

        // Retrieve the inserted document
        const retrievedDocument = await collection.findOne({}, { projection: { _id: 0 } });
        console.log('Retrieved document:', retrievedDocument);
    } else {
        console.log('Collection is not empty.');

        // Update the document
        await collection.updateOne({}, { $set: newupdate });

        // Retrieve the updated document
        const updatedDocument = await collection.findOne({}, { projection: { _id: 0 } });
        console.log('Updated document:', updatedDocument);
        
        // Update newds2 with the data from the updated document
        console.log('existing newds2:', newds2);
        newds2 = updatedDocument;
        console.log('Updated newds2:', newds2);
    }

  } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Connection closed');
  }
}

// Run the MongoDB operations
run().catch(console.error);
