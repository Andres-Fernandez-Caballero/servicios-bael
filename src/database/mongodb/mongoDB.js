const {MongoClient}  = require('mongodb');

const uri = 'mongodb+srv://andres:DorianElGris@cluster0.8uz6w.mongodb.net/service-train?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useUnifiedTopology: true });

module.exports = client;