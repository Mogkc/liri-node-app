require("dotenv").config();
//require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");

//const spotify = new Spotify(keys.spotify);
const terms = process.argv.slice(3).join(" ");

switch (process.argv[2]) {
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

        break;
    case `movie-this`:

        break;
    case `do-what-it-says`:

        break;
    default: console.log("liri.js has four options for input:\r\n'concert-this <nameOfArtist>': Finds a concert\r\n" +
        "'spotify-this-song <songName>': Plays a song\r\n`movie-this <movieName>': Displays information about a movie\r\n" +
        "`do-what-it-says <textDocumentPath>': Executes the command found in a text document\r\n" +
        "---------------------------");
}