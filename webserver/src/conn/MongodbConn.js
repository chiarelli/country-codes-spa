const Promise = require("bluebird");
const mongoose = Promise.promisifyAll( require('mongoose') );
const assert = require('assert');

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const poolSize = Math.ceil( 10/require('os').cpus().length );

const options = {
  useNewUrlParser: true,
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: poolSize,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

function connect() {
    
    return mongoose.connect('mongodb://'
            +MONGO_USER+':'
            +MONGO_PASS+'@'
            +MONGO_HOST+':'
            +MONGO_PORT+'/'
            +MONGO_DB,
    options);
}

connect();

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return connect();
};

var loop;

// Exit application on error
mongoose.connection.on('error', err => {
  console.log(`MongoDB connection error: ${err}`);
  loop = setTimeout(connectWithRetry, 5000);
  // process.exit(-1)
});

mongoose.connection.on('connected', () => {
  clearTimeout(loop);
  console.log('MongoDB is connected');
});

process.on('SIGHUP', () => { mongoose.connection.close(); });
process.on('exit', () => { mongoose.connection.close(); });

module.exports = mongoose;
