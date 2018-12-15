let mongoose = require('mongoose');

// added to avoid an issue when dealing with mongoose ObjectId values in graphql
mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString();
};

/**
 * Connect to the database.
 *
 * @returns a promise that resolves into a mongoose connection object
 */
const connect = async () => {
    // determine which mongodb location we should connect to...
    let dbUrl;
    if (process.env.MONGODB_URL) {
        // if we've received mongodb credentials from the environment variables, use them.
        console.log(`Connecting to datastore: ${process.env.MONGODB_URL}`);
        dbUrl = `mongodb://${process.env.MONGODB_ACCOUNT}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`;
    } else {
        // if not, try and connect to a local database...
        console.log(`Connecting to local MongoDB.`);
        dbUrl = 'mongodb://127.0.0.1:27017/housekeeper';
    }

    await mongoose.connect(
        dbUrl, // see dep warnings: https://mongoosejs.com/docs/deprecations.html
        {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
        }
    );

    mongoose.Promise = global.Promise;

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    return db;
};

export default connect;
