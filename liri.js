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

// OMDB: 
var omdbURL = "http://www.omdbapi.com/?&t=" + userQuery + "&apikey=" + omdb.apikey;

// Query OMDB for user's input 
request(omdbURL, function (error, response, body) {
    // Log potential errors
    console.log('Error:' + error);
    // Assign a variable to hold the parsed data returned from the API call
    var movieData = JSON.parse(body);
    // Log movieData object for testing
    // console.log(movieData);
    // Assign variable to hold the queried movie title
    var title = ("Title: " + movieData.Title);
    // Assign variable to hold the queried movie release year
    var year = ("Year: " + movieData.Year);
    // Assign varaible to hold the queried movie IMDB rating
    var imdbRating = ("IMDB Rating: " + movieData.imdbRating);
    // Assign variable to hold the queried movie Rotten Tomatoes rating
    var rtRating = ("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
    // Assign variable to hold the queried movie country of origin
    var country = ("Country: " + movieData.Country);
    // Assign variable to hold the queried movie language
    var language = ("Language: " + movieData.Language);
    // Assign variable to hold the queried movie plot
    var plot = ("Plot: " + movieData.Plot);
    // Assign variable to hold the queried movie actors
    var actors = ("Actors: " + movieData.Actors);
    // Assign variable to hold all of the movie data saved to log it with new lines
    var movieDataCombined = (title + '\n' + year + '\n' + imdbRating + '\n' + rtRating + '\n' + country + '\n' +
        language + '\n' + plot + '\n' + actors + '\n' + '---' + '\n');
    // Log movie 
    console.log(movieDataCombined);
});