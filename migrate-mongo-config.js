require("dotenv").config();
// In this file you can configure migrate-mongo
const DB_URI=process.env.MONGODBURI;
console.log(DB_URI);
const DB_PATH=DB_URI.substr(0,DB_URI.lastIndexOf("/")+1);
console.log(DB_PATH);
const DB_NAME=DB_URI.split("/").pop();
console.log(DB_NAME);

const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url:DB_PATH,

    // TODO Change this to your database name:
    databaseName:DB_NAME,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js"
};

// Return the config as a promise
module.exports = config;
