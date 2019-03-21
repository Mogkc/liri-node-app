require("dotenv").config();
const fs = require("fs");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");

const spotify = new Spotify(keys.spotify);

//These two are changed by do-what-this-says
let command = process.argv[2];
let terms = process.argv.slice(3).join(" ");

function obey() {
    switch (command) {
        case `concert-this`:
            axios.get("https://rest.bandsintown.com/artists/" + terms + "/events?app_id=codingbootcamp")
                .then(results => {
                    console.log("Here are your options: ")
                    results.data.forEach(concert => {
                        console.log("-------------------");
                        console.log("The venue is " + concert.venue.name);
                        console.log("In " + concert.venue.city);
                        console.log("On " +
                            moment(concert.venue.datetime).format("MM/DD/YYYY"));
                    });
                });
            break;
        case `spotify-this-song`:
            if (terms === "") {
                terms = "The Sign";
            }
            terms = terms.split(" ").join("+");

            spotify.search({ type: 'track', query: terms, limit: 1 }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                const song = data.tracks.items[0];
                //Song Name
                console.log("We found " + song.name);
                //Log the Artist(s)
                console.log("By: " + song.artists[0].name);
                //Album
                console.log("In album: " + song.album.name)
                //And preview link
                console.log("Preview on Spotify at:\r\n" + song.preview_url);
            })
            break;
        case `movie-this`:
            axios.get("https://www.omdbapi.com/?t=" + terms + "&y=&plot=short&apikey=trilogy")
                .then(response => {
                    const movie = response.data;
                    console.log("-------------------------"
                        + "\r\n" + movie.Title + "\r\n" + movie.Year + "\r\nIMDB Rating: " + movie.imdbRating
                        + "\r\n" + movie.Ratings[1].Source + ": " + movie.Ratings[1].Value
                        + "\r\nMade if " + movie.Country + " with the language " + movie.Language
                        + "\r\nPlot:\r\n" + movie.Plot + "\r\nActors: " + movie.Actors);
                });
            break;
        case `do-what-it-says`:
            fs.readFile(terms, "utf8", function (error, data) {
                if (error) { console.log(error); } else {
                    const newArguments = data.split(",");
                    command = newArguments[0];
                    terms = newArguments[1];
                    obey();
                }
            });
            break;
        default: console.log("liri.js has four options for input:\r\n'concert-this <nameOfArtist>': Finds a concert\r\n" +
            "'spotify-this-song <songName>': Displays information about a song\r\n" + 
            "`movie-this <movieName>': Displays information about a movie\r\n" +
            "`do-what-it-says <textDocumentPath>': Executes the command found in a text document\r\n" +
            "---------------------------");
    }
}

obey();