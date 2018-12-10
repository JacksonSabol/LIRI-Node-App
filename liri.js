// Require fs to read and write random.txt
var fs = require("fs");

// Require dotenv to read and set any environment variables with the dotenv package
require("dotenv").config();

// Import Spotify API Node Modules
var Spotify = require('node-spotify-api');

// Import keys
var keys = require("./keys.js");

// Import Request module
var request = require('request');

// Example from documentation
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// Assign variables here to hold user imput with process.argv
// Assign variable to hold the command the user would like to execute
var userCommand = process.argv[2];
// Assign variable to hold the user's query to pass into API calls - irrespective of the number of arguments passed (words user inputted)
var userQuery = process.argv.slice(3).toString().split(',').join(' ');
// Log for testing
console.log(userCommand);
console.log(userQuery);

// Assign variable to hold Spotify keys information
var spotify = new Spotify(keys.spotify);
// Log for testing
// console.log(spotify);
console.log(spotify.credentials.id);
console.log(spotify.credentials.secret);

// Assign variable to hold OMDB API key
var omdb = keys.omdb;
// Log for testing
// console.log(omdb);
console.log(omdb.apikey);

// Assign variable to hold Bands in Town API key
var BiTKey = keys.bandsInTown;
// Log for testing
// console.log(BiTKey);
console.log(BiTKey.apikey);

// API query URLs/methods:

// Bands In Town: var BiTURL = "https://rest.bandsintown.com/artists/" + <query-variable> + "/events?app_id=" + BiTKey.apikey;

// Spotify: spotify.search({ type: 'track', query: <query-variable>}, function(error, data) {
//   if (error) {
//     return console.log('Error occurred: ' + error);
//     }
//  console.log(data);

// OMDB: var omdbUrl = "http://www.omdbapi.com/?&t=" + <query-variable> + "&apikey=" + omdb.apikey;