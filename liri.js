// Require fs to read and write random.txt
var fs = require("fs");
// Require dotenv to read and set any environment variables with the dotenv package
require("dotenv").config();
// Import keys
var keys = require("./keys.js");
// Import Request module
var request = require('request');
// Import Moment.js
var moment = require('moment');
// Assign variable to hold Spotify keys information
var spotifyKeys = keys.spotify;
// Assign variable to hold OMDB API key
var omdb = keys.omdb;
// Assign variable to hold Bands in Town API key
var BiTKey = keys.bandsInTown;
// Assign variable to hold the command the user would like to execute
var userCommand = process.argv[2];
// Assign variable to hold the user's query to pass into API calls - irrespective of the number of arguments passed (words user inputted)
var userQuery = process.argv.slice(3).toString().split(",").join(" ");

// Define switch-case statements to invoke each function based on userCommand
switch (userCommand) {
    case "concert-this":
        concertThis(userQuery);
        break;

    case "spotify-this-song":
        spotifyThis(userQuery);
        break;

    case "movie-this":
        movieThis(userQuery);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

// If userCommand is 'concert-this' make the call to the Bands In Town API with their query
function concertThis(query) {
    // Assign a variable to hold the URL for making an API call to Bands In Town
    var BiTURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + BiTKey.apikey;
    // Query Bands In Town for user's input 
    request(BiTURL, function (error, response, body) {
        // Check for errors
        if (error) {
            return console.log("Error: " + error);
        }
        // Assign a variable to hold the parsed data returned from the API call
        var concertData = JSON.parse(body);
        // Iterate through the array of objects returned by the API call to log relevant information
        for (var i = 0; i < concertData.length; i++) {
            // Assign variable to hold the queried artist's event venue name
            var venueName = ("Venue Name: " + concertData[i].venue.name);
            // Assign variable to hold the queried artist's event venue location
            var venueLocation = ("Venue Location: " + concertData[i].venue.city + ", " + concertData[i].venue.region);
            // Assign a variable to hold the date of each event using a standardized MM/DD/YYYY format
            var eventDate = ("Event Date: " + moment(concertData[i].datetime, "YYYY-MM-DDTHh:mm:ss").format("MM/DD/YYYY"));
            // Add a separator between entries
            var spacer = "------------";
            // Assign all event information to a variable to be logged to the command line
            var concertDataCombined = (venueName + "\n" + venueLocation + "\n" + eventDate + "\n" + spacer + "\n");
            // Log event information
            console.log(concertDataCombined);
            // Invoke logData function and pass it the concert data
            logData(concertDataCombined);
        }
    });
}
// If userCommand is 'spotify-this-song' make the call to the Spotify API with their query
function spotifyThis(query) {
    // Import Spotify API Node Modules
    var Spotify = require('node-spotify-api');
    // Assign variable to send Spotify keys to Spotify constructor function (defined in Spotify node module)
    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    // If the user doesn't enter a song title, default to 'The Sign' by Ace of Base
    if (query === "") {
        query = "the sign";
    }
    // Search Spotify for the query
    spotify.search({ type: "track", query: query }, function (error, data) {
        // Check for errors
        if (error) {
            return console.log("Error: " + error);
        }
        // Iterate through the array of objects returned by the API call to log relevant information
        for (var i = 0; i < data.tracks.items.length; i++) {
            // Assign variable to hold the tracks response
            var trackInfo = data.tracks.items[i];
            // Make sure only 'The Sign' by Ace of Base displays, which is the first result (index 0) when query = "the sign"
            if ((query === "the sign") && (trackInfo.artists[0].name !== "Ace of Base")) {
                // Do nothing to prevent matches from artists that are not Ace of Base
            }
            else {
                // Assign variable to hold the queried song's artist name
                var songArtist = ("Artist: " + trackInfo.artists[0].name);
                // Assign variable to hold the queried song's title
                var songTitle = ("Song Name: " + trackInfo.name);
                // Assign variable to hold the queried song's preview URL
                var songPreviewURL = ("Preview Song: " + trackInfo.preview_url);
                // Assign variable to hold the queried song's album 
                var songAlbum = ("From Album: " + trackInfo.album.name);
                // Add a separator between entries
                var spacer = "------------";
                // Assign all song information to a variable to be logged to the command line
                var songDataCombined = (songArtist + "\n" + songTitle + "\n" + songPreviewURL + "\n" + songAlbum + "\n" + spacer + "\n");
                // Log song information
                console.log(songDataCombined);
                // Invoke logData function and pass it the song data
                logData(songDataCombined);
            }
        }
    });
}
// If userCommand is 'movie-this' make the call to the OMDB API with their query
function movieThis(query) {
    // If the user doesn't enter a movie title, default to 'Mr. Nobody'
    if (query === "") {
        query = "mr-nobody";
    }
    // Assign a variable to hold the URL for making an API call to OMDB
    var omdbURL = "http://www.omdbapi.com/?&t=" + query + "&apikey=" + omdb.apikey;
    // Query OMDB for user's input 
    request(omdbURL, function (error, response, body) {
        // Check for errors
        if (error) {
            return console.log("Error: " + error);
        }
        // Assign a variable to hold the parsed data returned from the API call
        var movieData = JSON.parse(body);
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
        // Add a separator between entries
        var spacer = "------------";
        // Assign variable to hold all of the movie data saved to log it with new lines
        var movieDataCombined = (title + "\n" + year + "\n" + imdbRating + "\n" + rtRating + "\n" + country + "\n" + language + "\n" + plot + "\n" + actors + "\n" + spacer + "\n");
        // Log movie 
        console.log(movieDataCombined);
        // Invoke logData function and pass it the movie data
        logData(movieDataCombined);
    });
}
// If userCommend is 'do-what-it-says', read the random.txt file to parse the information inside it and pass it to the spotify-this-song function
function doWhatItSays() {
    // readFile random.txt to get the text stored inside
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        // Split array to isolate the song name from random.txt
        var dataArray = data.split(",");
        // Assign a variable to the song name from the text file to pass to the spotifyThis function
        var randomSong = dataArray[1];
        // Invoke logData function and pass it "Exception: Do What It Says" to mark that the next spotifyThis entry was from random.txt
        logData("--Exception: Do What It Says--\n");
        // Invoke spotify-this-song and pass it the randomSong from the text file
        spotifyThis(randomSong);
    });
}
// Add function to append data to log.txt
function logData(data) {
    // Append data to existing file 'log.txt' or create it if it does not exist
    fs.appendFile("log.txt", data, function (error) {
        // Check for errors
        if (error) {
            return console.log(error);
        }
    });
}