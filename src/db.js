const {MongoClient} = require('mongodb');
const CrudRepository = require('./CrudRepository');

let cachedDatabase;

const connectToDatabase = async () => {
    console.log('Connecting to DB');

    if (cachedDatabase) {
        console.log('Using DB from cache');
        return cachedDatabase;
    }

    const hostname = process.env['DB_HOSTNAME'];
    const username = process.env['DB_USERNAME'];
    const password = process.env['DB_PASSWORD'];
    const database = process.env['DB_DATABASE'];

    const url = `mongodb+srv://${username}:${password}@${hostname}/test?retryWrites=true&w=majority`;

    const client = new MongoClient(url, {useUnifiedTopology: true});
    await client.connect();
    console.log('Connected to DB');

    cachedDatabase = client.db(database);
    return cachedDatabase;
};

const getCrudRepository = (db, collection) => new CrudRepository(db.collection(collection));

module.exports = {
    connectToDatabase,
    getCrudRepository
};
