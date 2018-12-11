# Welcome to LIRI: Language Interpretation and Recognition Interface

## The following project is an implementation of Node.js to mimic Apple's Siri

### Overview
I employed JavaScript and Node.js to make an app that takes in parameters and gives users data based on that input. This application is a back end application only.

### With this app, users can:
* "concert-this": Search for upcoming events for their favorite musical artist

   * The user will be shown a list of all upcoming events with the venue name, the venue location, and the date of the event

* "spotify-this-song": Search Spotify for their favorite song

   * The user will be shown a list of the 20 most relevant (descending order) matches to the song their queried, which includes the artist(s) name, the song's name, a preview link for the song on Spotify, and the album that the song is from

* "movie-this": Search for information about their preferred movie

   * The user will be shown the title of the movie they queried, the year the movie came out, the IMDB rating of the movie, the Rotten Tomatoes rating of the movie, the country where the movie was produced, the language of the movie, the plot of the movie, and the actors in the movie

* "do-what-it-says": Perform a "random" search for a "random" query, both read and imported from a separate text file

   * The text file contains one of the other three established search commands and one search query. The command "do-what-it-says" calls the appropriate function baesd on the command in the text file, and passes the appropriate query to that function based on the query in the text file

### Select code snippet to demonstrate the use of the 'Request' Node Modules to make asynchronous API calls
``` javascript
request(omdbURL, function (error, response, body) {
        var movieData = JSON.parse(body);
        var title = ("Title: " + movieData.Title);
        var year = ("Year: " + movieData.Year);
        var imdbRating = ("IMDB Rating: " + movieData.imdbRating);
        var rtRating = ("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
        var country = ("Country: " + movieData.Country);
        var language = ("Language: " + movieData.Language);
        var plot = ("Plot: " + movieData.Plot);
        var actors = ("Actors: " + movieData.Actors);
        var spacer = "------------";
        var movieDataCombined = (title + "\n" + year + "\n" + imdbRating + "\n" + rtRating + "\n" + country + "\n" + language + "\n" + plot + "\n" + actors + "\n" + spacer + "\n");
        console.log(movieDataCombined);
    });
```

Note: To run this app, you will need to supply your own API keys

Thank you for reading!

### Built With:
* Command Line
* JavaScript
* Node.js