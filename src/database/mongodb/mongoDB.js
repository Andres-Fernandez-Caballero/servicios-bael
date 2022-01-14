const {MongoClient}  = require('mongodb');
const {DATABASE_USER, DATABASE_PASSWORD} = require('./../../config').databaseConfigs


const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.8uz6w.mongodb.net/service-train?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useUnifiedTopology: true });

module.exports = client;