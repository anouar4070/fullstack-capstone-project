// *** Automated MongoDB Data Import Script from JSON ***

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;
let filename = `${__dirname}/gifts.json`;
const dbName = 'giftdb';
const collectionName = 'gifts';

// notice you have to load the array of gifts into the data object
//read the JSON file using Node.js and extracts the docs property from it
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

// connect to database and insert data into the collection
async function loadData() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected successfully to server");

        // database will be created if it does not exist
        const db = client.db(dbName);

        // collection will be created if it does not exist
        const collection = db.collection(collectionName);
        let cursor = await collection.find({});
        let documents = await cursor.toArray();

        if(documents.length == 0) {
            // Insert data into the collection
            const insertResult = await collection.insertMany(data);
            console.log('Inserted documents:', insertResult.insertedCount);
        } else {
            console.log("Gifts already exists in DB")
        }

   // *** Task 1: Count the number of documents ***
   const count = await collection.countDocuments();
   console.log(`Total documents in gifts collection: ${count}`);

   // *** Task 2: Find and display the first 2 documents ***
   const twoDocs = await collection.find({}).limit(2).toArray();
   console.log('First two documents from the gifts collection:', twoDocs);

   // *** Task 3: Find the gift with ID 429 ***
   const gift429 = await collection.findOne({ id: '429' });
   console.log('Gift with ID 429:', gift429);

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

loadData();

module.exports = {
    loadData,
  };
